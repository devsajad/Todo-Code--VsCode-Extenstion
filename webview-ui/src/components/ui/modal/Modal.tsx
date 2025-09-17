import React, { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";
import ModalTrigger from "./ModalTrigger";
import ModalContent from "./ModalContent";

const Modal = ({ children }: { children: ReactNode }) => {
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const modalContextValues = {
    isShowModal,
    handleCloseModal,
    handleOpenModal,
  };

  return (
    <ModalContext.Provider value={modalContextValues}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

export default Modal;
