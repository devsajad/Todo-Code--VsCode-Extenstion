import React from "react";
import { useAppSelector } from "../../store/hook.js";
import { ICON_MAP } from "../constants/constants.js";
import type { CategoryType } from "../types/types.js";
import CategoryMoreButton from "./CategoryMoreButton.js";
import TasksList from "./TasksList.js";

const CategoriesContainer = ({ category }: { category: CategoryType }) => {
  const IconComponent = category.icon ? ICON_MAP[category.icon] : null;

  const tasks = useAppSelector((state) => state.tasks);
  const filteredTask = tasks.filter((task) => task.categoryId === category.id);


  return (
    <div className="space-y-3">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="text-base" />}
          <p className="text-base">{category.name}</p>
          <CategoryMoreButton category={category} />
        </div>

        <div
          style={{ background: category.color }}
          className={`h-[4px] rounded-full`}
        ></div>
      </header>
      
      <TasksList tasks={filteredTask} />
    </div>
  );
};

export default CategoriesContainer;
