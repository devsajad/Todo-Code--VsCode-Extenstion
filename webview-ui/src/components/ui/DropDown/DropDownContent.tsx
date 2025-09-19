import React, { type ReactNode } from "react";
import { useDropDown } from "./DropDownContext";

const DropDownContent = ({ children }: { children: ReactNode }) => {
  const { isShowDropDown } = useDropDown();

  return (
    <>
      <div className="relative z-5">
        {isShowDropDown && (
          <div className="absolute right-0 top-0 text-sm bg-button-background rounded-md">
            <ul className="divide-y-2 divide-gray-bg">{children}</ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropDownContent;
