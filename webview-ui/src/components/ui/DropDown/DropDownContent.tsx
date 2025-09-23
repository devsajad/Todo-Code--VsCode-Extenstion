import React, { type ReactNode } from "react";
import { useDropDown } from "./DropDownContext";

const DropDownContent = ({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}) => {
  const { isShowDropDown } = useDropDown();

  return (
    <>
      <div className="relative z-5">
        <div
          className={`absolute right-0 top-1 text-sm bg-button-background rounded-md duration-200 transition-all ${classNames} ${
            isShowDropDown ? "visible-state" : "invisible-state"
          }`}
        >
          <ul className="divide-y-2 divide-gray-bg">{children}</ul>
        </div>
      </div>
    </>
  );
};

export default DropDownContent;
