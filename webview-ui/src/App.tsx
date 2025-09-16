import React, { useState } from "react";
// import { vscode } from "../utils/vscode";
import AddTaskDropDown from "./components/AddTaskDropDown";
import TasksContainer from "./components/TasksContainer";
import type { TaskType } from "./types/types";

function App() {
  const exampleTodos: TaskType[] = [
    { type: "fix-bug", text: "Fix login bug", file: "auth.ts", line: 12 },
    { type: "feature", text: "Add dark mode", file: "theme.tsx", line: 5 },
    {
      type: "refactor",
      text: "Refactor header component",
      file: "Header.tsx",
      line: 1,
    },
    {
      type: "fix-bug",
      text: "Fix typo in footer",
      file: "Footer.tsx",
      line: 22,
    },
    {
      type: "refactor",
      text: "Improve performance",
      file: "App.tsx",
      line: 30,
    },
    {
      type: "feature",
      text: "Add notifications",
      file: "Notifications.tsx",
      line: 3,
    },
  ];
  const [todos] = useState<TaskType[]>(exampleTodos);

  const bugs = todos.filter((todo) => todo.type === "fix-bug");
  const features = todos.filter((todo) => todo.type === "feature");
  const refactors = todos.filter((todo) => todo.type === "refactor");

  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <header className="text-2xl font-bold uppercase py-6 flex justify-start gap-4 items-center">
        <p>Project Todos</p>
        <AddTaskDropDown />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TasksContainer color="red" tasks={bugs} title="Fix Bugs" />
        <TasksContainer color="yellow" tasks={refactors} title="Refactors" />
        <TasksContainer color="green" tasks={features} title="features" />
      </main>
    </div>
  );
}

export default App;
