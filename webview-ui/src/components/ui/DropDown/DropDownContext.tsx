import { createContext, useContext } from "react";

interface DropDownContextType {
  handleToggleDropDown: () => void;
  handleCloseDropDown: () => void;
  isShowDropDown: boolean;
}

export const DropDownContext = createContext<DropDownContextType | null>(null);

export const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error("Component must be rendered within a ModalManager");
  }
  return context;
};
