import React from "react";

interface TaskPriorityPickerProps {
  maxPriority?: number;
  selectedPriority: number;
  onPrioritySelect: (priority: number) => void;
}

const TaskPriorityPicker = ({
  maxPriority = 10,
  selectedPriority,
  onPrioritySelect,
}: TaskPriorityPickerProps) => {
  const priorities = Array.from({ length: maxPriority }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {priorities.map((priority, index) => (
        <button
          key={priority}
          type="button"
          onClick={() => onPrioritySelect(priority)}
          style={{ opacity: `${(index + 2) * 10}%` }}
          className={`hover:scale-110 rounded-sm w-8 h-8 flex items-center justify-center bg-button-secondry hover:bg-button-secondry/50  text-button-foreground font-medium cursor-pointer transition-all
            ${
              selectedPriority === priority
                ? "ring-1 ring-button-foreground"
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

export default TaskPriorityPicker;
