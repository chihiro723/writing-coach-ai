import { NextResponse } from "next/server";
import { openai, exampleGeneratorFunction, getDefaultChatCompletionParams } from "@/lib/openai";
import { APIError, createAPIError, logAPIError } from "@/lib/errors";
import { ERROR_MESSAGES, SYSTEM_PROMPTS, USER_PROMPT_TEMPLATES } from "@/config/constants";
import type { CorrectionRequest, ExampleResponse } from "@/types/api";

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
          content: SYSTEM_PROMPTS.EXAMPLE_GENERATION
        },
        {
          role: "user",
          content: USER_PROMPT_TEMPLATES.EXAMPLE_GENERATION(question, answer, wordCount)
        }
      ],
      functions: [exampleGeneratorFunction],
      function_call: { name: "generate_example" },
    });

    const functionCall = response.choices[0].message.function_call;
    if (!functionCall || !functionCall.arguments) {
      throw createAPIError(500, ERROR_MESSAGES.OPENAI_RESPONSE_INVALID);
    }

    const result: ExampleResponse = JSON.parse(functionCall.arguments);
    
    return NextResponse.json(result);
  } catch (error: unknown) {
    logAPIError("Example Generation", error, { question, answer, wordCount });
    
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: ERROR_MESSAGES.EXAMPLE_GENERATION_FAILED },
      { status: 500 }
    );
  }
}