import React from "react";

const Button = ({
  handleClick,
  children,
  disabled = false,
}: {
  handleClick: () => void;
  children: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`px-6 py-3 text-white rounded-xl font-medium transition-colors duration-200 ${
        disabled 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-orange-500 cursor-pointer hover:bg-orange-600"
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
