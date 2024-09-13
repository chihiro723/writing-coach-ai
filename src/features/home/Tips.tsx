import tipssections from "@/data/tipsData";
import React, { useState } from "react";

const Tips = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="pl-4 mt-28">tips</div>
      <hr className="border-top-3 border-gray-700 opacity-50 mt-2" />
      <div className="mx-auto mt-20 p-4">
        <div className="flex">
          {tipssections.map((section, index) => (
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
          {tipssections[activeIndex].content}
        </div>
      </div>
    </div>
  );
};

export default Tips;
