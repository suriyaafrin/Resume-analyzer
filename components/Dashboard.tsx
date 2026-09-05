"use client";

import { AnalysisResult } from "@/lib/analyze";
import ScoreGauge from "./ScoreGauge";
import SkillChip from "./SkillChip";
import PaperPreview from "./PaperPreview";

export default function Dashboard({ text, result }: { text: string; result: AnalysisResult }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <PaperPreview text={text} result={result} />

      <div className="space-y-6">
        <div className="flex items-center gap-6 rounded-sm border border-paper-100/10 bg-ink-900 px-6 py-5">
          <ScoreGauge score={result.score} />
          <div className="space-y-1.5 font-mono text-xs text-paper-100/60">
            <p>
              <span className="text-paper-100/85">{result.matched.length}</span> of{" "}
              {result.matched.length + result.missing.length} skills matched
            </p>
            <p>
              <span className="text-paper-100/85">{result.impactLines}</span> quantified results found
            </p>
            <p>
              <span className="text-paper-100/85">{result.actionVerbCount}</span> strong action verbs
            </p>
            <p>
              <span className="text-paper-100/85">{result.wordCount}</span> words
            </p>
          </div>
        </div>

        <div className="rounded-sm border border-paper-100/10 bg-ink-900 px-6 py-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-pen-green/80">
            Matched skills
          </h3>
          {result.matched.length ? (
            <div className="flex flex-wrap gap-2">
              {result.matched.map((m) => (
                <SkillChip key={m.skill} skill={m.skill} weight={m.weight} matched />
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-paper-100/40">No matches yet — try a different role.</p>
          )}
        </div>

        <div className="rounded-sm border border-paper-100/10 bg-ink-900 px-6 py-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-pen-red/80">
            Missing skills
          </h3>
          {result.missing.length ? (
            <div className="flex flex-wrap gap-2">
              {result.missing.map((m) => (
                <SkillChip key={m.skill} skill={m.skill} weight={m.weight} matched={false} />
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-paper-100/40">Every tracked skill is covered.</p>
          )}
        </div>

        <div className="rounded-sm border border-pen-amber/25 bg-pen-amber/[0.06] px-6 py-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-pen-amber/90">
            Editor&rsquo;s notes
          </h3>
          <ul className="space-y-2 font-serif text-[14px] leading-relaxed text-paper-100/80">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-pen-amber">—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
