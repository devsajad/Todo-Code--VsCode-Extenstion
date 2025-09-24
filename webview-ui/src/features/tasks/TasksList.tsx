import React from "react";
import type { TaskType } from "../../types/types";
import TaskItem from "./TaskItem";
import TaskItemModify from "./TaskItemModify";
import TaskToggleButton from "./TaskToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { useAppDispatch } from "@/store/hook";
import { openModal } from "@/components/ui/Modal/store/modalSlice";

type propsType = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: propsType) => {
  const dispatch = useAppDispatch();

  function handleAddTaskClick() {
    dispatch(
      openModal({
        type: "addEditTask",
        data: { categoryId: tasks[0].categoryId },
      })
    );
  }
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
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className={`bg-gray-secondry p-2 flex items-center gap-3 rounded-lg shadow-sm group/outer ${
              task.completed && "bg-gray-secondry/20"
            }`}
          >
            <TaskToggleButton task={task} />
            <TaskItem task={task} />
            <TaskItemModify task={task} />
          </motion.li>
        </AnimatePresence>
      ))}
      <button
        onClick={handleAddTaskClick}
        className={`p-2 flex items-center gap-2 text-gray-subtext rounded-lg group/outer w-full hover:bg-gray-secondry transition-colors duration-300`}
      >
        <IoMdAdd className="text-lg" />
        <span>Add task</span>
      </button>
    </ul>
  );
};

export default TasksList;
