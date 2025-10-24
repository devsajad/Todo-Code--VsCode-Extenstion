import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/store/TasksSlice";
import categoriesReducer from "../features/categories/store/CategoriesSlice";
import filterReducer from "../features/tasks/store/FilterSlice";
import modalReducer from "@/components/ui/Modal/store/modalSlice";
import settingsReducer from "@/features/settings/store/settingsSlice";
import themeReducer from "@/features/settings/store/themeSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    filters: filterReducer,
    settings: settingsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
