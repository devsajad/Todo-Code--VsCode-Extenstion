import React, { useState, useEffect } from "react";
import { vscode } from "./utils/vscode";
import type { TaskType } from "./types/types";
import TasksContainer from "./components/TasksContainer";
import { ModalManager } from "./components/ui/modal/ModalContainer";

function App() {
  const [todos, setTodos] = useState<TaskType[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === "update-todos") {
        setTodos(message.data);
      }
    };

    window.addEventListener("message", handleMessage);

    vscode.postMessage({
      command: "get-todos",
    });
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const bugs = todos.filter((todo) => todo.type === "fix-bug");
  const features = todos.filter((todo) => todo.type === "feature");
  const refactors = todos.filter((todo) => todo.type === "refactor");

  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <header className="py-6 flex items-center gap-6">
        <h1 className="font-bold uppercase text-xl">Project Todos</h1>
        <ModalManager>
          <ModalManager.DropDown />
          <ModalManager.Modal />
        </ModalManager>
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
