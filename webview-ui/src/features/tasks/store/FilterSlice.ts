import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  sortBy: "priority" | "endDate" | "default";
  filterByCategories: string[];
  showCompleted: boolean | null;
  viewMode: "column" | "row";
}

const initialState: FiltersState = {
  sortBy: "default",
  filterByCategories: [],
  showCompleted: false,
  viewMode: "column",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<FiltersState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.filterByCategories = []; // An empty array means show all
      } else {
        state.filterByCategories = [action.payload];
      }
    },
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      if (state.filterByCategories.includes(categoryId)) {
        state.filterByCategories = state.filterByCategories.filter(
          (id) => id !== categoryId
        );
      } else {
        state.filterByCategories.push(categoryId);
      }
    },
    setShowCompleted: (state, action: PayloadAction<boolean | null>) => {
      state.showCompleted = action.payload;
    },
    setviewMode: (state, action: PayloadAction<"column" | "row">) => {
      state.viewMode = action.payload;
    },
    clearFilters: (state) => {
      state.filterByCategories = [];
      state.showCompleted = false;
    },
  },
});

export const {
  setSortBy,
  toggleCategoryFilter,
  setShowCompleted,
  clearFilters,
  setviewMode,
  setCategoryFilter,
} = filtersSlice.actions;
export default filtersSlice.reducer;
