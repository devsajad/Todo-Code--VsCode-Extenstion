import React, { type ReactNode } from "react";

const Tooltip = ({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) => {
  return (
    <div
      className="px-1 py-0.5 rounded-sm absolute whitespace-nowrap -bottom-2 translate-y-full invisible pointer-events-none scale-90 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100 transition-all duration-200"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
};

export default Tooltip;
