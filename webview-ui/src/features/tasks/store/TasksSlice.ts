import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskType } from "../../types/types";

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
  },
});

export const { setTasks, addTask, removeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
