import React, { useEffect } from "react";
import { Header } from "./components/Header";
import Main from "./components/Main";
import { setCategories } from "./features/tasks/store/CategoriesSlice";
import { setTasks } from "./features/tasks/store/TasksSlice";
import TasksContainer from "./features/tasks/TasksContainer";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { vscode } from "./utils/vscode";
import TaskDropDown from "./features/tasks/TaskDropDown";

function App() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "update-data") {
        dispatch(setTasks(message.data.tasks));
        dispatch(setCategories(message.data.categories));
      }
    };

    window.addEventListener("message", handleMessage);

    vscode.postMessage({
      command: "get-data",
    });
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  return (
    <>
      <Header>
        <TaskDropDown />
      </Header>
      <Main>
        {categories.map((category) => (
          <TasksContainer
            id={category.id}
            color={category.color}
            name={category.name}
            icon={category.icon}
          />
        ))}
      </Main>
    </>
  );
}

export default App;
