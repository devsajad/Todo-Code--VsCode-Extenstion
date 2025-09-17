import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import TasksContainer from "./features/categories/TasksContainer";
import { DropDown } from "./components/ui/DropDown/DropDown";
import type { CategoryType, TaskType } from "./types/types";
import { vscode } from "./utils/vscode";
import Modal from "./components/ui/Modal/Modal";
import AddTaskForm from "./features/tasks/AddTaskForm";

function App() {
  const [todos, setTodos] = useState<TaskType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  console.log(categories, todos);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      console.log(message);
      if (message.command === "update-data") {
        setTodos(message.data.tasks);
        setCategories(message.data.categories);
      }
    };
    window.addEventListener("message", handleMessage);

    vscode.postMessage({
      command: "get-data",
    });
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const bugs = todos.filter((todo) => todo.categoryId === "fix-bug");
  const features = todos.filter((todo) => todo.categoryId === "feature");
  const refactors = todos.filter((todo) => todo.categoryId === "refactor");

  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <header className="py-6 flex items-center gap-6">
        <h1 className="font-bold uppercase text-xl">Project Todos</h1>
        <DropDown>
          <DropDown.Trigger>
            Add
            <VscAdd />
          </DropDown.Trigger>

          <DropDown.Content>
            <Modal>
              <Modal.Trigger>
                <DropDown.Item>Add Task</DropDown.Item>
              </Modal.Trigger>

              <Modal.Content>
                <AddTaskForm />
              </Modal.Content>
            </Modal>

            <DropDown.Item> Add Category</DropDown.Item>
          </DropDown.Content>
        </DropDown>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TasksContainer
          color="green"
          tasks={features}
          title="App Features"
          icon="VscGitPullRequest"
        />
        <TasksContainer
          color="red"
          tasks={bugs}
          title="Fix Bugs"
          icon="VscBug"
        />
        <TasksContainer
          color="yellow"
          tasks={refactors}
          title="Refactors"
          icon="VscSync"
        />
      </main>
    </div>
  );
}

export default App;
