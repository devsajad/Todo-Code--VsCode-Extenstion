import { DropDown } from "@/components/ui/DropDown/DropDown";
import { openModal } from "@/components/ui/Modal/store/modalSlice";
import { useAppDispatch } from "@/store/hook";
import React from "react";
import { IoIosMore, IoMdCreate, IoMdTrash } from "react-icons/io";
import type { CategoryType } from "../../types/types";

const CategoryMoreButton = ({ category }: { category: CategoryType }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="ml-auto">
      <DropDown>
        <DropDown.Trigger>
          <IoIosMore className="text-lg" />
        </DropDown.Trigger>

        <DropDown.Content>
          <DropDown.Item>
            <div
              className="flex items-center justify-between w-full"
              onClick={() =>
                dispatch(
                  openModal({
                    type: "addEditCategory",
                    data: { category: category },
                  })
                )
              }
            >
              <p>Edit</p>
              <IoMdCreate />
            </div>
          </DropDown.Item>

          <DropDown.Item>
            <div
              className="flex items-center justify-between w-full"
              onClick={() =>
                dispatch(
                  openModal({
                    type: "deleteCategory",
                    data: { category: category },
                  })
                )
              }
            >
              <p>Delete</p>
              <IoMdTrash />
            </div>
          </DropDown.Item>
        </DropDown.Content>
      </DropDown>
    </div>
  );
};

export default CategoryMoreButton;
