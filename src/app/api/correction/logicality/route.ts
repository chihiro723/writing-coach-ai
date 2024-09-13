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
            {"role": "system", "content": "あなたは実用英語技能検定の英作文添削のプロ講師です。問題に対する回答に対して、英文の内容の論理性や説得力や表現などを評価してください。文法や単語ミスではなく、文の内容のみを評価して。また、回答内容が指定なしではないとき、回答に求められる単語数に対して適切かどうかも。日本語で。"},
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
