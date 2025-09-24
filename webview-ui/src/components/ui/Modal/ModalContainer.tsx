import React, { type ReactNode } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";

const ModalContainer = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const ref = useClickOutside(onClose, true);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`fixed z-10 inset-0 transition-all duration-200 bg-gray-bg/60 backdrop-blur-sm flex items-center justify-center px-6`}
      >
        <motion.div
          key="modal-content"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-gray-secondry p-6 max-w-md grow rounded-xl"
          ref={ref}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalContainer;
