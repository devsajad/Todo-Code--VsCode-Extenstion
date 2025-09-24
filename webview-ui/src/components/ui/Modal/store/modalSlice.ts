import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryType, TaskType } from "@/types/types";

interface ModalData {
  task?: TaskType;
  category?: CategoryType;
  categoryId?: string;
}
type TypeUnions =
  | "taskDetail"
  | "addEditTask"
  | "deleteTask"
  | "addEditCategory"
  | "deleteCategory"
  | null;
interface ModalState {
  type: TypeUnions;
  data: ModalData;
}

const initialState: ModalState = {
  type: null,
  data: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: TypeUnions; data?: ModalData }>
    ) => {
      state.type = action.payload.type;
      state.data = action.payload.data || {};
    },
    closeModal: (state) => {
      state.type = null;
      state.data = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
