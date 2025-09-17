import React, { type ReactNode } from "react";

const DropDownItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="whitespace-nowrap">
      <button className="px-2 py-1 w-full text-left">{children}</button>
    </li>
  );
};

export default DropDownItem;
