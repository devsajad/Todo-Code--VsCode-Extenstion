import { openModal } from "@/components/ui/Modal/store/modalSlice";
import { useAppDispatch } from "@/store/hook";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { DropDown } from "../../components/ui/DropDown/DropDown";

const TaskDropDown = () => {
  const dispatch = useAppDispatch();
  return (
    <DropDown>
      <DropDown.Trigger classNames="bg-purple-primary text-primary-text px-2 py-1 flex gap-1 items-center rounded-sm">
        <p className="font-medium">Add</p>
        <IoMdAdd />
      </DropDown.Trigger>

      <DropDown.Content>
        <DropDown.Item
          onClick={() => dispatch(openModal({ type: "addEditTask" }))}
        >
          Add Task
        </DropDown.Item>

        <DropDown.Item
          onClick={() => dispatch(openModal({ type: "addEditCategory" }))}
        >
          Add Category
        </DropDown.Item>
      </DropDown.Content>
    </DropDown>
  );
};

export default TaskDropDown;
