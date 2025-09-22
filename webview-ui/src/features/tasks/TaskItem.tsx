import React from "react";
import TaskItemInfo from "./TaskItemInfo";
import type { TaskType } from "../types/types";
import Modal from "@/components/ui/Modal/Modal";
import ModalTrigger from "@/components/ui/Modal/ModalTrigger";
import ModalContent from "@/components/ui/Modal/ModalContent";
import TaskDetailView from "./TaskDetailsView";

const TaskItem = ({ task }: { task: TaskType }) => {
  return (
    <Modal>
      <ModalTrigger>
        <button className="text-left grow-1">
          <TaskItemInfo task={task} />
        </button>
      </ModalTrigger>
      <ModalContent>
        <TaskDetailView task={task} />
      </ModalContent>
    </Modal>
  );
};

export default TaskItem;
