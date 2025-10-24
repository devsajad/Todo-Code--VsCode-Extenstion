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
    <div
      className={`absolute z-10 right-0 top-full mt-2 w-30 md:w-40 origin-top-right rounded-md bg-gray-secondry shadow-lg ring-1 ring-white-text/10 focus:outline-none transition-all ease-in-out duration-150
        ${classNames}
        ${
          isShowDropDown
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
    >
      <ul className="p-1">{children}</ul>
    </div>
  );
};

export default DropDownContent;
