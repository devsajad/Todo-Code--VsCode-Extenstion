import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import Main from "./components/Main";
import CategoriesContainer from "./features/tasks/CategoriesContainer";
import { setCategories } from "./features/tasks/store/CategoriesSlice";
import { setTasks } from "./features/tasks/store/TasksSlice";
import TaskDropDown from "./features/tasks/TaskDropDown";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { vscode } from "./utils/vscode";
import ModalRenderer from "./components/ui/Modal/ModalRenderer";
import Taskfilter from "./features/tasks/Taskfilter";
import SkeletonLoader from "./components/SkeletonLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "update-data") {
        dispatch(setTasks(message.data.tasks));
        dispatch(setCategories(message.data.categories));

        setIsLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);

    vscode.postMessage({
      command: "get-data",
    });
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  if (isLoading) return <SkeletonLoader />;

  return (
    <>
      <Header>
        <TaskDropDown />
      </Header>
      <Taskfilter />
      <Main>
        {categories.map((category, index) => (
          <CategoriesContainer key={index} category={category} />
        ))}
      </Main>
      <ModalRenderer />
    </>
  );
}

export default App;
