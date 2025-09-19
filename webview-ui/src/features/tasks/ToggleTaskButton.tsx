import React from "react";
import { useAppDispatch } from "@/store/hook";
import { IoIosCheckmark } from "react-icons/io";
import type { TaskType } from "../types/types";
import { toggleTaskCompletion } from "./store/TasksSlice";

type propsType = {
  task: TaskType;
};

const ToggleTaskButton = ({ task }: propsType) => {
  const dispatch = useAppDispatch();

  function handleToggleTask(task: TaskType) {
    dispatch(toggleTaskCompletion(task));
  }
  return (
    <button
      className="shrink-0 rounded-full size-5 border-1 border-gray-subtext cursor-pointer flex items-center justify-center"
      onClick={() => handleToggleTask(task)}
      aria-label={
        task.completed ? "Mark task as incomplete" : "Mark task as complete"
      }
    >
      {task.completed && <IoIosCheckmark className="w-full h-full" />}
    </button>
  );
};

export default ToggleTaskButton;
