import ToggleSwitch from "@/components/ToggleSwitch";
import { closeModal } from "@/components/ui/Modal/store/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import React, { useState } from "react";
import { toggleHighlighterThunk } from "./store/settingsSlice";
import { setThemeThunk } from "./store/themeSlice";

const THEME_OPTIONS = [
  { name: "VS Code Default", value: "vscode" },
  { name: "Midnight", value: "midnight" },
  { name: "Solarized", value: "solarized" },
];

const SettingsModal = () => {
  const dispatch = useAppDispatch();

  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const highlighterEnabled = useAppSelector(
    (state) => state.settings.isHighlighterEnabled
  );

  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

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

      {/* Theme Selection */}
      <div className="flex flex-col mb-8 space-y-2">
        <label htmlFor="theme-select" className="font-medium text-base">
          Theme
        </label>
        <select
          id="theme-select"
          value={selectedTheme || "vscode"}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="border-1 border-white-text/30 px-1 py-2 bg-gray-secondry rounded-md"
        >
          {THEME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Syntax Highlighter Toggle */}
      <div className="flex flex-col mb-8 space-y-1">
        <label className="font-medium text-base mb-2">
          Comment Highlighting
        </label>
        <div className="flex items-center gap-2">
          <ToggleSwitch enabled={highlighterEnabled} onChange={handleToggle} />
          <span className="text-sm text-gray-subtext">
            {highlighterEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        <span className="font-medium text-base">Save Settings</span>
      </button>
    </form>
  );
};

export default SettingsModal;
