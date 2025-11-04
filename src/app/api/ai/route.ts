import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, key } = await req.json();
    const r = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });
    const data = await r.json();
    const text = data?.[0]?.generated_text || "Inget svar från AI.";
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ text: "Fel vid AI-förfrågan." }, { status: 500 });
  }
}
