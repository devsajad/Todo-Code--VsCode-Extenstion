import * as vscode from "vscode";
import { DEFAULT_CATEGORIES } from "./constants";
import { mainPanel } from "./extension";
import { getSidebarContent } from "./webview/getSidebarContent";
import { CategoryType } from "./types/types";

export class TodoViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "code-todos-view";
  private _view?: vscode.WebviewView;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
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

    // ✅ Listen for when the sidebar's visibility changes.
    // This event fires every time the user clicks the icon to show the view.
    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        vscode.commands.executeCommand("code-todos.showPanel");
      }
    });

    // ✅ Also trigger the command once when the view is first created.
    vscode.commands.executeCommand("code-todos.showPanel");

    // The message listener for the sidebar's own functionality remains the same.
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
          if (mainPanel) {
            mainPanel.webview.postMessage({
              command: "set-category-filter",
              data: message.data,
            });
          }
          return;
        }
        case "open-modal": {
          // If the main panel isn't open, open it first, then send the message.
          if (!mainPanel) {
            await vscode.commands.executeCommand("code-todos.showPanel");
          }
          // A short delay ensures the panel is ready to receive the message.
          setTimeout(() => {
            mainPanel?.webview.postMessage({
              command: "open-modal",
              data: message.data,
            });
          }, 100);
          return;
        }
      }
    });
  }
}
