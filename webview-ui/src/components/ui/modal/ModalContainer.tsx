import React, { useState } from "react";
import Modal from "./Modal";
import { ModalContext } from "./ModalContext";
import ModalDropDown from "./ModalDropDown";

interface ModalManagerProps {
  children: React.ReactNode;
}

const ModalManager = ({ children }: ModalManagerProps) => {
  const [activeModal, setActiveModal] = useState<"task" | "category" | null>(
    null
  );
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);

  const toggleDropDown = () => setIsShowDropDown((s) => !s);
  const openModal = (modalId: "task" | "category") => setActiveModal(modalId);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
        toggleDropDown,
        isShowDropDown,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalManager.DropDown = ModalDropDown;
ModalManager.Modal = Modal;

export { ModalManager };
