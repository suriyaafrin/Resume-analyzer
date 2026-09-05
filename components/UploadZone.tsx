"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, UploadCloud } from "lucide-react";

type Props = {
  text: string;
  onTextChange: (text: string) => void;
  fileName: string | null;
  onFileName: (name: string | null) => void;
};

export default function UploadZone({ text, onTextChange, fileName, onFileName }: Props) {
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const extractPdf = useCallback(async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      let full = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        full += content.items.map((it: any) => ("str" in it ? it.str : "")).join(" ") + "\n";
      }
      if (full.trim().length < 20) {
        setError("Couldn't read text from that PDF — try pasting the text instead.");
      } else {
        onTextChange(full.trim());
        onFileName(file.name);
      }
    } catch (e) {
      setError("Couldn't parse that PDF — try pasting the resume text instead.");
    } finally {
      setBusy(false);
    }
  }, [onTextChange, onFileName]);

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        await extractPdf(file);
      } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const content = await file.text();
        onTextChange(content);
        onFileName(file.name);
        setError(null);
      } else {
        setError("Upload a .pdf or .txt file, or paste your resume text below.");
      }
    },
    [extractPdf, onTextChange, onFileName]
  );

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`torn-edge cursor-pointer rounded-t-sm border border-b-0 border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-pen-amber bg-pen-amber/5"
            : "border-paper-100/20 hover:border-paper-100/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {fileName ? (
          <div className="flex flex-col items-center gap-2 text-paper-100/80">
            <FileText size={26} />
            <span className="font-mono text-sm">{fileName}</span>
            <span className="text-xs text-paper-100/40">Click to replace</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-paper-100/50">
            <UploadCloud size={26} />
            <p className="font-mono text-sm">
              {busy ? "Reading PDF…" : "Drop your CV here — .pdf or .txt"}
            </p>
            <span className="text-xs text-paper-100/35">or click to browse</span>
          </div>
        )}
      </div>

      {error && <p className="font-mono text-xs text-pen-red">{error}</p>}

      <textarea
        value={text}
        onChange={(e) => {
          onTextChange(e.target.value);
          if (fileName) onFileName(null);
        }}
        placeholder="…or paste your resume text here"
        rows={6}
        className="w-full resize-none rounded-sm border border-paper-100/15 bg-ink-900 px-4 py-3 font-sans text-sm text-paper-100/85 placeholder:text-paper-100/30 focus:border-pen-amber/60 focus:outline-none"
      />
    </div>
  );
}
