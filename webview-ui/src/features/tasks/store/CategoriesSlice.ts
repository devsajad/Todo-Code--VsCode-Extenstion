import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryType } from "../../../types/types";

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
export default categoriesSlice.reducer;
