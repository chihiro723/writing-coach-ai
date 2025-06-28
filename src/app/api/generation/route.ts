import { NextResponse } from "next/server";
import { openai, questionGeneratorFunction, getDefaultChatCompletionParams } from "@/lib/openai";
import { APIError, createAPIError, logAPIError } from "@/lib/errors";
import { ERROR_MESSAGES, SYSTEM_PROMPTS, USER_PROMPT_TEMPLATES } from "@/config/constants";
import type { GenerationRequest, GenerationResponse } from "@/types/api";

export async function POST(req: Request) {
  let genre: string | undefined;
  let level: string | undefined;
  let wordCount: string | undefined;

  try {
    const body: GenerationRequest = await req.json();
    ({ genre, level, wordCount } = body);

    if (!genre || !level || !wordCount) {
      throw createAPIError(400, ERROR_MESSAGES.GENERATION_PARAMS_REQUIRED);
    }

    const response = await openai.chat.completions.create({
      ...getDefaultChatCompletionParams(),
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.QUESTION_GENERATION
        },
        {
          role: "user",
          content: USER_PROMPT_TEMPLATES.QUESTION_GENERATION(genre, level, wordCount)
        }
      ],
      functions: [questionGeneratorFunction],
      function_call: { name: "generate_questions" },
    });

    const functionCall = response.choices[0].message.function_call;
    if (!functionCall || !functionCall.arguments) {
      throw createAPIError(500, ERROR_MESSAGES.OPENAI_RESPONSE_INVALID);
    }

    const result: GenerationResponse = JSON.parse(functionCall.arguments);
    
    // Add genre, level, and wordCount to each question
    result.questions = result.questions.map((q, index) => ({
      ...q,
      id: q.id || `q-${Date.now()}-${index}`,
      genre: q.genre || genre!,
      level: q.level || level!,
      suggestedWordCount: q.suggestedWordCount || wordCount!,
    }));
    
    return NextResponse.json(result);
  } catch (error: unknown) {
    logAPIError("Question Generation", error, { genre, level, wordCount });
    
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: ERROR_MESSAGES.QUESTION_GENERATION_FAILED },
      { status: 500 }
    );
  }
}