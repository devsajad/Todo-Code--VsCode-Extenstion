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
  color: "red" | "green" | "yellow";
  icon: "VscBug" | "VscSync" | "VscGitPullRequest";
  name: string;
};
