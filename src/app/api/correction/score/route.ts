import { NextResponse } from "next/server";
import { openai, scoringFunction, getDefaultChatCompletionParams } from "@/lib/openai";
import { APIError, createAPIError, logAPIError } from "@/lib/errors";
import { ERROR_MESSAGES, SYSTEM_PROMPTS, USER_PROMPT_TEMPLATES } from "@/config/constants";
import type { CorrectionRequest, ScoringResponse } from "@/types/api";

export async function POST(req: Request) {
  let question: string | undefined;
  let answer: string | undefined;
  let wordCount: string | undefined;

  try {
    const body: CorrectionRequest = await req.json();
    ({ question, answer, wordCount } = body);

    if (!question || !answer) {
      throw createAPIError(400, ERROR_MESSAGES.QUESTION_ANSWER_REQUIRED);
    }

    const response = await openai.chat.completions.create({
      ...getDefaultChatCompletionParams(),
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.SCORING
        },
        {
          role: "user",
          content: USER_PROMPT_TEMPLATES.SCORING(question, answer, wordCount)
        }
      ],
      functions: [scoringFunction],
      function_call: { name: "score_essay" },
    });

    const functionCall = response.choices[0].message.function_call;
    if (!functionCall || !functionCall.arguments) {
      throw createAPIError(500, ERROR_MESSAGES.OPENAI_RESPONSE_INVALID);
    }

    const result: ScoringResponse = JSON.parse(functionCall.arguments);
    
    return NextResponse.json(result);
  } catch (error: unknown) {
    logAPIError("Scoring", error, { question, answer, wordCount });
    
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: ERROR_MESSAGES.SCORING_FAILED },
      { status: 500 }
    );
  }
}