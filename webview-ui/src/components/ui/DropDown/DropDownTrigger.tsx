import React, { type ReactNode } from "react";
import { useDropDown } from "./DropDownContext";

type ModalTriggerPropsType = {
  children: ReactNode;
  classNames?: string;
};

const DropDownTrigger = ({ children, classNames }: ModalTriggerPropsType) => {
  const { handleToggleDropDown } = useDropDown();

  return (
    <div>
      <button
        onClick={() => handleToggleDropDown()}
        className={`text-sm rounded-sm font-medium uppercase w-full justify-center cursor-pointer ${classNames}`}
      >
        {children}
      </button>
    </div>
  );
};

export default DropDownTrigger;
