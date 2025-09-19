import ConfirmFormAction from "@/components/ConfirmFormAction";
import { useModal } from "@/components/ui/Modal/ModalContext";
import { useAppDispatch } from "@/store/hook";
import React from "react";
import type { TaskType } from "../types/types";
import { removeTaskThunk } from "./store/TasksSlice";

const TaskDeleteForm = ({ task }: { task: TaskType }) => {
  const { handleCloseModal } = useModal();
  const dispatch = useAppDispatch();

  function handleDeleteCateogry() {
    dispatch(removeTaskThunk(task));
    handleCloseModal();
  }

  return (
    <>
      <ConfirmFormAction
        onClose={handleCloseModal}
        onAction={handleDeleteCateogry}
        variant="destructive"
        actionName="Delete"
      >
        <h2 className="font-bold uppercase text-purple-primary text-center mx-auto text-lg">
          Delete Task
        </h2>
        <p className="text-center text-base">
          Your task will be deleted. Are you sure?
        </p>
      </ConfirmFormAction>
    </>
  );
};

export default TaskDeleteForm;
