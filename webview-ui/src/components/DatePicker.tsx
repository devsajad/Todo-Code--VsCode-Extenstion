import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker"; // Import DateRange type
import "react-day-picker/dist/style.css";
import { VscCalendar } from "react-icons/vsc";
import useClickOutside from "@/hooks/useClickOutside";

interface DateRangePickerProps {
  selectedRange: DateRange | undefined;
  onRangeSelect: (range: DateRange | undefined) => void;
}

const DateRangePicker = ({
  selectedRange,
  onRangeSelect,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false), true);

  const displayText =
    selectedRange?.from && selectedRange.to
      ? `${format(selectedRange.from, "PPP")} - ${format(
          selectedRange.to,
          "PPP"
        )}`
      : selectedRange?.from
      ? `${format(selectedRange.from, "PPP")} - ...`
      : "Select a date range";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-full flex items-center justify-between p-2 ring-1 ring-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-400 text-xs md:text-sm text-left mr-2">
          {displayText}
        </span>
        <VscCalendar />
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-gray-bg bottom-0 translate-y-full left-1/2 -translate-x-1/2" id="date-picker">
          <DayPicker
            mode="range"
            startMonth={new Date()}
            selected={selectedRange}
            onSelect={(range) => {
              onRangeSelect(range);
            }}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
