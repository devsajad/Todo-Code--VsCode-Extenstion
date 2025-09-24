import * as vscode from "vscode";
import { TodoViewProvider } from "./TodoViewProvider";
import { getWebviewContent } from "./webview/getWebviewContent";
import { handleWebviewMessage } from "./commands/messageHandler";

/**
 * Main extension activation function
 * This is now much cleaner and focused on the core extension setup
 */
export function activate(context: vscode.ExtensionContext) {
  // Register the sidebar provider
  const sidebarProvider = new TodoViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TodoViewProvider.viewType,
      sidebarProvider
    )
  );

  // Register the main panel command
  const disposable = vscode.commands.registerCommand(
    "code-todos.showPanel",
    () => {
      createTodoPanel(context);
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * Creates and configures the main todo panel
 */
function createTodoPanel(context: vscode.ExtensionContext): void {
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

  // Handle all webview messages
  panel.webview.onDidReceiveMessage(
    async (message) => {
      await handleWebviewMessage(message, context, panel);
    },
    undefined,
    context.subscriptions
  );
}

/**
 * Extension deactivation function
 */

export function deactivate() {}

// Example comments for testing the scanner:
// features: Add user authentication
// fix bugs: Fix the empty categories issue
/* refactors: Refactor the webview creation logic */
