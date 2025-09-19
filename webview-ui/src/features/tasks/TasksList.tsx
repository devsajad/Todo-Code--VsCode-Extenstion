import Tooltip from "@/components/Tooltip";
import Modal from "@/components/ui/Modal/Modal";
import { vscode } from "@/utils/vscode";
import React from "react";
import { IoMdClose, IoMdCreate, IoMdOpen } from "react-icons/io";
import type { TaskType } from "../types/types";
import TaskAddEditForm from "./TaskAddEditForm";
import TaskDeleteForm from "./TaskDeleteForm";
import TaskToggleButton from "./TaskToggleButton";

type propsType = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: propsType) => {
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
    <ul className="space-y-2 relative">
      {tasks.map((task) => (
        <li
          className={`bg-gray-secondry p-2 flex items-center gap-3 rounded-lg shadow-sm group/outer`}
          key={task.id}
        >
          <TaskToggleButton task={task} />
          <div>
            <p className={`text-sm ${task.completed && "line-through"} mb-0.5`}>
              {task.text}
            </p>
            {task.file ? (
              <p className="text-gray-500 text-xs">
                File <span>{task?.file?.split(/[\\/]/).pop()}</span>, line{" "}
                <span>{task?.line}</span>
              </p>
            ) : task.description ? (
              <p className="text-gray-500 text-xs truncate max-w-40">
                {task.description}
              </p>
            ) : null}
          </div>

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

            <Modal>
              <Modal.Trigger>
                <button className="group bg-green-600 rounded-sm size-5 flex items-center justify-center">
                  <IoMdCreate className="size-4" />
                  <Tooltip color="oklch(62.7% 0.194 149.214)">Edit</Tooltip>
                </button>
              </Modal.Trigger>
              <Modal.Content>
                <TaskAddEditForm task={task} />
              </Modal.Content>
            </Modal>

            <Modal>
              <Modal.Trigger>
                <button className="group bg-red-600 rounded-sm size-5 flex items-center justify-center">
                  <IoMdClose className="size-4" />
                  <Tooltip color="oklch(57.7% 0.245 27.325)">Delete</Tooltip>
                </button>
              </Modal.Trigger>
              <Modal.Content>
                <TaskDeleteForm task={task} />
              </Modal.Content>
            </Modal>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
