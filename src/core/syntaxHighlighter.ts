import * as vscode from "vscode";
import { CategoryType } from "../types/types";
import { DEFAULT_CATEGORIES } from "../constants";

// This map stores the created style rules for each category
const decorationTypes = new Map<string, vscode.TextEditorDecorationType>();

/**
 * Creates the style rules (DecorationTypes) for each category.
 * This function is unchanged, respecting your original styling.
 */
function updateDecorationTypes(categories: CategoryType[]): void {
  decorationTypes.forEach((decoration) => decoration.dispose());
  decorationTypes.clear();

  categories.forEach((category) => {
    const decorationType = vscode.window.createTextEditorDecorationType({
      backgroundColor: category.color,
      color: "#ffffff",
      borderRadius: "3px",
      fontWeight: "bold",
      textDecoration: "none",
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
    decorationTypes.set(category.id, decorationType);
  });
}

/**
 * ✅ NEW: A dedicated function to clear all decorations from all visible editors.
 */
function clearAllDecorations(): void {
  vscode.window.visibleTextEditors.forEach((editor) => {
    decorationTypes.forEach((decorationType) => {
      editor.setDecorations(decorationType, []);
    });
  });
}

/**
 * Scans a single editor and applies the correct decorations.
 * This logic remains the same.
 */
function applyDecorationsToEditor(
  editor: vscode.TextEditor,
  categories: CategoryType[]
): void {
  const document = editor.document;
  if (document.uri.scheme !== "file") return;

  const categoryNames = categories.map((category) =>
    category.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );
  if (categoryNames.length === 0) return;

  const todoPattern = `(?:\/\/|#|\\*|{\\/\\*)\\s*(${categoryNames.join(
    "|"
  )})\\s*:\\s*(.*)`;
  const todoRegex = new RegExp(todoPattern, "gi");

  const decorationsByCategory = new Map<string, vscode.DecorationOptions[]>();
  categories.forEach((category) => decorationsByCategory.set(category.id, []));

  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    const line = document.lineAt(lineIndex);

    for (const match of line.text.matchAll(todoRegex)) {
      const matchedCategoryName = match[1].trim();
      const foundCategory = categories.find(
        (cat) => cat.name.toLowerCase() === matchedCategoryName.toLowerCase()
      );

      if (foundCategory && match.index !== undefined) {
        const startOffset = line.text.indexOf(match[1], match.index);

        const endOffset = startOffset + match[1].length;

        const startPosition = new vscode.Position(lineIndex, startOffset);
        const endPosition = new vscode.Position(lineIndex, endOffset);

        const decoration: vscode.DecorationOptions = {
          range: new vscode.Range(startPosition, endPosition),
          hoverMessage: `Todo: ${foundCategory.name}`,
        };

        decorationsByCategory.get(foundCategory.id)?.push(decoration);
      }
    }
  }

  // Clear old decorations before applying new ones
  decorationTypes.forEach((decorationType, categoryId) => {
    editor.setDecorations(
      decorationType,
      decorationsByCategory.get(categoryId) || []
    );
  });
}

export function updateDecorations(context: vscode.ExtensionContext): void {
  const isEnabled = context.globalState.get("highlighterEnabled", true);

  if (!isEnabled) {
    clearAllDecorations();
    return;
  }

  const categories: CategoryType[] = context.workspaceState.get(
    "todoCategories",
    DEFAULT_CATEGORIES
  );
  updateDecorationTypes(categories);

  vscode.window.visibleTextEditors.forEach((editor) => {
    applyDecorationsToEditor(editor, categories);
  });
}


export function initializeSyntaxHighlighting(
  context: vscode.ExtensionContext
): void {
  let timeout: NodeJS.Timeout | undefined = undefined;

  // Create a single debounced trigger function for performance
  const triggerUpdateDecorations = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    timeout = setTimeout(() => updateDecorations(context), 500);
  };

  // Update when the user switches to a different file
  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  // Update when the user types in a file
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (
        vscode.window.activeTextEditor &&
        event.document === vscode.window.activeTextEditor.document
      ) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  // Initial update for any files that are already open
  updateDecorations(context);
}

/**
 * ✅ REFACTORED: Cleans up all decorations when the extension is deactivated.
 */
export function disposeSyntaxHighlighting(): void {
  clearAllDecorations();
  decorationTypes.forEach((decoration) => decoration.dispose());
  decorationTypes.clear();
}
