import React, { useState, useEffect } from "react";
import { vscode } from "../utils/vscode";

interface Todo {
  type: "fix-bug" | "refactor" | "feature";
  text: string;
  file: string;
  line: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

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
    // Cleanup the listener when the component is unmounted
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Filter todos into their respective categories
  const bugs = todos.filter((todo) => todo.type === "fix-bug");
  const features = todos.filter((todo) => todo.type === "feature");
  const refactors = todos.filter((todo) => todo.type === "refactor");

  return (
    <main>
      <h1>Code Todos</h1>
      <div className="container">
        <div className="column">
          <h2>Features ({features.length})</h2>
          {/* Add feature items here */}
        </div>

        <div className="column">
          <h2>Fix Bugs ({bugs.length})</h2>
          {bugs.map((bug, index) => (
            <div className="task-item" key={index}>
              <p>
                <strong>{bug.text}</strong>
              </p>
              <span>
                {bug.file.split(/[\\/]/).pop()} on line {bug.line}
              </span>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Refactors ({refactors.length})</h2>
          {/* Add refactor items here */}
        </div>
      </div>
    </main>
  );
}

export default App;
