import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function GET(req: Request) {
    const url = new URL(req.url);
    const question = url.searchParams.get('question') || '';
    const answer = url.searchParams.get('answer') || '';
    const wordCount = url.searchParams.get('wordCount') || '';
    try {
        const response = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "あなたは実用英語技能検定の英作文添削のプロ講師です。問題とその問題に対する回答内容、回答に求められる単語数を踏まえた上で、模範解答を作成してください。難しい表現や語彙はあまり使わないようにし、英文のみを返してください。"},
            {"role": "user", "content": `問題:${question} 回答に求められる単語数:${wordCount} 回答内容:${answer}`}
          ],
        model: "gpt-4o-mini",
        });
        if (!response.choices || response.choices.length === 0) {
            return NextResponse.json(
              { error: "No response from OpenAI." },
              { status: 500 }
            );
        }
        return NextResponse.json(response.choices[0].message.content);
    } catch(error: unknown) {
        console.error("Error during OpenAI API call:", error);

        return NextResponse.json(
          { error: "Failed to process the request." },
          { status: 500 }
        );
    }
}
