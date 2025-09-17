import { createContext, useContext } from "react";

type ModalContextType = {
  isShowModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Using modal context outside of the provider");
  }
  return context;
}
