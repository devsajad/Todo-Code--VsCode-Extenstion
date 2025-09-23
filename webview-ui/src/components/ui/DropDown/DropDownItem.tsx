import React, { type ReactNode } from "react";

const DropDownItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <li>
      <button
        className="w-full text-left flex items-center justify-between gap-2 px-3 py-1.5 text-sm rounded-md text-white-text/80
                   hover:bg-purple-primary hover:text-primary-text 
                   focus:bg-purple-primary focus:text-primary-text focus:outline-none
                   transition-colors duration-100"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};

export default DropDownItem;
