import React, { type ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="max-w-7xl mx-auto px-6 ">
      <div className="py-6 flex items-center gap-6 justify-between">
        <h1 className="uppercase text-xl font-bold text-purple-primary">
          Todo Codev
        </h1>
        {children}
      </div>
    </header>
  );
};
