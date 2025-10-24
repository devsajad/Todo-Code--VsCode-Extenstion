import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import Main from "./components/Main";
import CategoriesContainer from "./features/categories/CategoriesContainer";
import { setCategories } from "./features/categories/store/CategoriesSlice";
import { setTasks } from "./features/tasks/store/TasksSlice";
import TaskDropDown from "./features/tasks/TaskDropDown";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { vscode } from "./utils/vscode";
import ModalRenderer from "./components/ui/Modal/ModalRenderer";
import Taskfilter from "./features/tasks/Taskfilter";
import SkeletonLoader from "./components/SkeletonLoader";
import { setCategoryFilter } from "./features/tasks/store/FilterSlice";
import { openModal } from "./components/ui/Modal/store/modalSlice";
import { setSettings } from "./features/settings/store/settingsSlice";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state) => state.categories);
  const { filterByCategories } = useAppSelector((state) => state.filters);
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "update-data") {
        dispatch(setTasks(message.data.tasks));
        dispatch(setCategories(message.data.categories));
        if (message.data.settings) {
          dispatch(setSettings(message.data.settings));
        }
        setIsLoading(false);
      }

      if (message.command === "categories-updated") {
        dispatch(setCategories(message.data));
      }

      if (message.command === "set-category-filter") {
        dispatch(setCategoryFilter(message.data.categoryId));
      }

      if (message.command === "open-modal") {
        dispatch(openModal(message.data));
      }
    };
    // fix bugs:Fix the empty categories issue that appears on first load
    window.addEventListener("message", handleMessage);
    vscode.postMessage({ command: "get-data" });
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  const categoriesToRender =
    filterByCategories.length === 0
      ? allCategories
      : allCategories.filter((cat) => filterByCategories.includes(cat.id));

  if (isLoading) return <SkeletonLoader />;

  return (
    <>
      <Header>
        <TaskDropDown />
      </Header>
      <Taskfilter />
      <Main>
        {categoriesToRender.map((category) => (
          <CategoriesContainer key={category.id} category={category} />
        ))}
      </Main>
      <ModalRenderer />
    </>
  );
}

export default App;
