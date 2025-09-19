import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/store/store";
import type { TaskType } from "../../types/types";
import { vscode } from "@/utils/vscode";

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

export const updateTaskThunk = (task: TaskType) => (dispatch: AppDispatch) => {
  dispatch(updateTask(task));
  vscode.postMessage({ command: "update-task", data: task });
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

// --- Reducer ---
export default tasksSlice.reducer;
