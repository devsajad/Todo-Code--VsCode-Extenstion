import React from "react";
import { useModal } from "./ModalContext";

const ModalTrigger = ({ children }: { children: React.ReactElement }) => {
  const { handleOpenModal } = useModal();

  return <div onClick={handleOpenModal}>{children}</div>;
};

export default ModalTrigger;
