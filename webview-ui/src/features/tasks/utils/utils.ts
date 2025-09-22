import { format, isToday, isTomorrow, isThisWeek, isPast } from "date-fns";

interface DateDisplayInfo {
  text: string;
  className: string;
}

export const getDateDisplayInfo = (
  date: Date | string | undefined
): DateDisplayInfo => {
  if (!date) {
    return { text: "", className: "" };
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isToday(dateObj)) {
    return { text: "Today", className: "text-green-accent" };
  }
  if (isTomorrow(dateObj)) {
    return { text: "Tomorrow", className: "text-yellow-accent" };
  }
  if (isPast(dateObj)) {
    return { text: format(dateObj, "d MMMM"), className: "text-gray-500" };
  }
  if (isThisWeek(dateObj, { weekStartsOn: 1 })) {
    // weekStartsOn: 1 for Monday
    return { text: format(dateObj, "EEEE"), className: "text-blue-accent" };
  }

  return { text: format(dateObj, "d MMMM"), className: "" };
};

export const getPriorityInfo = (priority: number | undefined) => {
  if (!priority) {
    return null;
  }

  if (priority >= 8) {
    return {
      text: "High",
      className: "text-red-accent",
    };
  }
  if (priority >= 4) {
    return {
      text: "Medium",
      className: "text-yellow-accent",
    };
  }
  if (priority >= 1) {
    return {
      text: "Low",
    };
  }
};
