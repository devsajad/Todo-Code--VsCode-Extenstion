import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import ColorPicker from "../../components/ColorPicker";
import IconPicker from "../../components/IconPicker";
import { useModal } from "../../components/ui/Modal/ModalContext";
import { useAppDispatch } from "../../store/hook";
import { CATEGORIES_COLORS, CATEGORIES_ICONS } from "../constants/constants";
import { addCategoryThunk } from "./store/CategoriesSlice";
import { useDropDown } from "../../components/ui/DropDown/DropDownContext";

const AddCategoryForm = () => {
  const { handleCloseModal } = useModal();
  const { handleCloseDropDown } = useDropDown();
  const [nameInput, setNameInput] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(CATEGORIES_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(CATEGORIES_ICONS[0]);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2 className="text-purple-primary font-bold text-center max-w-55 py-2 mx-auto text-lg mb-6 uppercase">
        Create New Category
      </h2>
      <div className="flex flex-col mb-6 space-y-2">
        <label htmlFor="title" className="font-medium uppercase text-base">
          Name
        </label>
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="border-1 border-white-text/30 px-2 py-1"
          type="text"
          name="title"
          id="title"
          placeholder="Enter category name"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium uppercase text-base">
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

      <div className="mb-8">
        <label className="block mb-2 font-bold text-base uppercase">
          Color{" "}
          <span className="font-light lowercase">( {selectedColor} )</span>
        </label>
        <ColorPicker
          colors={CATEGORIES_COLORS}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-1 bg-purple-primary text-primary-text py-1 px-2 ml-auto"
      >
        <span>Add</span>
        <VscSend />
      </button>
    </form>
  );
};

export default AddCategoryForm;
