import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const optionsString = url.searchParams.get("options")
  console.log(optionsString)
    try {
        const response = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": '英語で返答してください'},
            {"role": "user", "content": `英作文問題を5問生成して、フォーマットは配列で、問題の文章のみを格納し、また[]の中身だけ生成して。問題の内容については、次の条件を取り入れること。${optionsString}`}
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
