import { DropDown } from "@/components/ui/DropDown/DropDown";
import Modal from "@/components/ui/Modal/Modal";
import React from "react";
import { IoIosMore, IoMdCreate, IoMdTrash } from "react-icons/io";
import type { CategoryType } from "../types/types";
import AddEditCategoryForm from "./AddEditCategoryForm";
import DeleteCategoryForm from "./DeleteCategoryForm";

const MoreCategoryButton = ({ category }: { category: CategoryType }) => {
  return (
    <div className="ml-auto">
      <DropDown>
        <DropDown.Trigger>
          <IoIosMore className="text-lg" />
        </DropDown.Trigger>

        <DropDown.Content>
          <Modal>
            <Modal.Trigger>
              <DropDown.Item>
                <div className="flex items-center justify-between w-24">
                  <p>Edit</p>
                  <IoMdCreate />
                </div>
              </DropDown.Item>
            </Modal.Trigger>

            <Modal.Content>
              <AddEditCategoryForm category={category} />
            </Modal.Content>
          </Modal>

          <Modal>
            <Modal.Trigger>
              <DropDown.Item>
                <div className="flex items-center justify-between w-24">
                  <p>Delete</p>
                  <IoMdTrash />
                </div>
              </DropDown.Item>
            </Modal.Trigger>

            <Modal.Content>
              <DeleteCategoryForm category={category} />
            </Modal.Content>
          </Modal>
        </DropDown.Content>
      </DropDown>
    </div>
  );
};

export default MoreCategoryButton;
