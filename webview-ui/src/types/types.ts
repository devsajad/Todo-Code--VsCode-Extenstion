import {
  CATEGORIES_ICONS,
  CATEGORIES_COLORS,
} from "../features/tasks/constants/constants";
export type TaskType = {
  id: string;
  source: "comment" | "manual";
  categoryId: string;
  text: string;
  file?: string;
  line?: number;
  description?: string;
  priority?: number;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  completed: boolean;
};

export type TaskTypeAddEditForm = {
  id?: string;
  source?: "comment" | "manual";
  categoryId?: string;
  text?: string;
  file?: string;
  line?: number;
  description?: string;
  priority?: number;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  completed?: boolean;
};

export type CategoryType = {
  id: string;
  color: (typeof CATEGORIES_COLORS)[number];
  icon: (typeof CATEGORIES_ICONS)[number];
  name: string;
};
