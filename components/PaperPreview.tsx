"use client";

import { useMemo } from "react";
import { AnalysisResult } from "@/lib/analyze";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlight(text: string, skills: string[]) {
  let safe = escapeHtml(text);
  const sorted = [...skills].sort((a, b) => b.length - a.length);
  for (const skill of sorted) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${escaped})`, "gi");
    safe = safe.replace(
      re,
      `<mark class="bg-transparent text-pen-green underline decoration-pen-green decoration-2 underline-offset-2">$1</mark>`
    );
  }
  return safe;
}

export default function PaperPreview({ text, result }: { text: string; result: AnalysisResult }) {
  const html = useMemo(
    () => highlight(text, result.matched.map((m) => m.skill)),
    [text, result]
  );

  return (
    <div className="torn-edge paper-shadow relative rounded-sm bg-paper-50 px-7 pb-8 pt-10 text-ink-950">
      <div className="absolute -top-3 right-6 rotate-[-6deg] rounded-sm border-2 border-pen-red px-3 py-1 font-mono text-xs font-semibold text-pen-red">
        {result.score}/100
      </div>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-ink-950/40">
        Reviewed for — {result.role.label}
      </p>
      <div
        className="max-h-[420px] overflow-y-auto whitespace-pre-wrap font-serif text-[14.5px] leading-relaxed text-ink-950/85"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
