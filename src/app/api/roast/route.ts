import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT, userPromptFor } from "@/lib/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

type RoastResponse = { roast: string; vibe: string };

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Set OPENAI_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  let body: { image?: string; context?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { image, context } = body;
  if (!image || !image.startsWith("data:image/")) {
    return NextResponse.json(
      { error: "image (data URL) is required" },
      { status: 400 }
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.9,
      max_tokens: 400,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: userPromptFor(context) },
            { type: "image_url", image_url: { url: image, detail: "high" } },
          ],
        },
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    let parsed: RoastResponse;
    try {
      parsed = JSON.parse(text) as RoastResponse;
    } catch {
      return NextResponse.json(
        { error: "Model returned non-JSON output", raw: text },
        { status: 502 }
      );
    }

    if (!parsed.roast || !parsed.vibe) {
      return NextResponse.json(
        { error: "Model output missing fields", raw: parsed },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status =
      typeof err === "object" && err && "status" in err
        ? (err as { status?: number }).status ?? 500
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
