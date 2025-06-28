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
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">問題を設定する</h2>
      <div className="space-y-4">
        <textarea
          id="textarea"
          rows={4}
          maxLength={1000}
          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="英作文の問題を入力してください..."
          spellCheck="false"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            外部から引用したり、自分で好きなように設定しよう！
          </p>
          <button
            className="bg-orange-500 text-white rounded-xl px-8 py-3 font-medium hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
            onClick={handleClick}
            disabled={!input.trim()}
          >
            挑戦する
          </button>
        </div>
      </div>
    </section>
  );
};

export default SetQuestion;
