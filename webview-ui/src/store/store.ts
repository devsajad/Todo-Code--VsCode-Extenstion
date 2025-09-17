import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/store/TasksSlice";
import categoriesReducer from "../features/tasks/store/CategoriesSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
