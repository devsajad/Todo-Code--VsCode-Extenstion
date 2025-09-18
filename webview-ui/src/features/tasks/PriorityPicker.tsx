import React from "react";

interface PriorityPickerProps {
  maxPriority?: number;
  selectedPriority: number;
  onPrioritySelect: (priority: number) => void;
}

const PriorityPicker = ({
  maxPriority = 10,
  selectedPriority,
  onPrioritySelect,
}: PriorityPickerProps) => {
  const priorities = Array.from({ length: maxPriority }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {priorities.map((priority, index) => (
        <button
          key={priority}
          type="button"
          onClick={() => onPrioritySelect(priority)}
          style={{ opacity: `${(index + 2) * 10}%` }}
          className={`w-8 h-8 flex items-center justify-center bg-button-background font-bold text-button-foreground cursor-pointer transition-all
            ${
              selectedPriority === priority
                ? "ring-1 ring-button-foreground scale-110"
                : "scale-100"
            }
          `}
        >
          {priority}
        </button>
      ))}
    </div>
  );
};

export default PriorityPicker;
