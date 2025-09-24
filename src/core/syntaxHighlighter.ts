import * as vscode from "vscode";
import { CategoryType } from "../types/types";
import { DEFAULT_CATEGORIES } from "../constants";

// Store decoration types for each category
const decorationTypes = new Map<string, vscode.TextEditorDecorationType>();

/**
 * Initialize or update decoration types based on current categories
 */
function updateDecorationTypes(categories: CategoryType[]): void {
  // Clear existing decorations
  decorationTypes.forEach((decoration) => decoration.dispose());
  decorationTypes.clear();

  // Create new decoration types for each category
  categories.forEach((category) => {
    const decorationType = vscode.window.createTextEditorDecorationType({
      backgroundColor: category.color,
      color: "#ffffff", // White text
      borderRadius: "3px",
      fontWeight: "bold",
      textDecoration: "none",
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
    decorationTypes.set(category.id, decorationType);
  });
}

/**
 * Apply syntax highlighting to all visible text editors
 */
export function updateDecorations(context: vscode.ExtensionContext): void {
  const categories: CategoryType[] = context.workspaceState.get(
    "todoCategories",
    DEFAULT_CATEGORIES
  );

  // Update decoration types if categories changed
  updateDecorationTypes(categories);

  // Apply decorations to all visible editors
  vscode.window.visibleTextEditors.forEach((editor) => {
    applyDecorationsToEditor(editor, categories);
  });
}

/**
 * Apply decorations to a specific text editor
 */
function applyDecorationsToEditor(
  editor: vscode.TextEditor,
  categories: CategoryType[]
): void {
  const document = editor.document;

  // Skip non-text files
  if (document.uri.scheme !== "file") {
    return;
  }

  // Create category name patterns for regex
  const categoryNames = categories.map((category) =>
    category.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );

  // Create regex pattern to match todo comments
  const todoPattern = `(?:\/\/|#|\\*|{\\/\\*)\\s*(${categoryNames.join(
    "|"
  )})\\s*:\\s*(.*)`;
  const todoRegex = new RegExp(todoPattern, "gi");

  // Clear existing decorations for all categories
  categories.forEach((category) => {
    const decorationType = decorationTypes.get(category.id);
    if (decorationType) {
      editor.setDecorations(decorationType, []);
    }
  });

  // Group decorations by category
  const decorationsByCategory = new Map<string, vscode.DecorationOptions[]>();
  categories.forEach((category) => {
    decorationsByCategory.set(category.id, []);
  });

  // Scan document for todo comments
  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    const line = document.lineAt(lineIndex);
    let match;

    // Reset regex lastIndex for each line
    todoRegex.lastIndex = 0;

    while ((match = todoRegex.exec(line.text)) !== null) {
      const matchedCategoryName = match[1].trim();
      const startPos = match.index;
      const endPos = match.index + match[0].length;

      // Find the matching category
      const foundCategory = categories.find(
        (cat) => cat.name.toLowerCase() === matchedCategoryName.toLowerCase()
      );

      if (foundCategory) {
        const startPosition = new vscode.Position(lineIndex, startPos);
        const endPosition = new vscode.Position(lineIndex, endPos);
        const decoration: vscode.DecorationOptions = {
          range: new vscode.Range(startPosition, endPosition),
          hoverMessage: `Todo: ${foundCategory.name}`,
        };

        const categoryDecorations = decorationsByCategory.get(foundCategory.id);
        if (categoryDecorations) {
          categoryDecorations.push(decoration);
        }
      }

      // Prevent infinite loop if regex doesn't advance
      if (match.index === todoRegex.lastIndex) {
        todoRegex.lastIndex++;
      }
    }
  }

  // Apply decorations for each category
  decorationsByCategory.forEach((decorations, categoryId) => {
    const decorationType = decorationTypes.get(categoryId);
    if (decorationType) {
      editor.setDecorations(decorationType, decorations);
    }
  });
}

/**
 * Initialize syntax highlighting feature
 */
export function initializeSyntaxHighlighting(
  context: vscode.ExtensionContext
): void {
  // Apply decorations when text documents are opened
  context.subscriptions.push(
    vscode.window.onDidChangeVisibleTextEditors(() => {
      updateDecorations(context);
    })
  );

  // Apply decorations when document content changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.visibleTextEditors.find(
        (editor) => editor.document === event.document
      );
      if (editor) {
        const categories: CategoryType[] = context.workspaceState.get(
          "todoCategories",
          DEFAULT_CATEGORIES
        );
        applyDecorationsToEditor(editor, categories);
      }
    })
  );

  // Note: We'll trigger decoration updates manually when categories are updated

  // Initial decoration update
  updateDecorations(context);
}

/**
 * Dispose all decorations when extension is deactivated
 */
export function disposeSyntaxHighlighting(): void {
  decorationTypes.forEach((decoration) => decoration.dispose());
  decorationTypes.clear();
}
