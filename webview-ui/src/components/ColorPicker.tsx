import React from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({
  colors,
  selectedColor,
  onColorSelect,
}: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-3 py-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onColorSelect(color)}
          style={{ backgroundColor: color }}
          className={`w-6 h-6 rounded-full cursor-pointer focus:outline-none transition-transform hover:scale-110
            ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
                : ""
            }
          `}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
