import * as vscode from "vscode";
import { TodoViewProvider } from "./TodoViewProvider";
import { getWebviewContent } from "./webview/getWebviewContent";
import { handleWebviewMessage } from "./commands/messageHandler";
import {
  initializeSyntaxHighlighting,
  disposeSyntaxHighlighting,
} from "./core/syntaxHighlighter";

export let mainPanel: vscode.WebviewPanel | undefined = undefined;

/**
 * Main extension activation function
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
  context.subscriptions.push(
    vscode.commands.registerCommand("code-todos.showPanel", () => {
      createTodoPanel(context);
    })
  );

  // Initialize syntax highlighting
  initializeSyntaxHighlighting(context);
}

/**
 * Creates and configures the main todo panel, managing its state.
 */
function createTodoPanel(context: vscode.ExtensionContext): void {
  if (mainPanel) {
    mainPanel.reveal(vscode.ViewColumn.One);
    return;
  }

  // Otherwise, create a new panel.
  const panel = vscode.window.createWebviewPanel(
    "codeTodosPanel",
    "Code Todos",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [context.extensionUri],
    }
  );

  mainPanel = panel;

  panel.onDidDispose(
    () => {
      mainPanel = undefined;
    },
    null,
    context.subscriptions
  );

  const isDevelopment =
    context.extensionMode === vscode.ExtensionMode.Development;
  panel.webview.html = getWebviewContent(
    isDevelopment,
    panel.webview,
    context.extensionUri
  );

  // Handle all webview messages by passing the panel and context
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
export function deactivate() {
  // Clean up syntax highlighting decorations
  disposeSyntaxHighlighting();
}
