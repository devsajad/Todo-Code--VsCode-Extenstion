import React from "react";
import { IoMdAdd } from "react-icons/io";
import { DropDown } from "../../components/ui/DropDown/DropDown";
import Modal from "../../components/ui/Modal/Modal";
import CategoryAddEditForm from "./CategoryAddEditForm";
import TaskAddEditForm from "./TaskAddEditForm";

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
            <TaskAddEditForm />
          </Modal.Content>
        </Modal>

        <Modal>
          <Modal.Trigger>
            <DropDown.Item>Add Category</DropDown.Item>
          </Modal.Trigger>

          <Modal.Content>
            <CategoryAddEditForm />
          </Modal.Content>
        </Modal>
      </DropDown.Content>
    </DropDown>
  );
};

export default TaskDropDown;
