import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { vscode } from "@/utils/vscode";
import type { AppDispatch, RootState } from "@/store/store";
interface SettingsState {
  isHighlighterEnabled: boolean;
}

const initialState: SettingsState = {
  isHighlighterEnabled: true, 
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      // Merge the saved settings into the current state
      return { ...state, ...action.payload };
    },

    toggleHighlighter: (state) => {
      state.isHighlighterEnabled = !state.isHighlighterEnabled;
    },
  },
});

export const { setSettings, toggleHighlighter } = settingsSlice.actions;

// --- THUNKS (for asynchronous logic) ---

export const toggleHighlighterThunk =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(toggleHighlighter());

    const newIsEnabled = getState().settings.isHighlighterEnabled;

    vscode.postMessage({
      command: "toggle-highlighter",
      data: { enabled: newIsEnabled },
    });
  };

export default settingsSlice.reducer;
