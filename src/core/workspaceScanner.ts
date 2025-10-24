import * as vscode from "vscode";
import { CategoryType, TaskType } from "../types/types";
import { DEFAULT_CATEGORIES } from "../constants";

/**
 * Scans the workspace for todo comments and returns them as TaskType[]
 */
export async function scanWorkspaceForTodos(
  context: vscode.ExtensionContext
): Promise<TaskType[]> {
  const categories: CategoryType[] = context.workspaceState.get(
    "todoCategories",
    DEFAULT_CATEGORIES
  );

  const categoryNames = categories.map((category) =>
    category.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );

  const todoPattern = `(?:\/\/|#|\\*|{\\/\\*)\\s*(${categoryNames.join(
    "|"
  )})\\s*:\\s*(.*)`;
  const todoRegex = new RegExp(todoPattern, "i");

  const files = await vscode.workspace.findFiles(
    "**/*.{js,ts,jsx,tsx,html,css,scss,json,md,py,rb,java,cs,go,php,sh,yml,yaml,dockerfile}",
    "**/{node_modules,dist,build,out,vendor,.git}/**"
  );

  const allTodos: TaskType[] = [];

  for (const file of files) {
    try {
      const document = await vscode.workspace.openTextDocument(file);
      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const match = line.text.match(todoRegex);

        if (match) {
          const matchedCategoryName = match[1].trim();
          let taskText = match[2]; // Get the raw text

          // ✅ FIX: Clean up trailing comment characters like */ or */}
          taskText = taskText.replace(/(\*\/\}|\*\/)\s*$/, "").trim();

          const foundCategory = categories.find(
            (cat) =>
              cat.name.toLowerCase() === matchedCategoryName.toLowerCase()
          );

          if (foundCategory) {
            allTodos.push({
              id: `comment-${crypto.randomUUID()}`,
              categoryId: foundCategory.id,
              text: taskText, // Use the cleaned text
              file: file.fsPath,
              line: i + 1,
              source: "comment",
              completed: false,
              // ... other properties
            });
          }
        }
      }
    } catch (e) {
      // Silently ignore binary files or files that can't be read as text
      if (
        e instanceof Error &&
        e.message.includes("cannot be opened with this editor")
      ) {
        // This is expected for binary files, do nothing.
      } else {
        console.error(`Could not read file: ${file.fsPath}`, e);
      }
    }
  }

  console.log(`Finished scanning. Found ${allTodos.length} todos.`);
  return allTodos;
}
