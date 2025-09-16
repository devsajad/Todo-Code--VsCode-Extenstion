import { VscAdd } from "react-icons/vsc";
import React from "react";
import { useModalContext } from "./ModalContext";

const ModalDropDown = () => {
  const { openModal, isShowDropDown, toggleDropDown } = useModalContext();

  return (
    <>
      <div className="relative">
        <button
          onClick={() => toggleDropDown()}
          className="bg-purple-primary text-primary-text text-base flex items-center justify-center gap-1 px-2 py-1 cursor-pointer"
        >
          <p className="text-sm font-base hidden md:block">ADD</p>
          <VscAdd className="text-sm bol" />
        </button>
        {isShowDropDown && (
          <div className="absolute left-0 -bottom-1 translate-y-full text-sm bg-button-background">
            <ul className="divide-y-2 divide-gray-bg">
              <li className="whitespace-nowrap px-2 py-1">
                <button onClick={() => openModal("task")}>Add Task</button>
              </li>
              <li className="whitespace-nowrap px-2 py-1">
                <button onClick={() => openModal("category")}>
                  Add Category
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalDropDown;
