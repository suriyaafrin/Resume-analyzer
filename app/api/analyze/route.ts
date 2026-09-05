import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/analyze";

export async function POST(req: NextRequest) {
  try {
    const { text, roleId } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Resume text is too short to analyze." },
        { status: 400 }
      );
    }

    // Simulated model latency — swap this block for a real FastAPI /analyze call:
    // const res = await fetch(`${process.env.BACKEND_URL}/analyze`, { method: "POST", ... });
    await new Promise((r) => setTimeout(r, 900));

    const result = analyzeResume(text, roleId ?? "frontend");
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Analysis failed." }, { status: 500 });
  }
}
