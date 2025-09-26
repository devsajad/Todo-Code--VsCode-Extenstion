import FilterButton from "@/components/FitlerButton";
import { DropDown } from "@/components/ui/DropDown/DropDown";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import React from "react";
import { HiOutlineViewColumns } from "react-icons/hi2";
import {
  IoCalendarOutline,
  IoFilter,
  IoFlagOutline,
  IoList,
  IoListOutline,
} from "react-icons/io5";
import { setShowCompleted, setSortBy, setviewMode } from "./store/FilterSlice";

const TaskFilter = () => {
  const dispatch = useAppDispatch();

  const { showCompleted, viewMode } = useAppSelector((state) => state.filters);

  return (
    <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FilterButton
          isActive={showCompleted === null}
          onClick={() => dispatch(setShowCompleted(null))}
        >
          All tasks
        </FilterButton>
        <FilterButton
          isActive={showCompleted === false}
          onClick={() => dispatch(setShowCompleted(false))}
        >
          In Progress
        </FilterButton>
        <FilterButton
          isActive={showCompleted === true}
          onClick={() => dispatch(setShowCompleted(true))}
        >
          Completed
        </FilterButton>
      </div>

      <div className="flex items-center gap-4">
        <DropDown>
          <DropDown.Trigger>
            <div className="flex items-center gap-1.5 text-white-text/80 hover:text-white-text transition-colors group">
              <IoFilter />
              <span className="text-xs">Sort</span>
            </div>
          </DropDown.Trigger>
          <DropDown.Content>
            {/* ✅ 2. Use the new Ionicons 5 components */}
            <DropDown.Item onClick={() => dispatch(setSortBy("default"))}>
              <span>Default</span>
              <IoListOutline />
            </DropDown.Item>
            <DropDown.Item onClick={() => dispatch(setSortBy("priority"))}>
              <span>Priority</span>
              <IoFlagOutline />
            </DropDown.Item>
            <DropDown.Item onClick={() => dispatch(setSortBy("endDate"))}>
              <span>Due Date</span>
              <IoCalendarOutline />
            </DropDown.Item>
          </DropDown.Content>
        </DropDown>

        <div className="flex items-center p-1 bg-button-background hover:bg-button-background/50  text-button-foreground rounded-lg">
          <FilterButton
            isActive={viewMode === "column"}
            onClick={() => dispatch(setviewMode("column"))}
            className={
              viewMode === "column" ? "" : "bg-transparent! text-white-text/60"
            }
          >
            <HiOutlineViewColumns />
          </FilterButton>
          <FilterButton
            isActive={viewMode === "row"}
            onClick={() => dispatch(setviewMode("row"))}
            className={
              viewMode === "row" ? "" : "bg-transparent! text-white-text/60"
            }
          >
            <IoList />
          </FilterButton>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
