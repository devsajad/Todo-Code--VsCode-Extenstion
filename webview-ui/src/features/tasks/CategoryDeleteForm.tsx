import { useAppDispatch } from "@/store/hook";
import React from "react";
import type { CategoryType } from "../../types/types";
import { removeCategoryThunk } from "./store/CategoriesSlice";
import ConfirmFormAction from "@/components/ConfirmFormAction";
import { closeModal } from "@/components/ui/Modal/store/modalSlice";

const CategoryDeleteForm = ({ category }: { category: CategoryType }) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  function handleDeleteCateogry() {
    dispatch(removeCategoryThunk(category.id));
    handleCloseModal();
  }

  return (
    <>
      <ConfirmFormAction
        onClose={handleCloseModal}
        onAction={handleDeleteCateogry}
        variant="destructive"
        actionName="Delete"
      >
        <h2 className="font-bold uppercase text-purple-primary text-center mx-auto text-lg">
          Delete Category
        </h2>
        <p className="text-center text-base">
          All tasks in {category.name} will be deleted. Are you sure?
        </p>
      </ConfirmFormAction>
    </>
  );
};

export default CategoryDeleteForm;
