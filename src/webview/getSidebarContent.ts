import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

/**
 * Acts as a router to load the correct HTML for the SIDEBAR based on development mode
 */
export function getSidebarContent(
  isDevelopment: boolean,
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  if (false) {
    return getSidebarContentDev();
  } else {
    return getSidebarContentProd(webview, extensionUri);
  }
}

/**
 * HTML for PRODUCTION mode (loads from the built dist/sidebar.html)
 */
function getSidebarContentProd(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  const buildPath = path.join(extensionUri.fsPath, "webview-ui", "dist");
  // ✅ Changed to point to sidebar.html
  const indexPath = path.join(buildPath, "sidebar.html");
  let html = fs.readFileSync(indexPath, "utf8");
  const nonce = getNonce();

  html = html.replace(/(href|src)="(\/[^"]+)"/g, (_, type, assetPath) => {
    const assetUri = vscode.Uri.file(path.join(buildPath, assetPath));
    return `${type}="${webview.asWebviewUri(assetUri)}"`;
  });

  html = html.replace(/<script/g, `<script nonce="${nonce}"`);

  html = html.replace(
    "</head>",
    `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' ${webview.cspSource}; img-src ${webview.cspSource} data:;"></head>`
  );

  return html;
}

/**
 * HTML for DEVELOPMENT mode (for live reload with Vite dev server)
 */
function getSidebarContentDev(): string {
  const nonce = getNonce();
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}' http://localhost:5173; connect-src ws://localhost:5173;">
        <title>Sidebar (Dev)</title>
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
        <script type="module" nonce="${nonce}" src="http://localhost:5173/src/sidebar.tsx"></script>
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
