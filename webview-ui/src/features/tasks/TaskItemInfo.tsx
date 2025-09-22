import React from "react";
import { IoCalendarOutline, IoFlagOutline } from "react-icons/io5";
import type { TaskType } from "../../types/types";
import { getDateDisplayInfo, getPriorityInfo } from "./utils/utils";

const TaskItemInfo = ({ task }: { task: TaskType }) => {
  const endDateInfo = getDateDisplayInfo(task.endDate);
  const priorityInfo = getPriorityInfo(task.priority);

  return (
    <div className="w-full pr-12 ">
      <p className={`text-sm`}>{task.text}</p>

      {task.file ? (
        <p className="text-gray-500 text-xs">
          File <span>{task?.file?.split(/[\\/]/).pop()}</span>, line{" "}
          <span>{task?.line}</span>
        </p>
      ) : task.description ? (
        <p className="text-gray-500 line-clamp-1 break-words whitespace-normal text-wrap w-full">
          {task.description}
        </p>
      ) : null}

      <div className="flex items-center mt-2 gap-3 text-xs font-normal text-white-text/50">
        {task.startDate && (
          <div className="flex items-center gap-1">
            <IoCalendarOutline
              className={`size-[15px] ${endDateInfo.className}`}
            />
            <span className={endDateInfo.className}>{endDateInfo.text}</span>
          </div>
        )}
        {task.priority && (
          <div className={`flex items-center gap-1 ${priorityInfo?.className}`}>
            <IoFlagOutline />
            <span>{priorityInfo?.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItemInfo;
