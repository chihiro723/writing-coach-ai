import { useState, useCallback } from "react";
import { handleAPIError, logAPIError } from "@/lib/errors";
import type { GenerationRequest, GeneratedQuestion } from "@/types/api";

export const useGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);

  const generateQuestions = useCallback(async (data: GenerationRequest) => {
    setLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const response = await fetch("/api/generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "問題生成に失敗しました");
      }

      const result = await response.json();
      setQuestions(result.questions || []);
      setError(null);
    } catch (err) {
      logAPIError("Generation Hook", err, { requestData: data });
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetQuestions = () => {
    setQuestions([]);
    setError(null);
  };

  return {
    generateQuestions,
    resetQuestions,
    loading,
    error,
    questions,
  };
};