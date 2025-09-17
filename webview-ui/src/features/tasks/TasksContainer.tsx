import React from "react";
import { VscBug, VscGitPullRequest, VscSync } from "react-icons/vsc";
import { useAppSelector } from "../../store/hook";
import TasksList from "./TasksList";
import type { CategoryType } from "../../types/types";

const iconMap = {
  VscBug: VscBug,
  VscSync: VscSync,
  VscGitPullRequest: VscGitPullRequest,
};

const TasksContainer = ({ name, color, icon, id }: CategoryType) => {
  const IconComponent = icon ? iconMap[icon] : null;

  const tasks = useAppSelector((state) => state.tasks);
  const filteredTask = tasks.filter((task) => task.categoryId === id);

  const titleColor = {
    yellow: "bg-yellow-warning",
    red: "bg-red-error",
    green: "bg-green-success",
  };

  return (
    <header className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-base">{name}</p>
        {IconComponent && <IconComponent className="text-base" />}
      </div>
      <div className={`h-0.5 ${titleColor[color]}`}></div>
      <TasksList tasks={filteredTask} />
    </header>
  );
};

export default TasksContainer;
