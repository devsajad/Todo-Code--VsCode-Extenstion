import { closeModal } from "@/components/ui/Modal/store/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import React, { useState } from "react";
import { toggleHighlighterThunk } from "./store/settingsSlice";
import { setThemeThunk } from "./store/themeSlice";
import SyntaxHighlihgterToggle from "./SyntaxHighlihgterToggle";
import ThemeSelection from "./ThemeSelection";

const SettingsModal = () => {
  const dispatch = useAppDispatch();

  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const highlighterEnabled = useAppSelector(
    (state) => state.settings.isHighlighterEnabled
  );

  const [selectedTheme, setSelectedTheme] = useState<string | null>(
    currentTheme
  );

  const handleToggle = () => {
    dispatch(toggleHighlighterThunk());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTheme !== currentTheme) {
      dispatch(setThemeThunk(selectedTheme!));
    }

    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSave} onClick={(e) => e.stopPropagation()}>
      <h2 className="font-bold uppercase text-purple-primary text-center max-w-55 py-2 mx-auto text-lg mb-4">
        Settings
      </h2>

      <ThemeSelection
        selectedTheme={selectedTheme}
        onSelectedTheme={setSelectedTheme}
      />

      <SyntaxHighlihgterToggle
        highlighterEnabled={highlighterEnabled}
        onToggle={handleToggle}
      />

      <button type="submit" className="btn-primary">
        <span className="font-medium text-base">Save Settings</span>
      </button>
    </form>
  );
};

export default SettingsModal;
