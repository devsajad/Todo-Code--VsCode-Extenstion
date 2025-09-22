import React from "react";
import type { TaskType } from "../../types/types";
import TaskItem from "./TaskItem";
import TaskItemModify from "./TaskItemModify";
import TaskToggleButton from "./TaskToggleButton";

type propsType = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: propsType) => {
  return (
    <ul className="space-y-2 relative">
      {tasks.map((task, index) => (
        <li
          className={`transition-all duration-300 bg-gray-secondry p-2 flex items-center gap-3 rounded-lg shadow-sm group/outer ${
            task.completed && "bg-gray-secondry/20"
          }`}
          key={index}
        >
          <TaskToggleButton task={task} />
          <TaskItem task={task} />
          <TaskItemModify task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
