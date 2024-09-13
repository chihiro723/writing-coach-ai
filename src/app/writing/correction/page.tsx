"use client";
import Button from "@/components/Button";
import Scoring from "@/components/Scoring ";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Correction = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<string | null>(null);
  const [grammer, setGrammer] = useState<string | null>(null);
  const [logicality, setLogicality] = useState<string | null>(null);
  const [example, setExample] = useState<string | null>(null);
  const [scored, setScored] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    new URLSearchParams(window.location.search);
    setQuestion(searchParams.get("question"));
    setAnswer(searchParams.get("answer"));
    setWordCount(searchParams.get("wordCount"));
  }, []);

  const handleEdit = () => {
    if (
      typeof question === "string" &&
      typeof wordCount === "string" &&
      typeof answer === "string"
    ) {
      router.push(
        `/writing?question=${encodeURIComponent(
          question
        )}&wordCount=${encodeURIComponent(
          wordCount
        )}&answer=${encodeURIComponent(answer)}`
      );
    }
  };

  const handleClick = async () => {
    setScored(false);
    setSubmiting(true);
    if (!question || !answer) {
      setError("質問または回答が設定されていません。");
      return;
    }
    try {
      // 「点数」「文法など」「論理性など」「解答例」を別個にapiに投げる
      const resScore = await fetch(
        `/api/correction/score?question=${encodeURIComponent(
          question
        )}&answer=${encodeURIComponent(answer)}`,
        {
          method: "GET",
        }
      );
      const resGrammer = await fetch(
        `/api/correction/grammer?question=${encodeURIComponent(
          question
        )}&answer=${encodeURIComponent(answer)}`,
        {
          method: "GET",
        }
      );
      const resLogicality = await fetch(
        `/api/correction/logicality?question=${encodeURIComponent(
          question
        )}&answer=${encodeURIComponent(answer)}`,
        {
          method: "GET",
        }
      );
      const resExample = await fetch(
        `/api/correction/example?question=${encodeURIComponent(
          question
        )}&answer=${encodeURIComponent(answer)}`,
        {
          method: "GET",
        }
      );

      if (!resScore.ok || !resGrammer.ok || !resLogicality.ok) {
        throw new Error("API request failed");
      }
      const resultScore = await resScore.json();
      const resultGrammer = await resGrammer.json();
      const resultLogicality = await resLogicality.json();
      const resultExample = await resExample.json();
      setScore(resultScore || "点数の返答がありませんでした");
      setGrammer(resultGrammer || "文法の返答がありませんでした。");
      setLogicality(resultLogicality || "スペルの返答がありませんでした");
      setExample(resultExample || "解答例の返答がありませんでした");
      setError(null);
      setSubmiting(false);
      setScored(true);
    } catch (error) {
      setGrammer(null);
      setError("エラーが発生しました。");
      console.error("Error fetching correction:", error);
    }
  };

  return (
    <>
      <div className={`max-w-screen-lg mx-auto ${scored || "mb-96"}`}>
        <div className="shadow-md p-4 mt-8 border">
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
              <div className="text-gray-700 font-bold text-lg mb-6">
                {question}
              </div>
            </>
          )}
          <div className="text-gray-700 font-bold ml-1 italic opacity-60">
            あなたの回答
          </div>
          <div className="text-2xl font-medium pt-4 px-8 pb-4 rounded bg-orange-200 text-gray-700 leading-loose mb-5">
            {answer}
          </div>

          <Button handleClick={handleEdit}>訂正</Button>
          <Button handleClick={handleClick}>提出</Button>
        </div>
        {submiting && <Scoring />}
      </div>

      {/* 「提出」を押すと、APiフェッチ後にscoredがtrueに設定される */}
      {scored && (
        <>
          <div className="max-w-screen-lg mx-auto italic mt-20 font-bold text-gray-700 opacity-60 pl-1">
            採点結果
          </div>
          <div className="w-full max-w-screen-lg mx-auto p-12 border-4 border-black">
            <h2 className="text-red-700 font-bold text-2xl pl-6">
              {`${score}点 `}
              <span className="text-gray-700 font-semibold text-sm">
                / 100点満点
              </span>
            </h2>
            <div className="mt-8">
              <h2 className="text-gray-700 font-bold text-xl mb-1">
                <span className="text-base">⚪︎ </span>
                <span className="border-b-2 border-gray-700">
                  文法・表現・綴り
                </span>
              </h2>
              <div
                className="text-gray-700 font-semibold text-lg leading-loose p-2"
                dangerouslySetInnerHTML={{ __html: String(grammer) }}
              ></div>
            </div>
            <div className="mt-10">
              <h2 className="text-gray-700 font-bold text-xl mb-3">
                <span className="text-base">⚪︎</span>
                <span className="border-b-2 border-gray-700">
                  文章の内容・論理性
                </span>
              </h2>
              <div className="text-gray-700 font-semibold text-lg leading-relaxed p-2">
                {logicality}
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-gray-700 font-bold text-xl mb-3">
                <span className="text-base">⚪︎</span>
                <span className="border-b-2 border-gray-700">解答例</span>
              </h3>
              <div className="text-gray-700 font-semibold text-xl leading-relaxed p-2">
                {example}
              </div>
            </div>
            <div className="mt-10 text-red-700">{error && <p>{error}</p>}</div>
          </div>
          <div className="max-w-screen-lg mx-auto mt-14 text-right pr-6">
            <span className="text-blue-700 border-b border-blue-700 text-lg font-bold hover:text-blue-500 hover:border-blue-500">
              <Link href="/">次の問題へ</Link>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default Correction;
