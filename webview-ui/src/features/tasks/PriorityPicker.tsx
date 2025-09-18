import React from "react";

interface PriorityPickerProps {
  maxPriority?: number;
  selectedPriority: number;
  onPrioritySelect: (priority: number) => void;
}

// const getPriorityColor = (priority: number): string => {
//   if (priority >= 8) return "bg-red-600 hover:bg-red-500";
//   if (priority >= 4) return "bg-yellow-500 hover:bg-yellow-400";
//   return "bg-green-600 hover:bg-green-500";
// };

const PriorityPicker = ({
  maxPriority = 10,
  selectedPriority,
  onPrioritySelect,
}: PriorityPickerProps) => {
  const priorities = Array.from({ length: maxPriority }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {priorities.map((priority) => (
        <button
          key={priority}
          type="button"
          onClick={() => onPrioritySelect(priority)}
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
