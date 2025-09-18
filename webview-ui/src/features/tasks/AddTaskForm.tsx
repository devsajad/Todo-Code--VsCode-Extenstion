import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useModal } from "../../components/ui/Modal/ModalContext";
import { useAppSelector } from "../../store/hook";
import CategoryPicker from "./CategoryPicker";
import PriorityPicker from "./PriorityPicker";

const AddTaskForm = () => {
  const { handleCloseModal } = useModal();
  const [titleInput, setTitleInput] = useState<string>("");
  const categories = useAppSelector((state) => state.categories);
  const [selectedPriority, setSelectedPriority] = useState<number>(5);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || ""
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(); // ✅ 2. Add state for the date

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!taskText || !selectedCategoryId) return;

  // dispatch(addManualTask({
  //   text: taskText,
  //   categoryId: selectedCategoryId,
  //   priority: selectedPriority,
  //   date: selectedDate,
  // }));

  //   // handleCloseModal(); // Assuming you get this from context or props
  // };

  // Prevent rendering if there are no categories to choose from
  if (categories.length === 0) {
    return <p>Please add a category first.</p>;
  }

  return (
    <form>
      <div className="flex flex-col mb-6 space-y-2">
        <label htmlFor="title" className="font-medium uppercase text-base">
          Title
        </label>
        <input
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="border-1 border-white-text/30 px-2 py-1"
          type="text"
          name="title"
          id="title"
          placeholder="Enter your task title"
        />
      </div>

      <div className="flex flex-col mb-6 space-y-2">
        <label htmlFor="title" className="font-medium uppercase text-base">
          Description
        </label>
        <input
          className="border-1 border-white-text/30 px-2 py-1"
          type="text"
          name="title"
          id="title"
          placeholder="Enter your task description"
        />
      </div>

      {/* <div className="mb-6">
        <label className="block mb-2">Due Date</label>
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div> */}

      <div className="mb-6">
        <label className="font-medium uppercase text-base inline-block mb-3">
          Choose Category{" "}
          <span className="font-light text-sm">({selectedCategoryId})</span>
        </label>
        <CategoryPicker
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
      </div>

      <div className="mb-12">
        <label className="font-medium uppercase text-base inline-block mb-3">
          Priority
        </label>
        <PriorityPicker
          selectedPriority={selectedPriority}
          onPrioritySelect={setSelectedPriority}
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

export default AddTaskForm;
