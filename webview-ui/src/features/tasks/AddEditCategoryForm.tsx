import React, { useState } from "react";
import ColorPicker from "../../components/ColorPicker";
import IconPicker from "../../components/IconPicker";
import { useDropDown } from "../../components/ui/DropDown/DropDownContext";
import { useModal } from "../../components/ui/Modal/ModalContext";
import { useAppDispatch } from "../../store/hook";
import { CATEGORIES_COLORS, CATEGORIES_ICONS } from "../constants/constants";
import { addCategoryThunk, updateCategoryThunk } from "./store/CategoriesSlice";
import type { CategoryType } from "../types/types";

const AddEditCategoryForm = ({ category }: { category?: CategoryType }) => {
  const { handleCloseModal } = useModal();
  const { handleCloseDropDown } = useDropDown();
  const [nameInput, setNameInput] = useState<string>(
    () => category?.name || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    () => category?.color || CATEGORIES_COLORS[0]
  );
  const [selectedIcon, setSelectedIcon] = useState(
    () => category?.icon || CATEGORIES_ICONS[0]
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category)
      dispatch(
        updateCategoryThunk({
          name: nameInput,
          color: selectedColor,
          icon: selectedIcon,
          id: category.id,
        })
      );
    else
      dispatch(
        addCategoryThunk({
          name: nameInput,
          color: selectedColor,
          icon: selectedIcon,
        })
      );

    handleCloseModal();
    handleCloseDropDown();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-bold uppercase text-purple-primary text-center max-w-55 py-2 mx-auto text-lg mb-6">
        {category ? "Edit Category" : "Create New Category"}
      </h2>
      <div className="flex flex-col mb-4 space-y-1">
        <label htmlFor="title" className="font-medium  text-base">
          Name
        </label>
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="border-1 border-white-text/30 px-2 py-2"
          type="text"
          name="title"
          id="title"
          placeholder="Enter category name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium  text-base">
          Icon{" "}
          <span className="font-light lowercase">
            ( {selectedIcon.slice(3)} )
          </span>
        </label>
        <IconPicker
          icons={CATEGORIES_ICONS}
          selectedIcon={selectedIcon}
          onIconSelect={setSelectedIcon}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-1 font-medium text-base ">
          Color{" "}
          <span className="font-light lowercase">( {selectedColor} )</span>
        </label>
        <ColorPicker
          colors={CATEGORIES_COLORS}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />
      </div>

      <button type="submit" className="btn-primary">
        <span className="font-medium">Add Task</span>
      </button>
    </form>
  );
};

export default AddEditCategoryForm;
