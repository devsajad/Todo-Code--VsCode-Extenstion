import { MAX_CATS_GRID_COLS } from "@/constants/constants";
import { useAppSelector } from "@/store/hook";
import React, { type ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  const { viewMode } = useAppSelector((state) => state.filters);
  const filteredCategories = useAppSelector(
    (state) => state.filters.filterByCategories
  );

  const colCount =
    filteredCategories.length === 0
      ? MAX_CATS_GRID_COLS
      : Math.min(filteredCategories.length, MAX_CATS_GRID_COLS);

  const gridStyle =
    viewMode === "column" ? `md:grid-cols-${colCount}` : "md:grid-cols-1";

  return (
    <main className={`grid gap-6 max-w-7xl mx-auto px-6 pb-6 ${gridStyle}`}>
      {children}
    </main>
  );
};

export default Main;
