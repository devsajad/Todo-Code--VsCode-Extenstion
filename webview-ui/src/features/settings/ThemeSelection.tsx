// import { THEME_OPTIONS } from "@/constants/constants";
// import React from "react";

// const ThemeSelection = ({
//   selectedTheme,
//   onSelectedTheme,
// }: {
//   selectedTheme: string | null;
//   onSelectedTheme: (value: string) => void;
// }) => {
//   return (
//     <div className="flex flex-col mb-8 space-y-2">
//       <label htmlFor="theme-select" className="font-medium text-base">
//         Theme
//       </label>
//       <select
//         id="theme-select"
//         value={selectedTheme || "vscode"}
//         onChange={(e) => onSelectedTheme(e.target.value)}
//         className="border-1 border-white-text/30 px-1 py-2 bg-gray-secondry rounded-md"
//       >
//         {THEME_OPTIONS.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default ThemeSelection;
