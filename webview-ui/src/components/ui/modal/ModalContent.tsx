import React, { type ReactNode } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { useModal } from "./ModalContext";
import { createPortal } from "react-dom";

const ModalContent = ({ children }: { children: ReactNode }) => {
  const { isShowModal, handleCloseModal } = useModal();
  const ref = useClickOutside(handleCloseModal, true);

  if (isShowModal) {
    const mainElement = document.querySelector("main");
    if (!mainElement) return null;
    return createPortal(
      <div className="fixed z-10 inset-0 bg-gray-bg/60 backdrop-blur-sm flex items-center justify-center px-6">
        <div
          className="bg-gray-secondry p-6 max-w-md grow rounded-xl"
          ref={ref}
        >
          {children}
        </div>
      </div>,
      mainElement
    );
  }
};

export default ModalContent;
