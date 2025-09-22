import { useAppSelector } from "@/store/hook";
import React from "react";
import { IoMdOpen } from "react-icons/io";
import { IoFlagOutline } from "react-icons/io5";
import { ICON_MAP } from "../constants/constants";
import type { TaskType } from "../../types/types";
import { getDateDisplayInfo, getPriorityInfo } from "./utils/utils";
import { vscode } from "@/utils/vscode";

const TaskDetailView = ({ task }: { task: TaskType }) => {
  const categories = useAppSelector((state) => state.categories);
  const category = categories.find((cat) => cat.id === task.categoryId);

  const priorityInfo = getPriorityInfo(task.priority);
  const startDateInfo = getDateDisplayInfo(task.startDate);
  const endDateInfo = getDateDisplayInfo(task.endDate);

  const handleOpenFile = (file: string, line: number) => {
    vscode.postMessage({
      command: "open-file",
      data: {
        file,
        line,
      },
    });
  };

  const CategoryIcon = category ? ICON_MAP[category.icon] : null;

  return (
    <div className="p-4 bg-gray-secondry text-white-text w-[500px] max-w-full rounded-lg">
      {/* Header: Task Text */}
      <header className="mb-6">
        <h2 className="text-xl font-bold">{task.text}</h2>
      </header>

      {/* Metadata Section */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        {/* Category */}
        {category && (
          <div className="flex flex-col gap-1 font-normal">
            <span className="text-sm font-medium uppercase">Category</span>
            <div className="flex items-center gap-2">
              <span>
                {CategoryIcon && (
                  <CategoryIcon
                    className="size-4"
                    style={{ color: category.color }}
                  />
                )}
              </span>
              <span style={{ color: category.color }}>{category.name}</span>
            </div>
          </div>
        )}

        {/* Priority */}
        {priorityInfo && (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-normal uppercase">Priority</span>
            <div
              className={`flex items-center gap-2 font-semibold text-gray-subtext ${priorityInfo.className}`}
            >
              <IoFlagOutline className="size-4" />
              <span className="font-normal">{priorityInfo.text}</span>
            </div>
          </div>
        )}

        {/* Start Date */}
        {task.startDate && (
          <div className="flex flex-col gap-1 font-normal">
            <span className="text-sm font-bold uppercase">Start Date</span>
            <span className={`text-gray-subtext ${startDateInfo.className}`}>
              {startDateInfo.text}
            </span>
          </div>
        )}

        {/* End Date */}
        {task.endDate && (
          <div className="flex flex-col gap-1 font-normal">
            <span className="text-sm font-bold uppercase">Due Date</span>
            <span className={`text-gray-subtext ${endDateInfo.className}`}>
              {endDateInfo.text}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {task.description && (
        <div className="mb-6 ">
          <h3 className="font-bold text-sm uppercase mb-2">Description</h3>
          <p className="font-normal text-gray-subtext break-words whitespace-normal">
            {task.description}
          </p>
        </div>
      )}

      {/* File Info & Actions */}
      {task.source === "comment" && task.file && (
        <div className="p-3 bg-gray-bg rounded-md">
          <h3 className="text-sm font-medium uppercase mb-1">Source</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm font-mono text-gray-subtext">
              {task.file.split(/[\\/]/).pop()}:{task.line}
            </p>
            <button
              onClick={() => handleOpenFile(task.file!, task.line!)}
              className="flex items-center gap-1 text-sm font-normal text-purple-primary hover:underline"
            >
              <IoMdOpen />
              Open File
            </button>
          </div>
        </div>
      )}

      {/* You can add Edit/Delete buttons in a footer here later */}
    </div>
  );
};

export default TaskDetailView;
