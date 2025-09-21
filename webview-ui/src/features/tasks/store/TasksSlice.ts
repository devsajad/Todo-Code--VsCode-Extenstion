import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/store/store";
import type { TaskType } from "../../types/types";
import { vscode } from "@/utils/vscode";
import type { RootState } from "@/store/store";

const initialState: TaskType[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      return action.payload;
    },
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    toggleTaskCompletion: (state, action: PayloadAction<{ id: string }>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  removeTask,
  updateTask,
  toggleTaskCompletion,
} = tasksSlice.actions;

// --- Thunk Action Creators ---

export const addManualTaskThunk =
  (taskData: Omit<TaskType, "id" | "source" | "completed">) =>
  (dispatch: AppDispatch) => {
    const newTask: TaskType = {
      ...taskData,
      id: `manual-${crypto.randomUUID()}`,
      source: "manual",
      completed: false,
    };
    dispatch(addTask(newTask));
    vscode.postMessage({ command: "add-manual-task", data: newTask });
  };

export const removeTaskThunk = (task: TaskType) => (dispatch: AppDispatch) => {
  dispatch(removeTask({ id: task.id }));

  if (task.source === "manual") {
    vscode.postMessage({
      command: "remove-manual-task",
      data: { taskId: task.id },
    });
  } else if (task.source === "comment") {
    vscode.postMessage({
      command: "remove-comment-task",
      data: {
        file: task.file,
        line: task.line,
      },
    });
  }
};

export const updateTaskThunk =
  (originalTask: TaskType, updatedTask: TaskType) =>
  (dispatch: AppDispatch) => {
    dispatch(updateTask(updatedTask));

    if (updatedTask.source === "manual") {
      vscode.postMessage({
        command: "update-manual-task",
        data: updatedTask,
      });
    } else if (updatedTask.source === "comment") {
      vscode.postMessage({
        command: "update-comment-task",

        data: {
          updatedTask: updatedTask,
          originalText: originalTask.text,
        },
      });
    }
  };

export const toggleTaskCompletionThunk =
  (task: TaskType) => (dispatch: AppDispatch) => {
    dispatch(toggleTaskCompletion({ id: task.id }));

    if (task.source === "manual") {
      vscode.postMessage({
        command: "update-task",
        data: { ...task, completed: !task.completed },
      });
    } else if (task.source === "comment") {
      vscode.postMessage({
        command: "toggle-comment-completion",
        data: task,
      });
    }
  };

export const removeTasksByCategory =
  (categoryId: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const tasks = getState().tasks;

    const tasksToRemove = tasks.filter(
      (task) => task.categoryId === categoryId
    );

    tasksToRemove.forEach((task) => {
      dispatch(removeTask({ id: task.id }));
    });
  };
// --- Reducer ---
export default tasksSlice.reducer;
