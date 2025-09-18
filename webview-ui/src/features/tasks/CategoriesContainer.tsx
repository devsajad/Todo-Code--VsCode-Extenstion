import React from "react";
import { useAppSelector } from "../../store/hook.js";
import { ICON_MAP } from "../constants/constants.js";
import type { CategoryType } from "../types/types.js";
import TasksList from "./TasksList.js";

const CategoriesContainer = ({ name, color, icon, id }: CategoryType) => {
  const IconComponent = icon ? ICON_MAP[icon] : null;

  const tasks = useAppSelector((state) => state.tasks);
  const filteredTask = tasks.filter((task) => task.categoryId === id);

  if (filteredTask.length === 0) return null;

  return (
    <header className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-base">{name}</p>
        {IconComponent && <IconComponent className="text-base" />}
      </div>
      <div style={{ background: color }} className={`h-0.5`}></div>
      <TasksList tasks={filteredTask} />
    </header>
  );
};

export default CategoriesContainer;
