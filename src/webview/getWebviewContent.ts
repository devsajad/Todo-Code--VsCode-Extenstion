import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

/**
 * This function acts as a router to load the correct HTML based on development mode
 */
export function getWebviewContent(
  isDevelopment: boolean,
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  if (isDevelopment) {
    return getWebviewContentDev();
  } else {
    return getWebviewContentProd(webview, extensionUri);
  }
}

/**
 * HTML for PRODUCTION mode (loads from built dist folder)
 */
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

/**
 * HTML for DEVELOPMENT mode (for live reload with Vite dev server)
 */
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

/**
 * Generates a cryptographically secure nonce for CSP
 */
function getNonce(): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
