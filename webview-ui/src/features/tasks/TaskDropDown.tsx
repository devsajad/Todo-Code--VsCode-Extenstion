import React from "react";
import { VscAdd } from "react-icons/vsc";
import { DropDown } from "../../components/ui/DropDown/DropDown";
import Modal from "../../components/ui/Modal/Modal";
import AddTaskForm from "./AddTaskForm";

const TaskDropDown = () => {
  return (
    <DropDown>
      <DropDown.Trigger>
        Add
        <VscAdd />
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

        <DropDown.Item> Add Category</DropDown.Item>
      </DropDown.Content>
    </DropDown>
  );
};

export default TaskDropDown;
