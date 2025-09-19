export const CATEGORIES_COLORS = [
  "#22c55e",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export const CATEGORIES_ICONS = [
  "VscRocket",
  "VscBug",
  "VscFileCode",
  "VscSync",
  "VscGitPullRequest",
  "VscTag",
  "VscLightbulb",
  "VscTools",
  "VscBook",
  "VscCheck",
  "VscStarFull",
  "VscCloudDownload",
  "VscTerminal",
];

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

export type CategoryType = {
  id: string;
  color: (typeof CATEGORIES_COLORS)[number];
  icon: (typeof CATEGORIES_ICONS)[number];
  name: string;
};
