import React from "react";
import { IoMdAdd } from "react-icons/io";
import { DropDown } from "../../components/ui/DropDown/DropDown";
import Modal from "../../components/ui/Modal/Modal";
import AddCategoryForm from "./AddCategoryForm";
import AddTaskForm from "./AddTaskForm";

const TaskDropDown = () => {
  return (
    <DropDown>
      <DropDown.Trigger>
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
            <AddCategoryForm />
          </Modal.Content>
        </Modal>
      </DropDown.Content>
    </DropDown>
  );
};

export default TaskDropDown;
