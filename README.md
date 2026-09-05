# Margin — AI Resume Analyzer

Upload a CV, pick a target role, and get it scored like an editor marked it up:
matched skills, missing skills, and notes on writing quality.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- `lucide-react` for icons
- `pdfjs-dist` for client-side PDF text extraction
- A Next.js API route (`app/api/analyze/route.ts`) stands in for the FastAPI
  backend shown in the brief — it runs the same scoring logic server-side
  so it's a real request/response round trip, not a fake loading spinner.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000, drop in a `.pdf` or `.txt` resume (or paste text),
choose a target role, and click **Analyze resume**.

## Swapping in a real AI backend

`app/api/analyze/route.ts` currently calls `analyzeResume()` from
`lib/analyze.ts` — a deterministic, keyword + heuristic scorer (skill
matching, quantified-impact detection, action-verb count, length check).
No API key required, works offline.

A scaffold FastAPI service that mirrors the same request/response shape
lives in `backend/`:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

To point the frontend at it (and eventually a real LLM call inside
`backend/main.py`), replace the body of the POST handler in
`app/api/analyze/route.ts` with a `fetch` to
`http://localhost:8000/analyze`.

## Project structure

```
app/
  page.tsx              — upload + role select + trigger analysis
  api/analyze/route.ts   — scoring endpoint (Next.js stand-in for FastAPI)
  layout.tsx, globals.css
components/
  UploadZone.tsx         — drag/drop, PDF text extraction, paste fallback
  RoleSelect.tsx          — target role picker
  Dashboard.tsx            — score + skills + editor's notes layout
  ScoreGauge.tsx            — animated circular score
  SkillChip.tsx              — matched / missing skill tag
  PaperPreview.tsx            — resume rendered as an annotated page
lib/
  skills-data.ts               — per-role weighted skill dictionaries
  analyze.ts                     — scoring logic
backend/
  main.py                          — optional FastAPI scaffold
```
