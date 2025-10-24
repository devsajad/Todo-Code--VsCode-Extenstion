import React, { type ReactNode } from "react";

interface FilterButtonProps {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
  className?: string;
}

const FilterButton = ({
  children,
  onClick,
  isActive,
  className = "",
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-200 flex items-center gap-1.5
        ${
          isActive
            ? "bg-purple-primary text-primary-text"
            : "bg-button-background hover:bg-button-background/50  text-button-foreground hover:bg-gray-tertiary hover:text-white-text"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default FilterButton;
