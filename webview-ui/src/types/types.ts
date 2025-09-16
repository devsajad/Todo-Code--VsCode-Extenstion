export type TaskType = {
  type: "fix-bug" | "refactor" | "feature";
  text: string;
  file: string;
  line: number;
};
