import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
const DEFAULT_CATEGORIES = [
  {
    id: "feature",
    color: "green",
    icon: "VscGitPullRequest",
    name: "App Features",
  },
  {
    id: "fix-bug",
    color: "red",
    icon: "VscBug",
    name: "Fix Bugs",
  },
  {
    id: "refactor",
    color: "yellow",
    icon: "VscSync",
    name: "Refactors",
  },
];

export function activate(context: vscode.ExtensionContext) {
  // Determine if we are in development mode by checking the extension's mode
  const isDevelopment =
    context.extensionMode === vscode.ExtensionMode.Development;

  let disposable = vscode.commands.registerCommand(
    "code-todos.start",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "codeTodos",
        "Code Todos",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          // Restrict the webview to only loading content from our extension's directories
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "webview-ui/dist"),
          ],
        }
      );

      // Set the webview's content based on the mode
      panel.webview.html = getWebviewContent(
        isDevelopment,
        panel.webview,
        context.extensionUri
      );

      // Handle messages from the webview (our React app)
      panel.webview.onDidReceiveMessage(
        async (message) => {
          if (message.command === "get-data") {
            // Load categories from storage
            const categories = context.workspaceState.get(
              "todoCategories",
              DEFAULT_CATEGORIES
            );
            // Load manual tasks from storage
            const manualTasks = context.workspaceState.get("manualTasks", []);
            // Scan the workspace for comment-based tasks
            const commentTasks = await scanWorkspaceForTodos(context);

            // Send the complete state to the frontend
            panel.webview.postMessage({
              command: "update-data",
              data: {
                tasks: [...manualTasks, ...commentTasks],
                categories: categories,
              },
            });
          }

          // Handle adding a new manual task
          if (message.command === "add-manual-task") {
            const savedTasks = context.workspaceState.get("manualTasks", []);
            const updatedTasks = [...savedTasks, message.data];
            // Save the updated list back to storage
            await context.workspaceState.update("manualTasks", updatedTasks);
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
  const categoriesIds = categories.map((category) => category.id);

  const todoPattern = `(?:\/\/|\\*)\\s*##(${categoriesIds.join(
    "|"
  )})(:|\\s)(.*)`;

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
          console.log(match);
          allTodos.push({
            categoryId: match[1].toLowerCase(),
            text: match[3].trim(),
            description: null,
            file: file.fsPath,
            line: i + 1,
            priority: null,
            date: null,
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
