import React, { type ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 ">
      {children}
    </main>
  );
};

export default Main;
