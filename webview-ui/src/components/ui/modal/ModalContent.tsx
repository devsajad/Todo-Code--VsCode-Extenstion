import React, { type ReactNode } from "react";
import { useModal } from "./ModalContext";
import useClickOutside from "../../../hooks/useClickOutside";

const ModalContent = ({ children }: { children: ReactNode }) => {
  const { isShowModal, handleCloseModal } = useModal();
  const ref = useClickOutside(handleCloseModal, true);

  if (isShowModal)
    return (
      <div className="fixed inset-0 bg-gray-bg/60 backdrop-blur-sm flex items-center justify-center px-6">
        <div className="bg-gray-secondry p-6 max-w-md grow" ref={ref}>
          {children}
        </div>
      </div>
    );
};

export default ModalContent;
