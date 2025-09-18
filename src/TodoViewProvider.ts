import * as vscode from "vscode";

export class TodoViewProvider implements vscode.WebviewViewProvider {
  // This must match the `id` of the view you defined in package.json
  public static readonly viewType = "code-todos-view";

  constructor(private readonly _context: vscode.ExtensionContext) {}

  // This method is called by VS Code when the user clicks your icon
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    // We don't need to do much here, just set some basic options
    // and provide simple HTML for the sidebar itself.
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri],
    };

    webviewView.webview.html = this._getHtmlForSidebar();

    // The most important part: when the view is created, we trigger
    // our command to open the main, full-sized editor panel.
    vscode.commands.executeCommand("code-todos.showPanel");
  }

  private _getHtmlForSidebar(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: var(--vscode-font-family); 
            color: var(--vscode-foreground); 
            padding: 1rem; 
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h3>Code Todos</h3>
        <p>Opening the main editor panel...</p>
      </body>
      </html>
    `;
  }
}
