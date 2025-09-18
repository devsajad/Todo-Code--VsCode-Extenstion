import React from "react";
import { IoMdAdd } from "react-icons/io";
import { DropDown } from "../../components/ui/DropDown/DropDown";
import Modal from "../../components/ui/Modal/Modal";
import AddEditCategoryForm from "./AddEditCategoryForm";
import AddTaskForm from "./AddTaskForm";

const TaskDropDown = () => {
  return (
    <DropDown>
      <DropDown.Trigger classNames="bg-purple-primary text-primary-text px-2 py-1 flex gap-1 items-center rounded-sm">
        Add
        <IoMdAdd />
      </DropDown.Trigger> 

      <DropDown.Content>
        <Modal>
          <Modal.Trigger>
            <DropDown.Item>Add Task</DropDown.Item>
          </Modal.Trigger>

          <Modal.Content>
            <AddTaskForm />
          </Modal.Content>
        </Modal>

        <Modal>
          <Modal.Trigger>
            <DropDown.Item>Add Category</DropDown.Item>
          </Modal.Trigger>

          <Modal.Content>
            <AddEditCategoryForm />
          </Modal.Content>
        </Modal>
      </DropDown.Content>
    </DropDown>
  );
};

export default TaskDropDown;
