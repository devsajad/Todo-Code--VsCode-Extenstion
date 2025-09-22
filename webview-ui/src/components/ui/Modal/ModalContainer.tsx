import React, { type ReactNode } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

const ModalContainer = ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ref = useClickOutside(onClose, true);

  return (
    <div
      className={`fixed z-10 inset-0 transition-all duration-200 bg-gray-bg/60 backdrop-blur-sm flex items-center justify-center px-6 ${
        isOpen ? "visible-state" : "invisible-state"
      }`}
    >
      <div className="bg-gray-secondry p-6 max-w-md grow rounded-xl" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
