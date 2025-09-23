import React, { useState } from "react";
import DropDownContent from "./DropDownContent";
import { DropDownContext } from "./DropDownContext";
import DropDownItem from "./DropDownItem";
import DropDownTrigger from "./DropDownTrigger";
import useClickOutside from "../../../hooks/useClickOutside";

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);
  const handleToggleDropDown = () => setIsShowDropDown((s) => !s);
  const handleCloseDropDown = () => setIsShowDropDown(false);

  const ref = useClickOutside(handleCloseDropDown, isShowDropDown);

  return (
    <DropDownContext.Provider
      value={{
        isShowDropDown,
        handleToggleDropDown,
        handleCloseDropDown,
      }}
    >
      <div className="relative" ref={ref}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

DropDown.Trigger = DropDownTrigger;
DropDown.Content = DropDownContent;
DropDown.Item = DropDownItem;

export { DropDown };
