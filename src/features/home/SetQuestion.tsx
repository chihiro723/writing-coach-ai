"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SetQuestion = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const handleClick = () => {
    if (input === "") return;
    const questionText: string = input;
    router.push(`/writing?question=${encodeURIComponent(questionText)}`);
  };
  return (
    <div>
      <div className="mt-8 pt-4 px-4 pb-3 border shadow-md max-w-screen-lg mx-auto">
        <label
          htmlFor="textarea"
          className="block text-gray-700 mb-2 font-medium"
        >
          問題を設定する
        </label>
        <textarea
          id="textarea"
          rows={4}
          maxLength={1000}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"
          placeholder="Type your sentence here..."
          spellCheck="false"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <div className="flex justify-between items-center pt-1.5">
          <p className="text-gray-500 text-sm ml-2">
            外部から引用したり、自分で好きなように設定しよう！
          </p>
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-1 mr-2 hover:bg-blue-400"
            onClick={handleClick}
          >
            挑戦する
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetQuestion;
