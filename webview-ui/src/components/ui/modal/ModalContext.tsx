import { createContext, useContext } from "react";

interface ModalContextType {
  activeModal: "task" | "category" | null;
  openModal: (modalId: "task" | "category") => void;
  closeModal: () => void;
  toggleDropDown: () => void;
  isShowDropDown: boolean;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Component must be rendered within a ModalManager");
  }
  return context;
};
