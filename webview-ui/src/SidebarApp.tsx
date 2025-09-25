import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { setCategories } from "./features/categories/store/CategoriesSlice";
import { vscode } from "./utils/vscode";
import { ICON_MAP } from "./constants/constants";
import { VscChecklist, VscChevronDown } from "react-icons/vsc";
import { IoAdd, IoSettingsOutline } from "react-icons/io5";

function SidebarApp() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "update-categories") {
        dispatch(setCategories(event.data.data));
      }

      if (message.command === "categories-updated") {
        dispatch(setCategories(message.data));
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

  const handleOpenModal = (modalType: string) => {
    vscode.postMessage({
      command: "open-modal",
      data: { type: modalType },
    });
  };

  if (!categories) return <p>Start by adding categories and tasks</p>;

  return (
    <div className="text-sm h-dvh bg-gray-secondry flex flex-col">
      <div className="flex items-center px-2 gap-2 bg-sidebar-header text-shadow-sidebar-foreground py-1 w-full uppercase text-xs font-medium cursor-pointer">
        <VscChevronDown />
        <h3>Categories</h3>
      </div>

      <ul className="grow">
        <li>
          <button
            onClick={() => handleFilterClick(null)}
            className={`${
              !activeFilterId && "bg-list-hover text-list-hover-foreground"
            } w-full flex items-center gap-2 text-left pl-6.5 py-2 hover:bg-list-hover text-shadow-sidebar-foreground hover:text-list-hover-foreground duration-200"`}
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
                className={`${
                  category.id === activeFilterId &&
                  "bg-list-hover text-list-hover-foreground"
                } w-full flex items-center gap-2 text-left pl-6.5 py-2 hover:bg-list-hover hover:text-list-hover-foreground text-shadow-sidebar-foreground duration-200`}
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

      {/* Action buttons are pushed to the bottom */}
      <div className="p-2 border-t border-white-text/10 flex items-center gap-2">
        <button
          onClick={() => handleOpenModal("addEditCategory")}
          className="flex-grow flex items-center bg-purple-primary gap-1.5 justify-center p-1.5 rounded-md text-sm hover:bg-button-hoverBackground transition-colors"
        >
          <IoAdd />
          <span className="text-xs">New Category</span>
        </button>
        <button
          onClick={() => handleOpenModal("settings")}
          className="flex-shrink-0 p-2 rounded-md bg-button-background hover:bg-button-hoverBackground transition-colors"
          title="Settings"
        >
          <IoSettingsOutline />
        </button>
      </div>
    </div>
  );
}

export default SidebarApp;
