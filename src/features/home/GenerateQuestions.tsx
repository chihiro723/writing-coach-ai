"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const GenerateQuestions = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState<string>("none");
  const [topic, setTopic] = useState<string>("none");
  const [questionWordCount, setQuestionWordCount] = useState<string>("none");
  const [answerWordCount, setAnswerWordCount] = useState<string>("none");
  const [answerWordCountRecord, setAnswerWordCountRecord] =
    useState<string>("");
  const [keyword1, setKeyword1] = useState("none");
  const [keyword2, setKeyword2] = useState("none");
  const [questions, setQuestions] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);

  const generateQuestions = async () => {
    setAnswerWordCountRecord(answerWordCount);
    // APIに渡す情報を文字列として整理する
    const optionsObject = {
      level: level,
      topic: topic,
      questionWordCount: questionWordCount,
      answerWordCount: answerWordCount,
      keyword1: keyword1,
      keyword2: keyword2,
    };
    const optionsString =
      `問題の難易度: ${optionsObject.level}, 扱うテーマ: ${optionsObject.topic}, 生成する問題文の英単語数: ${optionsObject.questionWordCount}, 回答に求められるword数: ${optionsObject.answerWordCount}, キーワード1: ${optionsObject.keyword1}, キーワード2: ${optionsObject.keyword2}`.replace(
        /none/g,
        "指定なし"
      );
    try {
      const res = await fetch(
        `api/generation?options=${encodeURIComponent(optionsString)}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("API request failed");
      }
      const result = await res.json();
      try {
        const parsedArray = JSON.parse(result);
        if (parsedArray === null || typeof parsedArray !== "object") return;
        const ques = parsedArray.map((questionText: string, index: number) => ({
          id: String(index),
          text: questionText,
        }));
        setQuestions(ques);
      } catch (error) {
        console.error(
          "APIレスポンスの文字列を配列形式に変換できませんでした。再度fetchを行います。"
        );
        generateQuestions();
      }
      setError(null);
    } catch (error) {
      setError("エラーが発生しました。");
      console.error("Error fetching correction:", error);
    }
  };
  const handleClick = (id: string) => {
    const questionText = questions[Number(id)].text;
    router.push(
      `/writing?question=${encodeURIComponent(
        questionText
      )}&wordCount=${encodeURIComponent(answerWordCountRecord)}`
    );
  };

  return (
    <div className="p-4 border shadow-md max-w-screen-lg mx-auto">
      <div className="block text-gray-700 font-medium">
        AIを使って問題を生成する
      </div>
      <div className="flex justify-center mt-6 gap-10 bg-indigo-100 pt-10 pb-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="level">レベルを選択: </label>
            <select
              id="level"
              name="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-md outline-none cursor-pointer"
            >
              <option value="none">指定しない</option>
              <option value="eiken-3">英検3級</option>
              <option value="eiken-pre2">英検準2級</option>
              <option value="eiken-2">英検2級</option>
              <option value="eiken-pre1">英検準1級</option>
              <option value="eiken-1">英検1級</option>
              <option value="college-beginner">大学受験入門</option>
              <option value="college-standard">大学受験標準</option>
              <option value="college-advanced">大学受験上級</option>
            </select>
          </div>
          <div>
            <label htmlFor="topic">テーマを選択: </label>
            <select
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-md outline-none cursor-pointer"
            >
              <option value="none">指定しない</option>
              <option value="education">教育</option>
              <option value="environment">環境</option>
              <option value="healthcare">医療</option>
              <option value="law">法律</option>
              <option value="politics">政治</option>
              <option value="economics">経済</option>
              <option value="history">歴史</option>
              <option value="language">言語</option>
              <option value="culture">文化</option>
              <option value="gender">ジェンダー</option>
              <option value="science-technology">科学技術</option>
              <option value="internet-media">インターネット・メディア</option>
              <option value="population-issues">人口問題</option>
              <option value="self">自分について</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="questionWordCount">問題のword数: </label>
            <select
              id="questionWordCount"
              name="questionWordCount"
              value={questionWordCount}
              onChange={(e) => setQuestionWordCount(e.target.value)}
              className="rounded-md outline-none cursor-pointer"
            >
              <option value="none">指定しない</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div>
            <label htmlFor="answerWordCount">回答のword数: </label>
            <select
              id="answerWordCount"
              name="answerWordCount"
              value={answerWordCount}
              onChange={(e) => setAnswerWordCount(e.target.value)}
              className="rounded-md outline-none cursor-pointer"
            >
              <option value="none">指定しない</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
              <option value="110">110</option>
              <option value="120">120</option>
              <option value="130">130</option>
              <option value="140">140</option>
              <option value="150">150</option>
              <option value="160">160</option>
              <option value="170">170</option>
              <option value="180">180</option>
              <option value="190">190</option>
              <option value="200">200</option>
              <option value="210">210</option>
              <option value="220">220</option>
              <option value="230">230</option>
              <option value="240">240</option>
              <option value="250">250</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-indigo-100 text-center">
        <label htmlFor="keyword1">キーワード1: </label>
        <input
          id="keyword1"
          className="mr-5 p-px pl-1 outline-none rounded-md w-44"
          type="text"
          maxLength={10}
          placeholder="10文字まで"
          onChange={(e) => {
            setKeyword1(e.target.value);
          }}
        />
        <label htmlFor="keyword2">キーワード2: </label>
        <input
          id="keyword2"
          className="p-px pl-1 outline-none rounded-md w-44"
          type="text"
          maxLength={10}
          placeholder="10文字まで"
          onChange={(e) => {
            setKeyword2(e.target.value);
          }}
        />
      </div>

      <div className="text-center pt-12 pb-10 mb-2 bg-indigo-100">
        <button
          className="w-3/5 bg-blue-500 text-white rounded-md px-4 py-1 mr-2 hover:bg-blue-400"
          onClick={generateQuestions}
        >
          生成する
        </button>
      </div>
      <ul className="space-y-6">
        {questions.map((question, index) => (
          <li
            key={question.id}
            className={`${index === 0 && "mt-14"} ${
              index === questions.length - 1 && "pb-12"
            } `}
          >
            <div className="flex justify-between px-2">
              <div className="w-5/6 text-gray-700 font-medium">
                {question.text}
              </div>
              <button
                className="bg-blue-500 text-white rounded-md w-24 h-8 hover:bg-blue-400"
                onClick={() => handleClick(question.id)}
              >
                挑戦する
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-gray-500 text-sm ml-2 pt-3">
          目的に応じた問題をAIに作成してもらおう！（意図した結果が得られない場合があります）
        </p>
      </div>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default GenerateQuestions;
