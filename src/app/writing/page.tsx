"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Writing() {
  const searchParams = useSearchParams();
  const question = searchParams.get("question");
  const wordCount = searchParams.get("wordCount");
  const [answer, setAnswer] = useState<string | null>(
    searchParams.get("answer")
  );
  const router = useRouter();
  const handleConfirm = () => {
    if (!answer?.trim() || question === "") return;
    router.push(
      `/writing/correction?question=${question}&answer=${answer}&wordCount=${wordCount}`
    );
  };

  const isAnswerEmpty = !answer?.trim();
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          {String(question) === "null" ? (
            <div className="text-red-600 font-bold mb-4 p-3 bg-red-50 rounded-xl">
              問題が正しく設定されていません
            </div>
          ) : (
            <div className="mb-6">
              <div className="text-gray-600 font-medium mb-2 text-sm">{`問題 ${
                String(wordCount) === "null" || wordCount === "none"
                  ? ""
                  : `${wordCount}words`
              }`}</div>
              <div className="text-gray-800 font-bold text-lg p-3 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                {question}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-base">
              解答欄
            </label>
            <textarea
              className="w-full h-[400px] p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-base leading-relaxed resize-none transition-all duration-200"
              placeholder="ここに英作文を入力してください..."
              spellCheck="false"
              required
              value={answer ?? ""}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              className={`px-6 py-3 text-white rounded-xl font-medium transition-colors duration-200 ${
                isAnswerEmpty
                  ? "bg-gray-300 cursor-not-allowed opacity-50"
                  : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
              }`}
              onClick={handleConfirm}
              disabled={isAnswerEmpty}
            >
              確認・添削へ進む
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
