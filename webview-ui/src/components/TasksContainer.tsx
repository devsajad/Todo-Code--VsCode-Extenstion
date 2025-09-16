import React from "react";
import TasksList from "./TasksList";
import type { TaskType } from "../types/types";

type propsType = {
  title: string;
  color: "yellow" | "red" | "green";
  tasks: TaskType[];
};

const TasksContainer = ({ title, color, tasks }: propsType) => {
  const titleColor = {
    yellow: "bg-yellow-warning",
    red: "bg-red-error",
    green: "bg-green-success",
  };

  return (
    <header className="font-bold space-y-1 mb-3">
      <p className="py-1.5">{title}</p>
      <div className={`h-0.5 ${titleColor[color]}`}></div>
      <TasksList tasks={tasks} />
    </header>
  );
};

export default TasksContainer;
