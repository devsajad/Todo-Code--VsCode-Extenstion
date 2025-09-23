import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";

const selectTasks = (state: RootState) => state.tasks;
const selectFilters = (state: RootState) => state.filters;

export const selectVisibleTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    let filteredTasks = [...tasks];

    // 1. Apply "show completed" filter
    if (filters.showCompleted === true) {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    }
    if (filters.showCompleted === false) {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    // 2. Apply "category" filter
    if (filters.filterByCategories.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        filters.filterByCategories.includes(task.categoryId)
      );
    }

    // 3. Apply sorting
    switch (filters.sortBy) {
      case "priority":
        filteredTasks.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
        break;
      case "endDate":
        filteredTasks.sort((a, b) => {
          if (!a.endDate) return 1;
          if (!b.endDate) return -1;
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
        break;
    }

    return filteredTasks;
  }
);
