import React from "react";

const Button = ({
  handleClick,
  children,
}: {
  handleClick: () => void;
  children: string;
}) => {
  return (
    <button
      className="ml-3 bg-blue-500 px-4 py-2 text-white rounded-sm cursor-pointer hover:bg-blue-400"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
