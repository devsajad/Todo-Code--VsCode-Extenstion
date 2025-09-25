import * as vscode from "vscode";
import { CategoryType, TaskType } from "../types/types";
import { DEFAULT_CATEGORIES } from "../constants";
import { scanWorkspaceForTodos } from "../core/workspaceScanner";
import { refactorCategoryNameInWorkspace } from "../core/workspaceRefactor";
import { updateDecorations } from "../core/syntaxHighlighter";
import { mainPanel } from "../extension";
import { sidebarWebview } from "../TodoViewProvider";

/**
 * Utils functions
 */
async function broadcastCategories(context: vscode.ExtensionContext) {
  const categories = context.workspaceState.get<CategoryType[]>(
    "todoCategories",
    DEFAULT_CATEGORIES
  );

  const message = { command: "categories-updated", data: categories };

  if (mainPanel) {
    mainPanel.webview.postMessage(message);
  }
  if (sidebarWebview) {
    sidebarWebview.postMessage(message);
  }

  updateDecorations(context);
}

/**
 * Handles all webview messages and routes them to appropriate handlers
 */
export async function handleWebviewMessage(
  message: any,
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
): Promise<void> {
  switch (message.command) {
    // --- DATA FETCHING ---
    case "get-data": {
      try {
        const categories = context.workspaceState.get(
          "todoCategories",
          DEFAULT_CATEGORIES
        );
        const manualTasks = context.workspaceState.get<TaskType[]>(
          "manualTasks",
          []
        );
        const completedCommentTasks = context.workspaceState.get<TaskType[]>(
          "completedCommentTasks",
          []
        );
        const activeCommentTasks = await scanWorkspaceForTodos(context);
        const allTasks = [
          ...manualTasks,
          ...activeCommentTasks,
          ...completedCommentTasks,
        ];
        const isHighlighterEnabled = context.globalState.get(
          "highlighterEnabled",
          true
        );

        panel.webview.postMessage({
          command: "update-data",
          data: {
            tasks: allTasks,
            categories: categories,
            settings: {
              isHighlighterEnabled,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        panel.webview.postMessage({
          command: "fetch-error",
          data: { message: "Could not load tasks from the workspace." },
        });
      }
      return;
    }

    // --- CATEGORY CRUD ---
    case "add-category": {
      try {
        const savedCategories = context.workspaceState.get<CategoryType[]>(
          "todoCategories",
          DEFAULT_CATEGORIES
        );
        const newCategory = message.data;
        const updatedCategories = [...savedCategories, newCategory];

        // Save the new list to storage
        await context.workspaceState.update(
          "todoCategories",
          updatedCategories
        );

        // ✅ Broadcast the changes to all UIs and update decorations
        await broadcastCategories(context);
      } catch (error) {
        console.error("Error adding category:", error);
        vscode.window.showErrorMessage("Failed to save the new category.");
      }
      return;
    }

    case "remove-category": {
      try {
        const savedCategories = context.workspaceState.get<CategoryType[]>(
          "todoCategories",
          DEFAULT_CATEGORIES
        );
        const categoryIdToRemove = message.data.id;
        const updatedCategories = savedCategories.filter(
          (cat) => cat.id !== categoryIdToRemove
        );

        await context.workspaceState.update(
          "todoCategories",
          updatedCategories
        );

        // ✅ Broadcast the changes to all UIs and update decorations
        await broadcastCategories(context);
      } catch (error) {
        console.error("Error removing category:", error);
        vscode.window.showErrorMessage("Failed to remove the category.");
      }
      return;
    }

    case "update-category-and-cascade": {
      try {
        const { originalCategory, updatedCategory } = message.data;
        const savedCategories = context.workspaceState.get<CategoryType[]>(
          "todoCategories",
          DEFAULT_CATEGORIES
        );
        const updatedCategories = savedCategories.map((cat) =>
          cat.id === originalCategory.id ? updatedCategory : cat
        );

        await context.workspaceState.update(
          "todoCategories",
          updatedCategories
        );

        if (originalCategory.name !== updatedCategory.name) {
          await refactorCategoryNameInWorkspace(
            originalCategory.name,
            updatedCategory.name
          );
        }

        // ✅ Broadcast the changes to all UIs and update decorations
        await broadcastCategories(context);
      } catch (error) {
        console.error("Error updating category and cascading changes:", error);
        vscode.window.showErrorMessage(
          "Failed to update the category and its comments."
        );
      }
      return;
    }

    // --- TASK CRUD (for manual tasks) ---
    case "add-manual-task": {
      try {
        const savedTasks = context.workspaceState.get<TaskType[]>(
          "manualTasks",
          []
        );
        const newTask = message.data;
        const updatedTasks = [...savedTasks, newTask];
        await context.workspaceState.update("manualTasks", updatedTasks);
      } catch (error) {
        console.error("Error adding manual task:", error);
        vscode.window.showErrorMessage("Failed to save the new task.");
      }
      return;
    }

    case "remove-manual-task": {
      try {
        const savedTasks = context.workspaceState.get<TaskType[]>(
          "manualTasks",
          []
        );
        const { taskId } = message.data;
        const updatedTasks = savedTasks.filter((task) => task.id !== taskId);
        await context.workspaceState.update("manualTasks", updatedTasks);
      } catch (error) {
        console.error("Error removing manual task:", error);
        vscode.window.showErrorMessage("Failed to remove the task.");
      }
      return;
    }

    case "remove-comment-task": {
      const { file, line } = message.data;
      if (!file || !line) {
        return;
      }
      try {
        const uri = vscode.Uri.file(file);
        const document = await vscode.workspace.openTextDocument(uri);
        const lineToRemove = document.lineAt(line - 1);
        const edit = new vscode.WorkspaceEdit();
        edit.delete(uri, lineToRemove.rangeIncludingLineBreak);
        await vscode.workspace.applyEdit(edit);
      } catch (error) {
        console.error("Failed to remove comment task:", error);
        vscode.window.showErrorMessage(
          "Could not remove the task comment from the file."
        );
      }
      return;
    }

    case "update-manual-task": {
      try {
        const savedTasks = context.workspaceState.get<TaskType[]>(
          "manualTasks",
          []
        );
        const updatedTask = message.data;
        const updatedTasks = savedTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        await context.workspaceState.update("manualTasks", updatedTasks);
      } catch (error) {
        console.error("Error updating manual task:", error);
        vscode.window.showErrorMessage("Failed to update the task.");
      }
      return;
    }

    case "update-comment-task": {
      try {
        const { updatedTask, originalText } = message.data as {
          updatedTask: TaskType;
          originalText: string;
        };

        if (!updatedTask.file || updatedTask.line === undefined) {
          return;
        }
        const uri = vscode.Uri.file(updatedTask.file);
        const document = await vscode.workspace.openTextDocument(uri);
        const lineToReplace = document.lineAt(updatedTask.line - 1);
        const originalLineText = lineToReplace.text;
        const newLineText = originalLineText.replace(
          originalText,
          updatedTask.text
        );
        const edit = new vscode.WorkspaceEdit();
        edit.replace(uri, lineToReplace.range, newLineText);
        await vscode.workspace.applyEdit(edit);
      } catch (error) {
        console.error("Failed to update comment task:", error);
        vscode.window.showErrorMessage(
          "Could not update the task comment in the file."
        );
      }
      return;
    }

    case "toggle-comment-completion": {
      try {
        const task = message.data as TaskType;
        if (!task || !task.file || task.line === undefined) {
          return;
        }
        const uri = vscode.Uri.file(task.file);
        const savedCompletedTasks = context.workspaceState.get<TaskType[]>(
          "completedCommentTasks",
          []
        );
        const edit = new vscode.WorkspaceEdit();

        // The task from the UI has its OLD completed status
        if (task.completed === false) {
          // --- ACTION: MARKING AS COMPLETE ---
          const document = await vscode.workspace.openTextDocument(uri);
          const lineToModify = document.lineAt(task.line - 1);
          const originalLineText = lineToModify.text;

          // ✅ THE FIX: Replace the line's content with an empty string, preserving the line itself.
          edit.replace(uri, lineToModify.range, "");

          // Add the task to our persistent list, including the original text
          const updatedCompletedTasks = [
            ...savedCompletedTasks,
            {
              ...task,
              completed: true,
              originalLineText: originalLineText,
            },
          ];
          await context.workspaceState.update(
            "completedCommentTasks",
            updatedCompletedTasks
          );
        } else {
          // --- ACTION: MARKING AS INCOMPLETE ---
          // This part now works perfectly because we are writing back to an empty line.
          const commentTextToRestore = task.originalLineText ?? ""; // Use the saved text

          // We need to know the range of the (now empty) line to replace it.
          const document = await vscode.workspace.openTextDocument(uri);
          const lineToRestore = document.lineAt(task.line - 1);

          edit.replace(uri, lineToRestore.range, commentTextToRestore);

          // Remove the task from our persistent list
          const updatedCompletedTasks = savedCompletedTasks.filter(
            (t) => t.id !== task.id
          );
          await context.workspaceState.update(
            "completedCommentTasks",
            updatedCompletedTasks
          );
        }

        await vscode.workspace.applyEdit(edit);
      } catch (error) {
        console.error("Error toggling comment completion:", error);
        vscode.window.showErrorMessage(
          "Failed to update the task comment in the file."
        );
      }
      return;
    }

    // Open file message
    case "open-file": {
      try {
        const { file, line } = message.data;
        if (!file || !line) {
          return;
        }
        const fileUri = vscode.Uri.file(file);
        await vscode.window.showTextDocument(fileUri, {
          selection: new vscode.Range(
            new vscode.Position(line - 1, 0),
            new vscode.Position(line - 1, 0)
          ),
        });
      } catch (error) {
        console.error("Error opening file:", error);
        vscode.window.showErrorMessage("Could not open the specified file.");
      }
      return;
    }

    // --- THEME MANAGEMENT ---
    case "get-theme": {
      try {
        const theme = context.globalState.get("theme", "vscode");
        panel.webview.postMessage({
          command: "set-theme",
          data: { theme },
        });
      } catch (error) {
        console.error("Error getting theme:", error);
        panel.webview.postMessage({
          command: "theme-error",
          data: { message: "Could not load theme." },
        });
      }
      return;
    }

    case "set-theme": {
      try {
        const { theme } = message.data;
        await context.globalState.update("theme", theme);
      } catch (error) {
        console.error("Error setting theme:", error);
        vscode.window.showErrorMessage("Could not save theme.");
      }
      return;
    }

    case "toggle-highlighter": {
      try {
        const { enabled } = message.data;
        await context.globalState.update("highlighterEnabled", enabled);

        updateDecorations(context);
      } catch (error) {
        console.error("Error toggling highlighter:", error);
        vscode.window.showErrorMessage(
          "Could not save highlighter preference."
        );
      }
      return;
    }
  }
}
