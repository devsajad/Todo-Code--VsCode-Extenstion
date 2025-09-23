import React from "react";
import type { TaskType } from "../../types/types";
import TaskItem from "./TaskItem";
import TaskItemModify from "./TaskItemModify";
import TaskToggleButton from "./TaskToggleButton";
import { AnimatePresence, motion } from "framer-motion";

type propsType = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: propsType) => {
  return (
    <ul className="space-y-2 relative">
      {tasks.map((task) => (
        <AnimatePresence>
          <motion.li
            layout
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              x: -50,
            }}
            className={`transition-all duration-300 bg-gray-secondry p-2 flex items-center gap-3 rounded-lg shadow-sm group/outer ${
              task.completed && "bg-gray-secondry/20"
            }`}
          >
            <TaskToggleButton task={task} />
            <TaskItem task={task} />
            <TaskItemModify task={task} />
          </motion.li>
        </AnimatePresence>
      ))}
    </ul>
  );
};

export default TasksList;
