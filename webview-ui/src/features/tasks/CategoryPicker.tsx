import React from "react";
import type { CategoryType } from "../types/types";
import { ICON_MAP } from "../constants/constants";

interface CategoryPickerProps {
  categories: CategoryType[];
  selectedCategoryId: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryPicker = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
}: CategoryPickerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      {categories.map((category) => {
        const IconComponent = ICON_MAP[category.icon];

        return (
          <div className="relative group">
            <button
              key={category.id}
              type="button"
              onClick={() => onCategorySelect(category.id)}
              style={{ backgroundColor: category.color }}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 focus:outline-none
                ${
                  selectedCategoryId === category.id
                    ? "ring-2 ring-white scale-110"
                    : ""
                }
                `}
            >
              {IconComponent && (
                <IconComponent className="w-6 h-6 text-white opacity-80" />
              )}
            </button>
            <div
              className="px-1 py-0.5 absolute whitespace-nowrap -bottom-2 translate-y-full hidden group-hover:block"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPicker;
