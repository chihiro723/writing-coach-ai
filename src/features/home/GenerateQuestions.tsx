"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGeneration } from "@/hooks/useGeneration";
import LoadingUi from "@/components/LoadingUi";
import { LEVELS, TOPICS, WORD_COUNT_OPTIONS, UI_CONSTANTS } from "@/config/constants";

const GenerateQuestions = () => {
  const router = useRouter();
  const { generateQuestions, loading, error, questions } = useGeneration();
  const [level, setLevel] = useState<string>("none");
  const [topic, setTopic] = useState<string>("none");
  const [questionWordCount, setQuestionWordCount] = useState<string>("none");
  const [answerWordCount, setAnswerWordCount] = useState<string>("none");
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");

  const handleGenerate = async () => {
    // Prepare the request data
    const selectedTopic = Object.values(TOPICS).find(t => t.value === topic);
    const selectedLevel = Object.values(LEVELS).find(l => l.value === level);
    
    const genre = selectedTopic?.apiValue || TOPICS.none.apiValue;
    const difficulty = selectedLevel?.apiValue || LEVELS.none.apiValue;
    const wordCount = answerWordCount === "none" ? WORD_COUNT_OPTIONS.DEFAULT : answerWordCount;

    // Add keywords to genre if provided
    let finalGenre = genre;
    if (keyword1) finalGenre += `, ${keyword1}`;
    if (keyword2) finalGenre += `, ${keyword2}`;

    await generateQuestions({
      genre: finalGenre,
      level: difficulty,
      wordCount: wordCount,
    });
  };

  const handleClick = (question: string, suggestedWordCount: string) => {
    router.push(
      `/writing?question=${encodeURIComponent(
        question
      )}&wordCount=${encodeURIComponent(suggestedWordCount)}`
    );
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">AIで問題を生成する</h2>
      <div className="bg-gray-50 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">レベル</label>
              <select
                id="level"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                {Object.values(LEVELS).map((levelOption) => (
                  <option key={levelOption.value} value={levelOption.value}>
                    {levelOption.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">テーマ</label>
              <select
                id="topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                {Object.values(TOPICS).map((topicOption) => (
                  <option key={topicOption.value} value={topicOption.value}>
                    {topicOption.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="questionWordCount" className="block text-sm font-medium text-gray-700 mb-2">問題の文字数</label>
              <select
                id="questionWordCount"
                name="questionWordCount"
                value={questionWordCount}
                onChange={(e) => setQuestionWordCount(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                <option value="none">指定しない</option>
                {WORD_COUNT_OPTIONS.QUESTION.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="answerWordCount" className="block text-sm font-medium text-gray-700 mb-2">回答の文字数</label>
              <select
                id="answerWordCount"
                name="answerWordCount"
                value={answerWordCount}
                onChange={(e) => setAnswerWordCount(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                <option value="none">指定しない</option>
                {WORD_COUNT_OPTIONS.ANSWER.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="keyword1" className="block text-sm font-medium text-gray-700 mb-2">キーワード1</label>
            <input
              id="keyword1"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              type="text"
              maxLength={UI_CONSTANTS.KEYWORD_MAX_LENGTH}
              placeholder={UI_CONSTANTS.KEYWORD_PLACEHOLDER}
              value={keyword1}
              onChange={(e) => setKeyword1(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="keyword2" className="block text-sm font-medium text-gray-700 mb-2">キーワード2</label>
            <input
              id="keyword2"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              type="text"
              maxLength={UI_CONSTANTS.KEYWORD_MAX_LENGTH}
              placeholder={UI_CONSTANTS.KEYWORD_PLACEHOLDER}
              value={keyword2}
              onChange={(e) => setKeyword2(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          className="w-full md:w-1/2 bg-orange-500 text-white rounded-xl px-8 py-4 font-medium hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? UI_CONSTANTS.LOADING_TEXT.GENERATING : UI_CONSTANTS.BUTTON_TEXT.GENERATE}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingUi message={UI_CONSTANTS.LOADING_TEXT.GENERATING} />
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center my-4 p-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">生成された問題</h3>
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={question.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex-1 text-gray-700 font-medium leading-relaxed">
                    {question.question}
                  </div>
                  <button
                    className="bg-orange-500 text-white rounded-xl px-6 py-3 font-medium hover:bg-orange-600 transition-colors duration-200 whitespace-nowrap"
                    onClick={() => handleClick(question.question, question.suggestedWordCount)}
                  >
                    {UI_CONSTANTS.BUTTON_TEXT.CHALLENGE}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6">
        <p className="text-gray-500 text-sm text-center">
          目的に応じた問題をAIに作成してもらおう！（意図した結果が得られない場合があります）
        </p>
      </div>
    </section>
  );
};

export default GenerateQuestions;