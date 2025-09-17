import { CATEGORIES_ICONS, CATEGORIES_COLORS } from "./../constants/constants";
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
};

export type CategoryType = {
  id: string;
  color: (typeof CATEGORIES_COLORS)[number];
  icon: (typeof CATEGORIES_ICONS)[number];
  name: string;
};
