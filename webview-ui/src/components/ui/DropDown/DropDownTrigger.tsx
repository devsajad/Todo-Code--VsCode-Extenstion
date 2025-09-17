import React, { type ReactNode } from "react";
import { useDropDown } from "./DropDownContext";

type ModalTriggerPropsType = {
  children: ReactNode;
};

const DropDownTrigger = ({ children }: ModalTriggerPropsType) => {
  const { handleToggleDropDown } = useDropDown();

  return (
    <div>
      <button
        onClick={() => handleToggleDropDown()}
        className=" text-sm font-base  w-full bg-purple-primary text-primary-text flex items-center justify-center gap-1 px-2 py-1 cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
};

export default DropDownTrigger;
