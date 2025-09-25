import * as vscode from "vscode";
import { DEFAULT_CATEGORIES } from "./constants";
import { mainPanel } from "./extension";
import { getSidebarContent } from "./webview/getSidebarContent";
import { CategoryType } from "./types/types";

export let sidebarWebview: vscode.Webview | undefined = undefined;
export class TodoViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "code-todos-view";

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    sidebarWebview = webviewView.webview;

    webviewView.onDidDispose(() => {
      sidebarWebview = undefined;
    });

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri],
    };

    const isDevelopment =
      this._context.extensionMode === vscode.ExtensionMode.Development;
    webviewView.webview.html = getSidebarContent(
      isDevelopment,
      webviewView.webview,
      this._context.extensionUri
    );

    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        vscode.commands.executeCommand("code-todos.showPanel");
      }
    });
    vscode.commands.executeCommand("code-todos.showPanel");

    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "get-sidebar-data": {
          const categories = this._context.workspaceState.get<CategoryType[]>(
            "todoCategories",
            DEFAULT_CATEGORIES
          );
          webviewView.webview.postMessage({
            command: "update-categories",
            data: categories,
          });
          return;
        }
        case "set-category-filter": {
          mainPanel?.webview.postMessage({
            command: "set-category-filter",
            data: message.data,
          });
          return;
        }
        case "open-modal": {
          if (!mainPanel) {
            await vscode.commands.executeCommand("code-todos.showPanel");
          }

          mainPanel?.webview.postMessage({
            command: "open-modal",
            data: message.data,
          });
          return;
        }
      }
    });
  }
}
