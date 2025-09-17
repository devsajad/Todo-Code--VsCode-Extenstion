import React, { useState } from "react";
import DropDownContent from "./DropDownContent";
import { DropDownContext } from "./DropDownContext";
import DropDownItem from "./DropDownItem";
import DropDownTrigger from "./DropDownTrigger";
import useClickOutside from "../../../hooks/useClickOutside";

interface ModalProps {
  children: React.ReactNode;
}

const DropDown = ({ children }: ModalProps) => {
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);
  const handleToggleDropDown = () => setIsShowDropDown((s) => !s);
  const handleCloseDropDown = () => setIsShowDropDown(false);

  const ref = useClickOutside(handleCloseDropDown);

  return (
    <DropDownContext.Provider
      value={{
        handleToggleDropDown,
        isShowDropDown,
        handleCloseDropDown,
      }}
    >
      <div className="space-y-0.5" ref={ref}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

DropDown.Trigger = DropDownTrigger;
DropDown.Content = DropDownContent;
DropDown.Item = DropDownItem;

export { DropDown };
