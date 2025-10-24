import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryType } from "../../../types/types";
import { vscode } from "../../../utils/vscode";

const initialState: CategoryType[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setCategories: (_, action: PayloadAction<CategoryType[]>) => {
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

/**
 * Thunks
 */
export const addCategoryThunk =
  (categoryData: Omit<CategoryType, "id">) => () => {
    const newCategory: CategoryType = {
      ...categoryData,
      id: categoryData.name.toLowerCase().replace(/\s+/g, "-"),
    };

    vscode.postMessage({
      command: "add-category",
      data: newCategory,
    });
  };

export const removeCategoryThunk = (categoryId: string) => () => {
  vscode.postMessage({
    command: "remove-category",
    data: { id: categoryId },
  });
};

export const updateCategoryAndCascadeThunk =
  (originalCategory: CategoryType, updatedData: Partial<CategoryType>) =>
  () => {
    const updatedCategory: CategoryType = {
      ...originalCategory,
      ...updatedData,
    };

    vscode.postMessage({
      command: "update-category-and-cascade",
      data: {
        originalCategory,
        updatedCategory,
      },
    });
  };

export default categoriesSlice.reducer;
