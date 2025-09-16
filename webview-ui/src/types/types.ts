export type task = {
  type: "fix-bug" | "refactor" | "feature";
  text: string;
  file: string;
  line: number;
};
