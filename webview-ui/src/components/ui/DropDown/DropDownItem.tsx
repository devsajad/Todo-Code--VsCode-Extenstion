import React, { type ReactNode } from "react";

const DropDownItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <li className="whitespace-nowrap">
      <button className="px-2 py-1 w-full text-left" onClick={onClick}>
        {children}
      </button>
    </li>
  );
};

export default DropDownItem;
