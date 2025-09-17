import React, { type ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 ">
      <header className="py-6 flex items-center gap-6">
        <h1 className="font-bold uppercase text-xl">Project Todos</h1>
        {children}
      </header>
    </div>
  );
};
