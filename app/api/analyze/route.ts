import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/analyze";

export async function POST(req: NextRequest) {
  try {
    const { text, roleId } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Resume text is too short to analyze." },
        { status: 400 },
      );
    }

    // Simulated model latency — swap this block for a real FastAPI /analyze call:
    // const res = await fetch(`${process.env.BACKEND_URL}/analyze`, { method: "POST", ... });
    const res = await fetch(
      `${process.env.BACKEND_URL ?? "http://localhost:8000"}/analyze`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, role_id: roleId ?? "frontend" }),
      },
    );
    const result = await res.json();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Analysis failed." }, { status: 500 });
  }
}
