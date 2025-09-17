import React, { type ReactNode } from "react";
import { useModal } from "./ModalContext";

const ModalContent = ({ children }: { children: ReactNode }) => {
  const { isShowModal, handleCloseModal } = useModal();

  function handleClickModal(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();

    handleCloseModal();
  }

  if (isShowModal)
    return (
      <div
        onClick={(e) => handleClickModal(e)}
        className="fixed inset-0 bg-gray-bg/60 backdrop-blur-sm flex items-center justify-center px-6"
      >
        {children}
      </div>
    );
};

export default ModalContent;
