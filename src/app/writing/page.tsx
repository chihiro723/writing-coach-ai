"use client";
import Button from "@/components/Button";
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
    if (answer === "" || question === "") return;
    router.push(
      `/writing/correction?question=${question}&answer=${answer}&wordCount=${wordCount}`
    );
  };
  return (
    // クエリ情報のquestionがnull以外で存在することを確認
    <div className="max-w-screen-lg mx-auto shadow-md p-4 mt-8 border">
      {String(question) === "null" ? (
        <div className="text-red-700 font-bold mb-2">
          問題が正しく設定されていません
        </div>
      ) : (
        <>
          <div className="text-gray-700 font-semibold mb-2">{`問題 ${
            String(wordCount) === "null" || wordCount === "none"
              ? ""
              : `${wordCount}words`
          }`}</div>
          <div className="text-gray-700 font-bold text-lg mb-6">{question}</div>
        </>
      )}
      <div className="text-gray-700 font-bold ml-1 italic opacity-60">
        解答欄
      </div>

      <div>
        <textarea
          className="w-full h-[450px] outline-none border border-gray-300 text-2xl font-medium pt-4 px-8 pb-4 rounded leading-loose"
          placeholder="Enter your answer here..."
          spellCheck="false"
          required
          value={answer ?? ""}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <div className="mt-4">
          <Button handleClick={handleConfirm}>確認</Button>
        </div>
      </div>
    </div>
  );
}
