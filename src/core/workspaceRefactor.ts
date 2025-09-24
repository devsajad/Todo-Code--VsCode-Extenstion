import * as vscode from "vscode";

/**
 * Finds all instances of a category name in comments and replaces them.
 * @param originalName The old category name to find.
 * @param newName The new category name to replace it with.
 */
export async function refactorCategoryNameInWorkspace(
  originalName: string,
  newName: string
): Promise<void> {
  const edit = new vscode.WorkspaceEdit();
  // Use a simple regex to find the line based on the old name
  const findPattern = `(?:\/\/|\\*)\\s*${originalName}\\s*:\\s*(.*)`;
  const findRegex = new RegExp(findPattern, "i"); // "i" for case-insensitive

  // Find all relevant files in the workspace
  const files = await vscode.workspace.findFiles(
    "**/*.{js,ts,jsx,tsx}",
    "**/node_modules/**"
  );

  for (const file of files) {
    const document = await vscode.workspace.openTextDocument(file);
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      if (findRegex.test(line.text)) {
        // If we find a match, perform a case-insensitive replace on that line
        const newLineText = line.text.replace(
          new RegExp(originalName, "i"),
          newName
        );
        // Add this change to our collection of edits
        edit.replace(file, line.range, newLineText);
      }
    }
  }
  // Apply all collected edits across all files in a single, undoable action
  await vscode.workspace.applyEdit(edit);
}
