import { useAppDispatch } from "@/store/hook";
import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import type { TaskType } from "../types/types";
import { toggleTaskCompletion } from "./store/TasksSlice";

type propsType = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: propsType) => {
  const dispatch = useAppDispatch();

  function handleToggleTask(task: TaskType) {
    dispatch(toggleTaskCompletion(task));
  }
  console.log(tasks);
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          className={`bg-gray-secondry p-2 flex items-center gap-3 rounded-lg shadow-sm`}
          key={task.id}
        >
          <button
            className="shrink-0 rounded-full size-5 border-1 border-gray-subtext cursor-pointer flex items-center justify-center"
            onClick={() => handleToggleTask(task)}
            aria-label={
              task.completed
                ? "Mark task as incomplete"
                : "Mark task as complete"
            }
          >
            {task.completed && <IoIosCheckmark className="w-full h-full" />}
          </button>

          <div className="">
            <p className={`text-sm ${task.completed && "line-through"} mb-0.5`}>
              {task.text}
            </p>
            {task.file ? (
              <p className="text-gray-500 text-xs">
                File <span>{task?.file?.split(/[\\/]/).pop()}</span>, line{" "}
                <span>{task?.line}</span>
              </p>
            ) : task.description ? (
              <p className="text-gray-500 text-xs">{task.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
