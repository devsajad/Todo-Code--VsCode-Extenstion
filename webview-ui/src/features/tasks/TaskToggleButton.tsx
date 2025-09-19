import { useAppDispatch } from "@/store/hook";
import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import type { TaskType } from "../types/types";
import { toggleTaskCompletionThunk } from "./store/TasksSlice";

type propsType = {
  task: TaskType;
};

const TaskToggleButton = ({ task }: propsType) => {
  const dispatch = useAppDispatch();

  function handleToggleTask(task: TaskType) {
    dispatch(toggleTaskCompletionThunk(task));
  }

  return (
    <button
      className="shrink-0 rounded-full size-5 border-1 border-gray-subtext cursor-pointer flex items-center justify-center"
      onClick={() => handleToggleTask(task)}
      aria-label={
        task.completed ? "Mark task as incomplete" : "Mark task as complete"
      }
    >
      <IoIosCheckmark
        className={`w-full h-full transition-all duration-200 ${
          task.completed ? "visible-state" : "invisible-state"
        }`}
      />
    </button>
  );
};

export default TaskToggleButton;
