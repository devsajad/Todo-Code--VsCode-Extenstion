import { useModal } from "@/components/ui/Modal/ModalContext";
import { useAppDispatch } from "@/store/hook";
import React from "react";
import type { CategoryType } from "../types/types";
import { removeCategoryThunk } from "./store/CategoriesSlice";

const DeleteCategoryForm = ({ category }: { category: CategoryType }) => {
  const { handleCloseModal } = useModal();
  const dispatch = useAppDispatch();

  function handleDeleteCateogry() {
    dispatch(removeCategoryThunk(category.id));
  }

  return (
    <form>
      <header className="mb-12">
        <h2 className="font-bold uppercase text-purple-primary text-center mx-auto text-lg">
          Delete Category
        </h2>
        <p className="text-center">
          All tasks in {category.name} will be deleted. Are you sure?
        </p>
      </header>

      <div className="w-full flex gap-3">
        <button
          onClick={handleCloseModal}
          type="button"
          className="border-1 border-purple-primary grow-1 py-2 rounded-lg font-medium text-base"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteCateogry}
          type="button"
          className="bg-red-700 hover:bg-red-600 duration-300 grow-1 rounded-lg font-medium text-base"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default DeleteCategoryForm;
