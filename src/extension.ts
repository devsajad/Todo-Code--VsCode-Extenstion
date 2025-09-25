import * as vscode from "vscode";
import { TodoViewProvider } from "./TodoViewProvider";
import { getWebviewContent } from "./webview/getWebviewContent";
import { handleWebviewMessage } from "./commands/messageHandler";
import {
  initializeSyntaxHighlighting,
  disposeSyntaxHighlighting,
} from "./core/syntaxHighlighter";

// ✅ 1. Declare a variable to hold the panel instance. Export it so other files can access it.
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
  // ✅ 2. If the panel already exists, just reveal it and stop.
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

  // ✅ 3. Set our module-level variable to the new panel instance.
  mainPanel = panel;

  // ✅ 4. When the panel is closed by the user, clear our reference.
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
