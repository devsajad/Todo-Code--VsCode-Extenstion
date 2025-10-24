import React, { type ReactNode } from "react";
import { VscChecklist } from "react-icons/vsc"; 

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="max-w-7xl mx-auto px-6 py-2 border-b border-white-text/10 mb-8">
      <div className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <VscChecklist className="text-purple-primary text-xl" />
          <h1 className="text-lg font-semibold text-white-text">Code Todos</h1>
        </div>
        {children}
      </div>
    </header>
  );
};
