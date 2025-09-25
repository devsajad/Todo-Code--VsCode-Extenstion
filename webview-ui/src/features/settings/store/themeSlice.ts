import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { vscode } from "@/utils/vscode";
import type { AppDispatch } from "@/store/store";

// Define the shape of the theme state
interface ThemeState {
  currentTheme: string | null; // e.g., 'vscode', 'midnight', or null for initial load
}

// Set the initial state
const initialState: ThemeState = {
  currentTheme: null, // Start with null to show the theme switcher on first launch
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  // Reducers handle direct, synchronous state changes
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

// --- THUNKS (for asynchronous logic) ---

/**
 * Thunk to change the theme, update the UI state, and tell the backend to save the preference.
 */
export const setThemeThunk = (theme: string) => (dispatch: AppDispatch) => {
  // 1. Dispatch the synchronous action to update the Redux store immediately
  dispatch(setTheme(theme));

  // 2. Send a message to the backend to save the user's choice permanently
  vscode.postMessage({ command: "set-theme", data: { theme } });
};

export default themeSlice.reducer;
