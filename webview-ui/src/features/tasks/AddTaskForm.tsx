import DateRangePicker from "@/components/DatePicker";
import React, { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useModal } from "../../components/ui/Modal/ModalContext";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import CategoryPicker from "./CategoryPicker";
import PriorityPicker from "./PriorityPicker";
import { addManualTaskThunk } from "./store/TasksSlice";

const AddTaskForm = () => {
  const { handleCloseModal } = useModal();
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const categories = useAppSelector((state) => state.categories);
  const [selectedPriority, setSelectedPriority] = useState<number>(5);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || ""
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput || !selectedCategoryId) return;

    dispatch(
      addManualTaskThunk({
        text: titleInput,
        categoryId: selectedCategoryId,
        priority: selectedPriority,
        startDate: dateRange?.from,
        endDate: dateRange?.to,
        description: descriptionInput,
      })
    );

    handleCloseModal();
  };

  if (categories.length === 0) {
    return <p>Please add a category first.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-6 space-y-1">
        <label htmlFor="title" className="font-medium text-base">
          Title
        </label>
        <input
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="border-1 border-white-text/30 px-2 py-2"
          type="text"
          name="title"
          id="title"
          placeholder="Enter your task title"
        />
      </div>

      <div className="flex flex-col mb-6 space-y-1">
        <label htmlFor="description" className="font-medium  text-base">
          Description
        </label>
        <input
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          className="border-1 border-white-text/30 px-2 py-2 rounded-md"
          type="text"
          name="description"
          id="description"
          placeholder="Enter your task description"
        />
      </div>

      <div className="flex flex-col mb-6 space-y-1">
        <label className="font-medium  text-base">Start/End Date</label>
        <DateRangePicker
          selectedRange={dateRange}
          onRangeSelect={setDateRange}
        />
      </div>

      <div className="mb-6">
        <label className="font-medium  text-base inline-block mb-1">
          Choose Category{" "}
          <span className="font-light text-sm">({selectedCategoryId})</span>
        </label>
        <CategoryPicker
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
      </div>

      <div className="mb-8">
        <label className="font-medium  text-base inline-block mb-1">
          Priority
        </label>
        <PriorityPicker
          selectedPriority={selectedPriority}
          onPrioritySelect={setSelectedPriority}
        />
      </div>

      <button type="submit" className="btn-primary">
        <span className="font-medium">Add Task</span>
      </button>
    </form>
  );
};

export default AddTaskForm;
