// src/extension.ts
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs"; // Import the Node.js file system module

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "code-todos.start",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "codeTodos",
        "Code Todos",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [context.extensionUri],
        }
      );

      panel.webview.html = getWebviewContent(
        panel.webview,
        context.extensionUri
      );

      // ✅ NEW: Handle messages from the webview (our React app)
      panel.webview.onDidReceiveMessage(
        async (message) => {
          if (message.command === "get-todos") {
            // The webview is ready and is asking for the data.
            // Run the scan and post the message back.
            const todos = await scanWorkspaceForTodos();
            panel.webview.postMessage({ command: "update-todos", data: todos });
          }
        },
        undefined,
        context.subscriptions
      );
    }
  );

  context.subscriptions.push(disposable);
}

// A helper function to generate a random nonce
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * ✅ This is the updated function that dynamically loads assets.
 * It reads the built index.html file, finds the asset paths,
 * and replaces them with webview-compatible URIs.
 */
function getWebviewContent(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  // 1. Get the path to the Vite build output (the "dist" folder)
  const buildPath = path.join(extensionUri.fsPath, "webview-ui", "dist");

  // 2. Get the URI for the index.html file
  const indexPath = path.join(buildPath, "index.html");

  // 3. Read the index.html file into a string
  let html = fs.readFileSync(indexPath, "utf8");

  // 4. Find all asset paths (e.g., /assets/index-....js) and replace them
  // with the special VS Code webview URI format.
  html = html.replace(/(href|src)="(\/[^"]+)"/g, (match, type, assetPath) => {
    const assetUri = vscode.Uri.file(path.join(buildPath, assetPath));
    const webviewUri = webview.asWebviewUri(assetUri);
    return `${type}="${webviewUri}"`;
  });

  // 5. Add the Content Security Policy and nonce
  const nonce = getNonce();
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">`;
  html = html.replace("</head>", `${csp}</head>`);

  // 6. Add the nonce to the script tag(s)
  html = html.replace(
    /<script type="module"/g,
    `<script type="module" nonce="${nonce}"`
  );

  return html;
}

// Add this new function to src/extension.ts

async function scanWorkspaceForTodos() {
  const files = await vscode.workspace.findFiles(
    "**/*.{js,ts,jsx,tsx}",
    "**/node_modules/**"
  );

  // ✅ DEBUG: See if any files are being found
  console.log(`Scanning... Found ${files.length} files.`);

  const allTodos = [];

  for (const file of files) {
    try {
      const document = await vscode.workspace.openTextDocument(file);
      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const match = line.text.match(/(fix-bug|refactor|feature)(.*)/);

        if (match) {
          // ✅ DEBUG: See if a match is ever found
          console.log(`Found a match in ${file.fsPath} on line ${i + 1}`);
          allTodos.push({
            type: match[1],
            text: match[2].trim(),
            file: file.fsPath,
            line: i + 1,
          });
        }
      }
    } catch (e) {
      console.error(`Could not read file: ${file.fsPath}`, e);
    }
  }

  // ✅ DEBUG: See what is being sent to the React app
  console.log(`Finished scanning. Found ${allTodos.length} todos.`);
  return allTodos;
}

export function deactivate() {}
