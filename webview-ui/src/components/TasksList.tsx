import React from "react";
import type { TaskType } from "../types/types";

type propsType = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: propsType) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <li
          className="bg-gray-secondry p-2 flex items-center gap-3"
          key={index}
        >
          <div className="rounded-full w-3 h-3 border-1 border-white"></div>
          <div>
            <p className="text-md">{task.text}</p>
            <p className="text-gray-subtext text-xs">
              File <span>{task.file.split(/[\\/]/).pop()}</span>, line{" "}
              <span>{task.line}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
