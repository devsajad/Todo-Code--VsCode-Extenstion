import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { setCategories } from "./features/tasks/store/CategoriesSlice";
import { vscode } from "./utils/vscode";
import { ICON_MAP } from "./features/tasks/constants/constants";
import { VscChecklist, VscChevronDown } from "react-icons/vsc";

function SidebarApp() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.command === "update-categories") {
        dispatch(setCategories(event.data.data));
      }
    };
    window.addEventListener("message", handleMessage);

    vscode.postMessage({ command: "get-sidebar-data" });

    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  const handleFilterClick = (categoryId: string | null) => {
    setActiveFilterId(categoryId);
    vscode.postMessage({
      command: "set-category-filter",
      data: { categoryId },
    });
  };

  if (!categories) return <p>Start by adding categories and tasks</p>;
  return (
    <div className="text-sm h-dvh bg-gray-secondry">
      <div className="flex items-center px-2 gap-2 mb-1 bg-gray-bg py-1 w-full uppercase text-xs font-medium cursor-pointer">
        <VscChevronDown />
        <h3>Categories</h3>
      </div>

      <ul className="">
        <li>
          <button
            onClick={() => handleFilterClick(null)}
            className="w-full flex items-center gap-2 text-left pl-6.5 py-2 hover:bg-gray-bg duration-200"
          >
            <VscChecklist className="size-4" />
            <span>All Tasks</span>
          </button>
        </li>

        {categories.map((category) => {
          const IconComponent = ICON_MAP[category.icon];
          return (
            <li key={category.id}>
              <button
                onClick={() => handleFilterClick(category.id)}
                className="w-full flex items-center gap-2 text-left pl-6.5 py-2 hover:bg-gray-bg duration-200"
              >
                {IconComponent && (
                  <IconComponent
                    className="size-4"
                    style={{ color: category.color }}
                  />
                )}
                <span>{category.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SidebarApp;
