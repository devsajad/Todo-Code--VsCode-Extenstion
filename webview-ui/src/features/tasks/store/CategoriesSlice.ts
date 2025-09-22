import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../../store/store";
import type { CategoryType } from "../../../types/types";
import { vscode } from "../../../utils/vscode";
import { removeTasksByCategory } from "./TasksSlice";

const initialState: CategoryType[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setCategories: (state, action: PayloadAction<CategoryType[]>) => {
      return action.payload;
    },
    addCategory: (state, action: PayloadAction<CategoryType>) => {
      state.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((category) => category.id !== action.payload.id);
    },
    updateCategory: (state, action: PayloadAction<CategoryType>) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setCategories, addCategory, removeCategory, updateCategory } =
  categoriesSlice.actions;

// --- Thunk Action Creators ---

export const addCategoryThunk =
  (categoryData: Omit<CategoryType, "id">) => (dispatch: AppDispatch) => {
    const newCategory: CategoryType = {
      ...categoryData,
      id: categoryData.name.toLowerCase().replace(/\s+/g, "-"),
    };

    dispatch(addCategory(newCategory));

    vscode.postMessage({
      command: "add-category",
      data: newCategory,
    });
  };

export const removeCategoryThunk =
  (categoryId: string) => (dispatch: AppDispatch) => {
    dispatch(removeCategory({ id: categoryId }));
    dispatch(removeTasksByCategory(categoryId));

    vscode.postMessage({
      command: "remove-category",
      data: { id: categoryId },
    });
  };

export const updateCategoryAndCascadeThunk =
  (originalCategory: CategoryType, updatedData: Partial<CategoryType>) =>
  (dispatch: AppDispatch) => {
    const updatedCategory: CategoryType = {
      ...originalCategory,
      ...updatedData,
    };

    dispatch(updateCategory(updatedCategory));

    vscode.postMessage({
      command: "update-category-and-cascade",
      data: {
        originalCategory,
        updatedCategory,
      },
    });
  };

export default categoriesSlice.reducer;
