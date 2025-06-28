import { useState } from "react";
import { handleAPIError, logAPIError } from "@/lib/errors";
import type {
  CorrectionRequest,
  GrammarResponse,
  ScoringResponse,
  LogicalityResponse,
  ExampleResponse,
} from "@/types/api";

interface CorrectionResults {
  grammar: GrammarResponse | null;
  score: ScoringResponse | null;
  logicality: LogicalityResponse | null;
  example: ExampleResponse | null;
}

export const useCorrection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CorrectionResults>({
    grammar: null,
    score: null,
    logicality: null,
    example: null,
  });

  const submitCorrection = async (data: CorrectionRequest) => {
    setLoading(true);
    setError(null);
    setResults({
      grammar: null,
      score: null,
      logicality: null,
      example: null,
    });

    try {
      // Make all API calls in parallel for better performance
      const [grammarRes, scoreRes, logicalityRes, exampleRes] = await Promise.all([
        fetch("/api/correction/grammar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
        fetch("/api/correction/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
        fetch("/api/correction/logicality", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
        fetch("/api/correction/example", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
      ]);

      // Check for errors
      if (!grammarRes.ok) {
        const errorData = await grammarRes.json();
        throw new Error(errorData.error || "文法チェックに失敗しました");
      }
      if (!scoreRes.ok) {
        const errorData = await scoreRes.json();
        throw new Error(errorData.error || "採点に失敗しました");
      }
      if (!logicalityRes.ok) {
        const errorData = await logicalityRes.json();
        throw new Error(errorData.error || "論理性チェックに失敗しました");
      }
      if (!exampleRes.ok) {
        const errorData = await exampleRes.json();
        throw new Error(errorData.error || "模範解答生成に失敗しました");
      }

      // Parse all responses
      const [grammar, score, logicality, example] = await Promise.all([
        grammarRes.json(),
        scoreRes.json(),
        logicalityRes.json(),
        exampleRes.json(),
      ]);

      setResults({ grammar, score, logicality, example });
    } catch (err) {
      logAPIError("Correction Hook", err, { requestData: data });
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  return { submitCorrection, loading, error, results };
};