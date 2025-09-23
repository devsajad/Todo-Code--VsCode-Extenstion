import { useAppSelector } from "@/store/hook";
import React, { type ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  const { viewMode } = useAppSelector((state) => state.filters);
  const gridStyle = viewMode === "column" ? "md:grid-cols-3" : "md:grid-cols-1";

  return (
    <main
      className={`grid grid-cols-1 gap-6 max-w-7xl mx-auto px-6 pb-6 ${gridStyle}`}
    >
      {children}
    </main>
  );
};

export default Main;
