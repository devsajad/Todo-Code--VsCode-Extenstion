import { openModal } from "@/components/ui/Modal/store/modalSlice";
import { useAppDispatch } from "@/store/hook";
import React from "react";
import { IoCheckboxOutline, IoPricetagOutline } from "react-icons/io5";
import { DropDown } from "../../components/ui/DropDown/DropDown";
import { IoMdAdd } from "react-icons/io";

const TaskDropDown = () => {
  const dispatch = useAppDispatch();
  return (
    <DropDown>
      <DropDown.Trigger classNames="bg-purple-primary text-primary-text px-3 py-1.5 flex items-center gap-1.5 rounded-lg font-semibold text-xs hover:opacity-90 transition-opacity">
        <IoMdAdd className="text-base" />
        <span>Add New</span>
      </DropDown.Trigger>

      <DropDown.Content>
        <DropDown.Item
          onClick={() => dispatch(openModal({ type: "addEditTask" }))}
        >
          <span>Add Task</span>
          <IoCheckboxOutline />
        </DropDown.Item>

        <DropDown.Item
          onClick={() => dispatch(openModal({ type: "addEditCategory" }))}
        >
          <span>Add Category</span>
          <IoPricetagOutline />
        </DropDown.Item>
      </DropDown.Content>
    </DropDown>
  );
};

export default TaskDropDown;
