import React from "react";
import { VscBug, VscGitPullRequest, VscSync } from "react-icons/vsc";
import type { TaskType } from "../types/types";
import TasksList from "./TasksList";

const iconMap = {
  VscBug: VscBug,
  VscSync: VscSync,
  VscGitPullRequest: VscGitPullRequest,
};

type propsType = {
  title: string;
  color: "yellow" | "red" | "green";
  tasks: TaskType[];
  icon: keyof typeof iconMap;
};

const TasksContainer = ({ title, color, tasks, icon }: propsType) => {
  const IconComponent = icon ? iconMap[icon] : null;

  const titleColor = {
    yellow: "bg-yellow-warning",
    red: "bg-red-error",
    green: "bg-green-success",
  };

  return (
    <header className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-base">{title}</p>
        {IconComponent && <IconComponent className="text-base" />}
      </div>
      <div className={`h-0.5 ${titleColor[color]}`}></div>
      <TasksList tasks={tasks} />
    </header>
  );
};

export default TasksContainer;
