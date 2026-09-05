"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/analyze";
import UploadZone from "@/components/UploadZone";
import RoleSelect from "@/components/RoleSelect";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [roleId, setRoleId] = useState("frontend");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setError(null);
    if (text.trim().length < 20) {
      setError("Add a bit more resume text before analyzing — a few sentences at least.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, roleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed.");
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-14 flex items-baseline justify-between border-b border-paper-100/10 pb-6">
        <div>
          <h1 className="font-serif text-2xl italic text-paper-50">Margin</h1>
          <p className="mt-1 font-mono text-[11px] tracking-wide text-paper-100/40">
            resume analyzer — marked up like an editor read it
          </p>
        </div>
        <p className="hidden font-mono text-[11px] text-paper-100/30 sm:block">
          Dhaka · built with Next.js
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-2 font-serif text-3xl leading-snug text-paper-50">
          Upload a CV. Get it graded like a job posting will read it.
        </h2>
        <p className="mb-8 max-w-xl text-sm text-paper-100/55">
          Drop in a resume, pick the role you&rsquo;re aiming for, and see what an ATS-style pass
          would flag — matched skills, gaps, and where the writing needs sharper edges.
        </p>

        <div className="mb-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-paper-100/40">
            Target role
          </p>
          <RoleSelect value={roleId} onChange={setRoleId} />
        </div>

        <UploadZone
          text={text}
          onTextChange={setText}
          fileName={fileName}
          onFileName={setFileName}
        />

        {error && <p className="mt-3 font-mono text-xs text-pen-red">{error}</p>}

        <button
          onClick={analyze}
          disabled={loading}
          className="mt-5 rounded-sm border border-pen-amber bg-pen-amber/10 px-5 py-2.5 font-mono text-sm text-pen-amber transition-colors hover:bg-pen-amber/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Reading resume…" : "Analyze resume"}
        </button>
      </section>

      {result && (
        <section>
          <h3 className="mb-5 font-mono text-[11px] uppercase tracking-wide text-paper-100/40">
            Result
          </h3>
          <Dashboard text={text} result={result} />
        </section>
      )}

      <footer className="mt-20 border-t border-paper-100/10 pt-6 font-mono text-[10.5px] text-paper-100/25">
        Next.js UI → API route (stand-in for FastAPI) → scoring model → dashboard
      </footer>
    </main>
  );
}
