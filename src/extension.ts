import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { TodoViewProvider } from "./TodoViewProvider";
import { CategoryType, TaskType } from "./types/types";

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
              const categories = context.workspaceState.get(
                "todoCategories",
                DEFAULT_CATEGORIES
              );
              const manualTasks = context.workspaceState.get<TaskType[]>(
                "manualTasks",
                []
              );

              // ✅ 1. Load the new list of completed comment tasks
              const completedCommentTasks = context.workspaceState.get<
                TaskType[]
              >("completedCommentTasks", []);

              // ✅ 2. Scan for ACTIVE comment tasks
              const activeCommentTasks = await scanWorkspaceForTodos(context);

              // ✅ 3. Combine ALL tasks together
              const allTasks = [
                ...manualTasks,
                ...activeCommentTasks,
                ...completedCommentTasks,
              ];

              panel.webview.postMessage({
                command: "update-data",
                data: {
                  tasks: allTasks,
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

            case "update-category-and-cascade": {
              const { originalCategory, updatedCategory } = message.data;

              // 1. Update the category list in workspaceState
              const savedCategories = context.workspaceState.get<
                CategoryType[]
              >("todoCategories", DEFAULT_CATEGORIES);
              const updatedCategories = savedCategories.map((cat) =>
                cat.id === originalCategory.id ? updatedCategory : cat
              );
              await context.workspaceState.update(
                "todoCategories",
                updatedCategories
              );

              // 2. If the name changed, trigger the workspace-wide refactor
              if (originalCategory.name !== updatedCategory.name) {
                await refactorCategoryNameInWorkspace(
                  originalCategory.name,
                  updatedCategory.name
                );
              }

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

            // ✅ RENAME this case from "remove-task" to "remove-manual-task"
            case "remove-manual-task": {
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

            // ✅ ADD this new case to handle deleting comments from files
            case "remove-comment-task": {
              const { file, line } = message.data;
              if (!file || !line) {
                return;
              }

              try {
                const uri = vscode.Uri.file(file);
                const document = await vscode.workspace.openTextDocument(uri);
                const lineToRemove = document.lineAt(line - 1);

                const edit = new vscode.WorkspaceEdit();
                // Delete the entire line, including the line break
                edit.delete(uri, lineToRemove.rangeIncludingLineBreak);

                await vscode.workspace.applyEdit(edit);
              } catch (error) {
                console.error("Failed to remove comment task:", error);
                vscode.window.showErrorMessage(
                  "Could not remove the task comment from the file."
                );
              }
              return;
            }

            case "update-manual-task": {
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
            // Inside your onDidReceiveMessage listener's switch statement

            case "update-comment-task": {
              // ✅ 1. Destructure the new data from the message
              const { updatedTask, originalText } = message.data as {
                updatedTask: TaskType;
                originalText: string;
              };

              if (!updatedTask.file || updatedTask.line === undefined) {
                return;
              }

              try {
                const uri = vscode.Uri.file(updatedTask.file);
                const document = await vscode.workspace.openTextDocument(uri);
                const lineToReplace = document.lineAt(updatedTask.line - 1);

                // 2. Get the full, original text of the line (e.g., "/* features: old text */")
                const originalLineText = lineToReplace.text;

                // 3. ✅ Use a simple and reliable string replacement
                // This preserves all original indentation and comment syntax (/*, */, //, etc.)
                const newLineText = originalLineText.replace(
                  originalText,
                  updatedTask.text
                );

                // 4. Use WorkspaceEdit to replace the entire old line with the new one
                const edit = new vscode.WorkspaceEdit();
                edit.replace(uri, lineToReplace.range, newLineText);
                await vscode.workspace.applyEdit(edit);
              } catch (error) {
                console.error("Failed to update comment task:", error);
                vscode.window.showErrorMessage(
                  "Could not update the task comment in the file."
                );
              }
              return;
            }

            // Inside your onDidReceiveMessage listener's switch statement

            // Inside your onDidReceiveMessage listener's switch statement

            case "toggle-comment-completion": {
              const task = message.data as TaskType;
              if (!task || !task.file || task.line === undefined) {
                return;
              }

              const uri = vscode.Uri.file(task.file);
              const edit = new vscode.WorkspaceEdit();
              const savedCompletedTasks = context.workspaceState.get<
                TaskType[]
              >("completedCommentTasks", []);

              // The task from the UI has its OLD completed status
              if (task.completed === false) {
                // --- ACTION: MARKING AS COMPLETE ---
                const document = await vscode.workspace.openTextDocument(uri);
                const lineToModify = document.lineAt(task.line - 1);
                const originalLineText = lineToModify.text;

                // ✅ THE FIX: Replace the line's content with an empty string, preserving the line itself.
                edit.replace(uri, lineToModify.range, "");

                // Add the task to our persistent list, including the original text
                const updatedCompletedTasks = [
                  ...savedCompletedTasks,
                  {
                    ...task,
                    completed: true,
                    originalLineText: originalLineText,
                  },
                ];
                await context.workspaceState.update(
                  "completedCommentTasks",
                  updatedCompletedTasks
                );
              } else {
                // --- ACTION: MARKING AS INCOMPLETE ---
                // This part now works perfectly because we are writing back to an empty line.
                const commentTextToRestore = task.originalLineText ?? ""; // Use the saved text

                // We need to know the range of the (now empty) line to replace it.
                const document = await vscode.workspace.openTextDocument(uri);
                const lineToRestore = document.lineAt(task.line - 1);

                edit.replace(uri, lineToRestore.range, commentTextToRestore);

                // Remove the task from our persistent list
                const updatedCompletedTasks = savedCompletedTasks.filter(
                  (t) => t.id !== task.id
                );
                await context.workspaceState.update(
                  "completedCommentTasks",
                  updatedCompletedTasks
                );
              }

              await vscode.workspace.applyEdit(edit);
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

            // Inside your onDidReceiveMessage listener's switch statement

            // --- THEME MANAGEMENT ---
            case "get-theme": {
              // Get the saved theme, defaulting to 'vscode'
              const theme = context.globalState.get("theme", "vscode");
              panel.webview.postMessage({
                command: "set-theme",
                data: { theme },
              });
              return;
            }

            case "set-theme": {
              const { theme } = message.data;
              // Save the new theme choice to global storage
              await context.globalState.update("theme", theme);
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

async function scanWorkspaceForTodos(
  context: vscode.ExtensionContext
): Promise<TaskType[]> {
  const categories: CategoryType[] = context.workspaceState.get(
    "todoCategories",
    DEFAULT_CATEGORIES
  );

  const categoryNames = categories.map((category) =>
    category.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );

  // This regex is broad enough, we'll just clean the result.
  // ✅ NEW, MORE UNIVERSAL PATTERN
  const todoPattern = `(?:\/\/|#|\\*|{\\/\\*)\\s*(${categoryNames.join(
    "|"
  )})\\s*:\\s*(.*)`;
  const todoRegex = new RegExp(todoPattern, "i");

  const files = await vscode.workspace.findFiles(
    "**/*.{js,ts,jsx,tsx,html,css,scss,json,md,py,rb,java,cs,go,php,sh,yml,yaml,dockerfile}",
    "**/{node_modules,dist,build,out,vendor,.git}/**"
  );

  const allTodos: TaskType[] = [];

  for (const file of files) {
    try {
      const document = await vscode.workspace.openTextDocument(file);
      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const match = line.text.match(todoRegex);

        if (match) {
          const matchedCategoryName = match[1].trim();
          let taskText = match[2]; // Get the raw text

          // ✅ FIX: Clean up trailing comment characters like */ or */}
          taskText = taskText.replace(/(\*\/\}|\*\/)\s*$/, "").trim();

          const foundCategory = categories.find(
            (cat) =>
              cat.name.toLowerCase() === matchedCategoryName.toLowerCase()
          );

          if (foundCategory) {
            allTodos.push({
              id: `comment-${crypto.randomUUID()}`,
              categoryId: foundCategory.id,
              text: taskText, // Use the cleaned text
              file: file.fsPath,
              line: i + 1,
              source: "comment",
              completed: false,
              // ... other properties
            });
          }
        }
      }
    } catch (e) {
      // Silently ignore binary files or files that can't be read as text
      if (
        e instanceof Error &&
        e.message.includes("cannot be opened with this editor")
      ) {
        // This is expected for binary files, do nothing.
      } else {
        console.error(`Could not read file: ${file.fsPath}`, e);
      }
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

// in src/extension.ts

/**
 * Finds all instances of a category name in comments and replaces them.
 * @param originalName The old category name to find.
 * @param newName The new category name to replace it with.
 */
async function refactorCategoryNameInWorkspace(
  originalName: string,
  newName: string
) {
  const edit = new vscode.WorkspaceEdit();
  // Use a simple regex to find the line based on the old name
  const findPattern = `(?:\/\/|\\*)\\s*${originalName}\\s*:\\s*(.*)`;
  const findRegex = new RegExp(findPattern, "i"); // "i" for case-insensitive

  // Find all relevant files in the workspace
  const files = await vscode.workspace.findFiles(
    "**/*.{js,ts,jsx,tsx}",
    "**/node_modules/**"
  );

  for (const file of files) {
    const document = await vscode.workspace.openTextDocument(file);
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      if (findRegex.test(line.text)) {
        // If we find a match, perform a case-insensitive replace on that line
        const newLineText = line.text.replace(
          new RegExp(originalName, "i"),
          newName
        );
        // Add this change to our collection of edits
        edit.replace(file, line.range, newLineText);
      }
    }
  }
  // Apply all collected edits across all files in a single, undoable action
  await vscode.workspace.applyEdit(edit);
}
