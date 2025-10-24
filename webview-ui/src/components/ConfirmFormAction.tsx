import React from "react";

// Define the variants for the action button
type ButtonVariant = "destructive" | "primary";

type PropsType = {
  children: React.ReactNode; // Use children for flexible content
  actionName: string;
  variant?: ButtonVariant; // Optional variant prop
  onAction: () => void;
  onClose: () => void;
};

const ConfirmFormAction = ({
  children,
  actionName,
  variant = "primary", // Default to 'primary'
  onAction,
  onClose,
}: PropsType) => {
  const actionButtonStyles = {
    destructive: "bg-red-700 hover:bg-red-600",
    primary: "bg-purple-primary hover:bg-purple-primary/50",
  };

  return (
    <div
      className="p-6 bg-gray-secondry rounded-lg w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="mb-8 text-center">{children}</header>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onClose}
          type="button"
          className="border border-purple-primary py-2 rounded-lg font-medium text-base hover:bg-purple-primary/10 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onAction}
          type="button"
          className={`py-2 rounded-lg font-medium text-base text-white transition-colors duration-300 ${actionButtonStyles[variant]}`}
        >
          {actionName}
        </button>
      </div>
    </div>
  );
};

export default ConfirmFormAction;
