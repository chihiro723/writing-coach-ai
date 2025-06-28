import expressionsSections from "@/data/expressionsData";
import React, { useState } from "react";

const ExpressionsList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full">
      <div className="mt-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {expressionsSections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeIndex === index
                  ? "bg-orange-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 transition-all duration-300">
          <div className="prose prose-lg max-w-none">
            {expressionsSections[activeIndex].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressionsList;
