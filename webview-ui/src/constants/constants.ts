import {
  VscTag,
  VscBug,
  VscRocket,
  VscLightbulb,
  VscTools,
  VscBook,
  VscCheck,
  VscStarFull,
  VscCloudDownload,
  VscTerminal,
  VscFileCode,
  VscSync,
  VscGitPullRequest,
} from "react-icons/vsc";

export const CATEGORIES_COLORS = [
  "#1ec337",
  "#ff383c",
  "#f5c200",
  "#cb30e0",
  "#007aff",
  "#f97316",
  "#8b5cf6",
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

export const ICON_MAP: { [key: string]: React.ElementType } = {
  VscTag,
  VscBug,
  VscRocket,
  VscLightbulb,
  VscTools,
  VscBook,
  VscCheck,
  VscStarFull,
  VscCloudDownload,
  VscTerminal,
  VscFileCode,
  VscSync,
  VscGitPullRequest,
};

export const THEMES = {
  vscode: {
    "--color-purple-primary": "var(--vscode-list-activeSelectionBackground)",
    "--color-primary-text": "var(--vscode-list-activeSelectionForeground)",
    "--color-gray-bg": "var(--vscode-editor-background)",
  },
  midnight: {
    "--color-purple-primary": "#5271FF",
    "--color-primary-text": "#FFFFFF",
    "--color-gray-bg": "#0D1117",
    "--color-gray-secondry": "#161B22",
    "--color-white-text": "#C9D1D9",
    "--color-gray-subtext": "#8B949E",
  },
  solarized: {
    "--color-purple-primary": "#268BD2",
    "--color-primary-text": "#FFFFFF",
    "--color-gray-bg": "#002B36",
    "--color-gray-secondry": "#073642",
    "--color-white-text": "#839496",
    "--color-gray-subtext": "#586E75",
  },
};

export const MAX_CATS_GRID_COLS = 3;
