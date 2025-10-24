import { closeModal } from "@/components/ui/Modal/store/modalSlice";
import React, { useState } from "react";
import ColorPicker from "../../components/ColorPicker";
import IconPicker from "../../components/IconPicker";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import type { CategoryType } from "../../types/types";
import { CATEGORIES_COLORS, CATEGORIES_ICONS } from "../../constants/constants";
import {
  addCategoryThunk,
  updateCategoryAndCascadeThunk,
} from "../categories/store/CategoriesSlice";

const CategoryAddEditForm = ({ category }: { category?: CategoryType }) => {
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

  const allCategories = useAppSelector((state) => state.categories);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setNameInput(category?.name || "");
    setSelectedColor(category?.color || CATEGORIES_COLORS[0]);
    setSelectedIcon(category?.icon || CATEGORIES_ICONS[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedNewName = nameInput.toLowerCase().replace(/\s+/g, "");

    if (!normalizedNewName) {
      setError("Category name cannot be empty.");
      return;
    }

    const isDuplicate = allCategories.some(
      (cat) =>
        // Normalize the existing category name before comparing
        cat.name.toLowerCase().replace(/\s+/g, "") === normalizedNewName &&
        cat.id !== category?.id
    );

    if (isDuplicate) {
      setError("A category with this name already exists.");
      return;
    }

    setError(null);
    if (category)
      dispatch(
        updateCategoryAndCascadeThunk(category, {
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

    resetState();
    dispatch(closeModal());
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-bold uppercase text-purple-primary text-center max-w-55 py-2 mx-auto text-lg mb-4">
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
        {error && <p className="text-red-accent text-xs mt-1">{error}</p>}
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
        <span className="font-medium text-base">Submit</span>
      </button>
    </form>
  );
};

export default CategoryAddEditForm;
