import expressionsSections from "@/data/expressionsData";
import React, { useState } from "react";

const ExpressionsList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="mx-auto mt-6 p-4">
        <div className="flex">
          {expressionsSections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-sm py-2 px-3 rounded-tl-3xl ${
                activeIndex === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="p-4 border-2 bg-white">
          {/* 選択中の項目を表示 */}
          {expressionsSections[activeIndex].content}
        </div>
      </div>
    </div>
  );
};

export default ExpressionsList;
