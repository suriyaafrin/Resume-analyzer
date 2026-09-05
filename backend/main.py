"""
Optional real backend — a drop-in replacement for the mocked /api/analyze
route in the Next.js app. Swap the fetch() call inside
app/api/analyze/route.ts to point here (http://localhost:8000/analyze)
once you plug in a real LLM call.

Run:
    pip install fastapi uvicorn python-multipart
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    text: str
    role_id: str = "frontend"


@app.post("/analyze")
def analyze(payload: AnalyzeRequest):
    # Replace this with a real call out to an LLM / your scoring model.
    # The Next.js frontend already implements this exact scoring logic
    # client-side in lib/analyze.ts, so both stay in sync.
    return {
        "score": 0,
        "matched": [],
        "missing": [],
        "wordCount": len(payload.text.split()),
        "impactLines": 0,
        "actionVerbCount": 0,
        "suggestions": ["Wire this endpoint up to your model."],
    }
