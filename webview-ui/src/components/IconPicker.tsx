import React from "react";
import { ICON_MAP } from "../features/constants/constants";

interface IconPickerProps {
  icons: string[];
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
}

const IconPicker = ({ icons, selectedIcon, onIconSelect }: IconPickerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      {icons.map((iconName) => {
        const IconComponent = ICON_MAP[iconName];
        if (!IconComponent) return null;

        return (
          <button
            key={iconName}
            type="button"
            onClick={() => onIconSelect(iconName)}
            className={`p-2 cursor-pointer transition-colors
              ${
                selectedIcon === iconName
                  ? "bg-purple-primary text-white"
                  : "bg-button-background hover:bg-gray-600"
              }
            `}
            aria-label={`Select icon ${iconName}`}
          >
            <IconComponent className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
};

export default IconPicker;
