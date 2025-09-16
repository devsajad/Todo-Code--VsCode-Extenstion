import { VscSend } from "react-icons/vsc";
import { useModalContext } from "./ModalContext";
import React from "react";

const Modal = () => {
  const { activeModal, closeModal } = useModalContext();
  if (activeModal)
    return (
      <div
        onClick={() => closeModal()}
        className="absolute inset-0 bg-gray-bg/60 backdrop-blur-sm flex items-center justify-center px-6"
      >
        {activeModal === "task" && (
          <form
            className="bg-gray-secondry p-6 max-w-md grow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col mb-3 space-y-2">
              <label
                htmlFor="title"
                className="font-medium uppercase text-base"
              >
                Title
              </label>
              <input
                className="border-1 border-white-text/30 px-2 py-1"
                type="text"
                name="title"
                id="title"
                placeholder="Enter your task title"
              />
            </div>

            <div className="flex flex-col mb-6 space-y-2">
              <label
                htmlFor="title"
                className="font-medium uppercase text-base"
              >
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

            <button
              type="submit"
              className="flex items-center gap-1 bg-button-background text-button-foreground py-1 px-2 ml-auto"
            >
              <span>Add</span>
              <VscSend />
            </button>
          </form>
        )}
      </div>
    );
};

export default Modal;
