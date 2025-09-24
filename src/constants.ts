import { CategoryType } from "./types/types";

export const DEFAULT_CATEGORIES: CategoryType[] = [
  {
    id: "features",
    color: "#22c55e",
    icon: "VscGitPullRequest",
    name: "features",
  },
  {
    id: "fix-bugs",
    color: "#ef4444",
    icon: "VscBug",
    name: "Fix Bugs",
  },
  {
    id: "refactors",
    color: "#eab308",
    icon: "VscSync",
    name: "Refactors",
  },
];
