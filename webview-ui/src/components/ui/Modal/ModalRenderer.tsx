import React from "react";
import { closeModal } from "./store/modalSlice";

// Import your UI components
import TaskAddEditForm from "@/features/tasks/TaskAddEditForm";
import TaskDeleteForm from "@/features/tasks/TaskDeleteForm";
import TaskDetailView from "@/features/tasks/TaskDetailsView";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import ModalContainer from "./ModalContainer";
import CategoryAddEditForm from "@/features/tasks/CategoryAddEditForm";
import CategoryDeleteForm from "@/features/tasks/CategoryDeleteForm";

const ModalRenderer = () => {
  const dispatch = useAppDispatch();
  const { type, data } = useAppSelector((state) => state.modal);
  const handleClose = () => dispatch(closeModal());
  if (!type) {
    return null;
  }

  const renderModalContent = (() => {
    switch (type) {
      case "taskDetail":
        return data.task ? <TaskDetailView task={data.task} /> : null;

      case "addEditTask":
        return <TaskAddEditForm task={data.task} />;

      case "deleteTask":
        return data.task ? <TaskDeleteForm task={data.task} /> : null;

      case "addEditCategory":
        return <CategoryAddEditForm category={data.category} />;

      case "deleteCategory":
        return data.category ? (
          <CategoryDeleteForm category={data.category} />
        ) : null;

      default:
        return null;
    }
  })();

  if (!renderModalContent) return null;

  return (
    <ModalContainer isOpen={true} onClose={handleClose}>
      {renderModalContent}
    </ModalContainer>
  );
};

export default ModalRenderer;
