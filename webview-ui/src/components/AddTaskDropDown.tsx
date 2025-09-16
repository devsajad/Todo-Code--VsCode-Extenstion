import React, { useState } from "react";
import { VscAdd } from "react-icons/vsc";

const AddTaskDropDown = () => {
  const [isShowDropDown, setShowDropDown] = useState(false);

  function clickToggleDropDown() {
    setShowDropDown((s) => !s);
  }

  return (
    <div className="relative">
      <button
        onClick={() => clickToggleDropDown()}
        className="bg-button-background text-button-foreground text-base flex items-center justify-center gap-1 px-2 py-1 cursor-pointer"
      >
        <p className="text-sm font-light hidden md:block">ADD</p>
        <VscAdd className="text-sm" />
      </button>
      {isShowDropDown && (
        <div className="absolute left-0 -bottom-1 translate-y-full text-xs font-light bg-purple-primary ">
          <ul className="divide-y-2 divide-gray-bg">
            <li className="whitespace-nowrap px-2 py-1">
              <button>Add Task</button>
            </li>
            <li className="whitespace-nowrap px-2 py-1">
              <button>Add Category</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddTaskDropDown;
