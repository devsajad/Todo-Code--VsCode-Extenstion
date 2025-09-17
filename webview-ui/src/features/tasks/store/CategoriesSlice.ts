import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../../store/store";
import type { CategoryType } from "../../types/types";
import { vscode } from "../../../utils/vscode";

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
  (
    categoryData: Omit<CategoryType, "id"> 
  ) =>
  (dispatch: AppDispatch) => {

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
    // 1. Dispatch the synchronous action to update the UI
    dispatch(removeCategory({ id: categoryId }));

    // 2. Tell the backend to delete the category
    vscode.postMessage({
      command: "remove-category",
      data: { id: categoryId },
    });
  };


export const updateCategoryThunk =
  (category: CategoryType) => (dispatch: AppDispatch) => {

    dispatch(updateCategory(category));

    vscode.postMessage({
      command: "update-category",
      data: category,
    });
  };

export default categoriesSlice.reducer;
