import Tooltip from "@/components/Tooltip";
import { openModal } from "@/components/ui/Modal/store/modalSlice";
import { useAppDispatch } from "@/store/hook";
import { vscode } from "@/utils/vscode";
import React from "react";
import { IoMdClose, IoMdCreate, IoMdOpen } from "react-icons/io";
import type { TaskType } from "../../types/types";

const TaskItemModify = ({ task }: { task: TaskType }) => {
  const dispatch = useAppDispatch();

  const handleOpenFile = (file: string, line: number) => {
    vscode.postMessage({
      command: "open-file",
      data: {
        file,
        line,
      },
    });
  };

  return (
    <div className="ml-auto flex gap-1 absolute right-2 transition-all duration-200 group-hover/outer:opacity-100 group-hover/outer:visible group-hover/outer:scale-100 opacity-0 invisible scale-90 pointer-events-none group-hover/outer:pointer-events-auto">
      {task.file && task.line && (
        <button
          onClick={() => handleOpenFile(task.file!, task.line!)}
          className="group bg-yellow-600 rounded-sm size-5 flex items-center justify-center"
        >
          <IoMdOpen className="size-4" />
          <Tooltip color="oklch(68.1% 0.162 75.834)">Open File</Tooltip>
        </button>
      )}

      <button
        onClick={() =>
          dispatch(openModal({ type: "addEditTask", data: { task: task } }))
        }
        className="group bg-green-600 rounded-sm size-5 flex items-center justify-center"
      >
        <IoMdCreate className="size-4" />
        <Tooltip color="oklch(62.7% 0.194 149.214)">Edit</Tooltip>
      </button>

      <button
        onClick={() =>
          dispatch(openModal({ type: "deleteTask", data: { task: task } }))
        }
        className="group bg-red-600 rounded-sm size-5 flex items-center justify-center"
      >
        <IoMdClose className="size-4" />
        <Tooltip color="oklch(57.7% 0.245 27.325)">Delete</Tooltip>
      </button>
    </div>
  );
};

export default TaskItemModify;
