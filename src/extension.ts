import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { TodoViewProvider } from "./TodoViewProvider";

export type TaskType = {
  id: string;
  source: "comment" | "manual";
  categoryId: string;
  text: string;
  file?: string;
  line?: number;
  description?: string;
  priority?: number;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  completed: boolean;
};

const DEFAULT_CATEGORIES = [
  {
    id: "features",
    color: "#22c55e",
    icon: "VscGitPullRequest",
    name: "features",
  },
  {
    id: "fix-bugs",
    color: "#ef4444",
    icon: "VscBug",
    name: "Fix Bugs",
  },
  {
    id: "refactors",
    color: "#eab308",
    icon: "VscSync",
    name: "Refactors",
  },
];

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new TodoViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TodoViewProvider.viewType,
      sidebarProvider
    )
  );

  let disposable = vscode.commands.registerCommand(
    "code-todos.showPanel",
    () => {
      // This is all your existing logic for creating the main panel
      const panel = vscode.window.createWebviewPanel(
        "codeTodosPanel", // A unique ID for this panel type
        "Code Todos",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [context.extensionUri],
        }
      );

      // Determine if we are in development mode by checking the extension's mode
      const isDevelopment =
        context.extensionMode === vscode.ExtensionMode.Development;
      // Set the webview's content based on the mode
      panel.webview.html = getWebviewContent(
        isDevelopment,
        panel.webview,
        context.extensionUri
      );

      panel.webview.onDidReceiveMessage(
        async (message) => {
          switch (message.command) {
            // --- DATA FETCHING ---
            case "get-data":
              console.log("Received get-data request from webview");

              // Get categories with fallback
              let categories = context.workspaceState.get("todoCategories");
              if (
                !categories ||
                !Array.isArray(categories) ||
                categories.length === 0
              ) {
                console.log(
                  "Categories empty, using defaults and updating storage"
                );
                categories = DEFAULT_CATEGORIES;
                context.workspaceState.update(
                  "todoCategories",
                  DEFAULT_CATEGORIES
                );
              }

              // Get manual tasks with fallback
              let manualTasks = context.workspaceState.get(
                "manualTasks"
              ) as TaskType[];

              if (!manualTasks || !Array.isArray(manualTasks)) {
                console.log("Manual tasks empty, initializing");
                manualTasks = [];
                context.workspaceState.update("manualTasks", []);
              }

              const commentTasks = await scanWorkspaceForTodos(context);

              panel.webview.postMessage({
                command: "update-data",
                data: {
                  tasks: [...manualTasks, ...commentTasks],
                  categories: categories,
                },
              });
              return;

            // --- CATEGORY CRUD ---
            case "add-category": {
              const savedCategories = context.workspaceState.get(
                "todoCategories",
                DEFAULT_CATEGORIES
              );
              const newCategory = message.data;
              const updatedCategories = [...savedCategories, newCategory];
              await context.workspaceState.update(
                "todoCategories",
                updatedCategories
              );
              return;
            }

            case "remove-category": {
              const savedCategories = context.workspaceState.get(
                "todoCategories",
                DEFAULT_CATEGORIES
              );
              const categoryIdToRemove = message.data.id;
              const updatedCategories = savedCategories.filter(
                (cat) => cat.id !== categoryIdToRemove
              );
              await context.workspaceState.update(
                "todoCategories",
                updatedCategories
              );
              return;
            }

            case "update-category": {
              const savedCategories = context.workspaceState.get(
                "todoCategories",
                DEFAULT_CATEGORIES
              );
              const updatedCategory = message.data;
              const updatedCategories = savedCategories.map((cat) =>
                cat.id === updatedCategory.id ? updatedCategory : cat
              );
              await context.workspaceState.update(
                "todoCategories",
                updatedCategories
              );
              return;
            }

            // --- TASK CRUD (for manual tasks) ---
            case "add-manual-task": {
              const savedTasks = context.workspaceState.get("manualTasks", []);
              const newTask = message.data;
              const updatedTasks = [...savedTasks, newTask];
              await context.workspaceState.update("manualTasks", updatedTasks);
              return;
            }

            case "remove-task": {
              const savedTasks = context.workspaceState.get<TaskType[]>(
                "manualTasks",
                []
              );
              const { taskId } = message.data;
              const updatedTasks = savedTasks.filter(
                (task) => task.id !== taskId
              );
              await context.workspaceState.update("manualTasks", updatedTasks);
              return;
            }

            case "update-task": {
              const savedTasks = context.workspaceState.get<TaskType[]>(
                "manualTasks",
                []
              );
              const updatedTask = message.data;
              const updatedTasks = savedTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              );
              await context.workspaceState.update("manualTasks", updatedTasks);
              return;
            }

            case "complete-comment-task": {
              const { file, line } = message.data;
              if (!file || !line) {
                return;
              }

              try {
                const uri = vscode.Uri.file(file);
                const document = await vscode.workspace.openTextDocument(uri);

                const lineToRemove = document.lineAt(line - 1);

                const edit = new vscode.WorkspaceEdit();

                edit.delete(uri, lineToRemove.rangeIncludingLineBreak);

                await vscode.workspace.applyEdit(edit);
              } catch (error) {
                console.error("Failed to complete comment task:", error);
                vscode.window.showErrorMessage(
                  "Could not remove the task comment from the file."
                );
              }
              return;
            }
            // Open file message
            case "open-file": {
              const { file, line } = message.data;
              if (!file || !line) {
                return;
              }

              // Convert the file path string to a URI
              const fileUri = vscode.Uri.file(file);

              // Use the VS Code API to open the document and show it in the editor
              vscode.window.showTextDocument(fileUri, {
                // The selection option will scroll to the specific line and place the cursor there
                selection: new vscode.Range(
                  // The line number is 1-based, but the Range constructor is 0-based
                  new vscode.Position(line - 1, 0),
                  new vscode.Position(line - 1, 0)
                ),
              });

              return;
            }
          }
        },
        undefined,
        context.subscriptions
      );
    }
  );

  context.subscriptions.push(disposable);
}

