import OpenAI from "openai";
import { ERROR_MESSAGES, OPENAI_CONFIG } from "@/config/constants";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(ERROR_MESSAGES.OPENAI_API_KEY_MISSING);
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function schemas for OpenAI function calling
export const grammarCheckFunction = {
  name: "check_grammar",
  description: "英語の文法、表現、綴りをチェックする",
  parameters: {
    type: "object",
    properties: {
      corrections: {
        type: "array",
        items: {
          type: "object",
          properties: {
            original: { 
              type: "string", 
              description: "修正前の文章" 
            },
            corrected: { 
              type: "string", 
              description: "修正後の文章" 
            },
            reason: { 
              type: "string", 
              description: "修正理由" 
            },
            category: {
              type: "string",
              enum: ["grammar", "spelling", "expression"],
              description: "エラーの種類"
            },
          },
          required: ["original", "corrected", "reason", "category"]
        },
      },
      hasErrors: { 
        type: "boolean", 
        description: "エラーがあるかどうか" 
      },
    },
    required: ["corrections", "hasErrors"]
  },
};

export const scoringFunction = {
  name: "score_essay",
  description: "英作文を100点満点で採点する",
  parameters: {
    type: "object",
    properties: {
      score: { 
        type: "number", 
        minimum: 0, 
        maximum: 100,
        description: "総合スコア"
      },
      breakdown: {
        type: "object",
        properties: {
          grammar: { 
            type: "number", 
            minimum: 0, 
            maximum: 40,
            description: "文法・スペルの得点（40点満点）"
          },
          content: { 
            type: "number", 
            minimum: 0, 
            maximum: 40,
            description: "内容・論理性の得点（40点満点）"
          },
          structure: { 
            type: "number", 
            minimum: 0, 
            maximum: 20,
            description: "構成・まとまりの得点（20点満点）"
          },
        },
        required: ["grammar", "content", "structure"]
      },
      feedback: { 
        type: "string", 
        description: "総合的なフィードバック" 
      },
    },
    required: ["score", "breakdown", "feedback"]
  },
};

export const logicalityCheckFunction = {
  name: "check_logicality",
  description: "英作文の論理性と内容の一貫性をチェックする",
  parameters: {
    type: "object",
    properties: {
      isLogical: {
        type: "boolean",
        description: "論理的に一貫しているかどうか"
      },
      issues: {
        type: "array",
        items: {
          type: "string"
        },
        description: "論理的な問題点のリスト"
      },
      suggestions: {
        type: "array",
        items: {
          type: "string"
        },
        description: "改善提案のリスト"
      }
    },
    required: ["isLogical", "issues", "suggestions"]
  }
};

export const exampleGeneratorFunction = {
  name: "generate_example",
  description: "模範解答を生成する",
  parameters: {
    type: "object",
    properties: {
      example: {
        type: "string",
        description: "模範解答の英文"
      },
      wordCount: {
        type: "number",
        description: "単語数"
      },
      keyPoints: {
        type: "array",
        items: {
          type: "string"
        },
        description: "解答のポイント"
      }
    },
    required: ["example", "wordCount", "keyPoints"]
  }
};

export const questionGeneratorFunction = {
  name: "generate_questions",
  description: "指定された単語数範囲に厳密に従って英作文問題を生成する。範囲外の問題は絶対に返さない。",
  parameters: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "問題のユニークID"
            },
            question: {
              type: "string", 
              description: "英作文問題の内容。必ず指定された単語数範囲内で作成すること。"
            },
            questionWordCount: {
              type: "number",
              description: "問題文の実際の単語数。指定範囲内であることを保証する。",
              minimum: 8,
              maximum: 42
            },
            genre: {
              type: "string",
              description: "問題のジャンル"
            },
            level: {
              type: "string",
              description: "難易度レベル"
            },
            suggestedWordCount: {
              type: "string",
              description: "回答の推奨単語数"
            }
          },
          required: ["id", "question", "questionWordCount", "genre", "level", "suggestedWordCount"]
        },
        description: "生成された5つの問題のリスト。各問題の単語数が指定範囲内であることを厳密に確認済み。"
      }
    },
    required: ["questions"]
  }
};

// OpenAI API呼び出しのデフォルト設定
export const getDefaultChatCompletionParams = () => ({
  model: OPENAI_CONFIG.MODEL,
});