import React from "react";
import type { TaskType } from "../../types/types";
import TaskItemInfo from "./TaskItemInfo";
import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/components/ui/Modal/store/modalSlice";

const TaskItem = ({ task }: { task: TaskType }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="text-left grow-1"
      onClick={() =>
        dispatch(openModal({ type: "taskDetail", data: { task: task } }))
      }
    >
      <TaskItemInfo task={task} />
    </button>
  );
};

export default TaskItem;