async function scanWorkspaceForTodos(context: vscode.ExtensionContext) {
  const categories = context.workspaceState.get(
    "todoCategories",
    DEFAULT_CATEGORIES
  );
  const categoryNames = categories.map((category) =>
    category.name.toLowerCase()
  );
  console.log("Categories for scanning:", categories);
  console.log("Category names for regex:", categoryNames);

  const todoPattern = `(?:\/\/|\\*)\\s*(${categoryNames.join(
    "|"
  )})\\s*:\\s*(.*)`;

  console.log("Todo regex pattern:", todoPattern);
  const todoRegex = new RegExp(todoPattern, "i"); // 'i' for case-insensitive

  const files = await vscode.workspace.findFiles(
    "**/*.{js,ts,jsx,tsx}",
    "**/node_modules/**"
  );
  const allTodos = [];

  for (const file of files) {
    try {
      const document = await vscode.workspace.openTextDocument(file);
      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const match = line.text.match(todoRegex);

        if (match) {
          // Find the category ID based on the matched name
          const matchedName = match[1].toLowerCase();
          const category = categories.find(
            (cat) => cat.name.toLowerCase() === matchedName
          );
          const categoryId = category ? category.id : matchedName;

          allTodos.push({
            id: `${file.fsPath}-${i + 1}`,
            categoryId: categoryId,
            text: match[2].trim(),
            file: file.fsPath,
            line: i + 1,
            source: "comment",
            completed: false,

            description: null,
            priority: null,
            date: null,
            startDate: null,
            endDate: null,
          });
        }
      }
    } catch (e) {
      console.error(`Could not read file: ${file.fsPath}`, e);
    }
  }

  console.log(`Finished scanning. Found ${allTodos.length} todos.`);
  return allTodos;
}

// SERVER FUNCTIONS
// This function now acts as a router to load the correct HTML
function getWebviewContent(
  isDevelopment: boolean,
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  if (isDevelopment) {
    // In development, we load from the Vite dev server for HMR
    return getWebviewContentDev();
  } else {
    // In production, we load the static files from the 'dist' folder
    return getWebviewContentProd(webview, extensionUri);
  }
}

// ✅ HTML for PRODUCTION mode (your existing dynamic loader)
function getWebviewContentProd(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  const buildPath = path.join(extensionUri.fsPath, "webview-ui", "dist");
  const indexPath = path.join(buildPath, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  const nonce = getNonce();

  html = html
    .replace(/(href|src)="(\/[^"]+)"/g, (_, type, assetPath) => {
      const assetUri = vscode.Uri.file(path.join(buildPath, assetPath));
      return `${type}="${webview.asWebviewUri(assetUri)}"`;
    })
    .replace(
      "</head>",
      `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';"></head>`
    )
    .replace(
      /<script type="module"/g,
      `<script type="module" nonce="${nonce}"`
    );

  return html;
}

// ✅ HTML for DEVELOPMENT mode (for live reload)
function getWebviewContentDev(): string {
  const nonce = getNonce();
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}' http://localhost:5173; connect-src ws://localhost:5173;">
        <title>Code Todos (Dev)</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" nonce="${nonce}">
            import RefreshRuntime from "http://localhost:5173/@react-refresh"
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <script type="module" nonce="${nonce}" src="http://localhost:5173/src/main.tsx"></script>
      </body>
    </html>`;
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function deactivate() {}

// features: Add user authentication
// fix bugs : Fix the empty categories issue
/* refactors: Refactor the webview creation logic */
