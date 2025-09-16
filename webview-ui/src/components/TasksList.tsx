import React from "react";
import type { task } from "../types/types";

type propsType = {
  tasks: task[];
};

const TasksList = ({ tasks }: propsType) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        <li
          className="bg-gray-secondry p-2 flex items-center gap-3"
          key={index}
        >
          <div className="rounded-full w-5 h-5 border-2 border-white"></div>
          <div>
            <p className="text-md">{task.text}</p>
            <p className="text-gray-subtext text-xs">
              File <span>{task.file}</span>, line <span>{task.line}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
