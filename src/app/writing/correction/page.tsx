"use client";
import Button from "@/components/Button";
import Scoring from "@/components/Scoring";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCorrection } from "@/hooks/useCorrection";
import { UI_CONSTANTS, ERROR_MESSAGES, SCORING_CRITERIA } from "@/config/constants";

const Correction = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [scored, setScored] = useState<boolean>(false);
  const { submitCorrection, loading, error, results } = useCorrection();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
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
    
    if (!question || !answer) {
      return;
    }

    await submitCorrection({
      question,
      answer,
      wordCount: wordCount || undefined,
    });

    setScored(true);
  };

  const renderGrammarCorrections = () => {
    if (!results.grammar) return null;
    
    if (!results.grammar.hasErrors) {
      return <p className="text-gray-700 font-semibold text-lg p-2">特になし</p>;
    }

    if (!Array.isArray(results.grammar.corrections)) {
      return <p className="text-gray-700 font-semibold text-lg p-2">添削データを取得できませんでした</p>;
    }

    return (
      <ul className="text-gray-700 font-semibold text-lg leading-loose p-2 list-disc list-inside">
        {results.grammar.corrections.map((correction, index) => (
          <li key={index}>
            「{correction.original}」→「{correction.corrected}」
            （{correction.reason}）
          </li>
        ))}
      </ul>
    );
  };

  const renderLogicality = () => {
    if (!results.logicality) return null;

    return (
      <div className="text-gray-700 font-semibold text-lg leading-relaxed p-2">
        {results.logicality.isLogical ? (
          <p>論理的に一貫した内容です。</p>
        ) : (
          <>
            <p className="mb-2">論理性に改善の余地があります：</p>
            {Array.isArray(results.logicality.issues) && results.logicality.issues.length > 0 && (
              <ul className="list-disc list-inside mb-4">
                {results.logicality.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            )}
          </>
        )}
        {Array.isArray(results.logicality.suggestions) && results.logicality.suggestions.length > 0 && (
          <>
            <p className="font-bold mt-4 mb-2">改善提案：</p>
            <ul className="list-disc list-inside">
              {results.logicality.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {String(question) === "null" ? (
              <div className="text-red-600 font-bold mb-4 p-3 bg-red-50 rounded-xl">
                {ERROR_MESSAGES.QUESTION_NOT_SET}
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
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                あなたの回答
              </label>
              <div className="min-h-[250px] p-4 bg-orange-50 rounded-xl border-2 border-orange-200 text-base leading-relaxed text-gray-800">
                {answer}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button handleClick={handleEdit}>{UI_CONSTANTS.BUTTON_TEXT.EDIT}</Button>
              <Button handleClick={handleClick} disabled={loading || !question || !answer}>
                {loading ? UI_CONSTANTS.LOADING_TEXT.SCORING : UI_CONSTANTS.BUTTON_TEXT.SUBMIT}
              </Button>
            </div>
          </div>
          {loading && <Scoring />}
        </div>
      </div>

      {/* 採点結果表示 */}
      {scored && results.score && (
        <div className="bg-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              採点結果
            </h2>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-6 py-3">
                  <span className="text-3xl font-bold">{results.score.score}</span>
                  <span className="text-lg ml-2">/ {SCORING_CRITERIA.TOTAL_MAX}点</span>
                </div>
              </div>
              
              {/* スコア内訳 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <h4 className="font-semibold text-blue-800 mb-2 text-sm">文法・スペル</h4>
                  <div className="text-xl font-bold text-blue-600">
                    {results.score.breakdown.grammar}<span className="text-xs text-gray-600">/{SCORING_CRITERIA.GRAMMAR_MAX}</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm">内容・論理性</h4>
                  <div className="text-xl font-bold text-green-600">
                    {results.score.breakdown.content}<span className="text-xs text-gray-600">/{SCORING_CRITERIA.CONTENT_MAX}</span>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <h4 className="font-semibold text-purple-800 mb-2 text-sm">構成・まとまり</h4>
                  <div className="text-xl font-bold text-purple-600">
                    {results.score.breakdown.structure}<span className="text-xs text-gray-600">/{SCORING_CRITERIA.STRUCTURE_MAX}</span>
                  </div>
                </div>
              </div>

              {/* 総合フィードバック */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold mb-2 text-base text-gray-800">総合フィードバック</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{results.score.feedback}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="text-blue-800 font-bold text-lg mb-3 flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                    文法・表現・綴り
                  </h3>
                  <div className="bg-white rounded-lg p-3">
                    {renderGrammarCorrections()}
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="text-green-800 font-bold text-lg mb-3 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                    文章の内容・論理性
                  </h3>
                  <div className="bg-white rounded-lg p-3">
                    {renderLogicality()}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="text-purple-800 font-bold text-lg mb-3 flex items-center">
                    <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">3</span>
                    解答例
                  </h3>
                  {results.example && (
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-gray-700 font-medium text-base leading-relaxed mb-3 p-3 bg-gray-50 rounded-lg">
                        {results.example.example}
                      </div>
                      <div className="text-gray-600 text-xs mb-3">
                        単語数: {results.example.wordCount}語
                      </div>
                      {Array.isArray(results.example.keyPoints) && results.example.keyPoints.length > 0 && (
                        <div>
                          <p className="font-bold mb-2 text-gray-800 text-sm">ポイント：</p>
                          <ul className="space-y-1">
                            {results.example.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="bg-orange-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">✓</span>
                                <span className="text-gray-700 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
            
            <div className="text-center mt-6">
              <Link 
                href="/" 
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors duration-200 text-sm"
              >
                {UI_CONSTANTS.BUTTON_TEXT.NEXT_QUESTION}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Correction;