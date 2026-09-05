import { ROLES, IMPACT_PATTERNS, ACTION_VERBS, Role } from "./skills-data";

export type AnalysisResult = {
  score: number;
  matched: { skill: string; weight: number }[];
  missing: { skill: string; weight: number }[];
  wordCount: number;
  impactLines: number;
  actionVerbCount: number;
  suggestions: string[];
  role: Role;
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9%.\s+#]/g, " ");
}

export function analyzeResume(rawText: string, roleId: string): AnalysisResult {
  const role = ROLES.find((r) => r.id === roleId) ?? ROLES[0];
  const text = normalize(rawText);

  const matched: { skill: string; weight: number }[] = [];
  const missing: { skill: string; weight: number }[] = [];

  for (const [skill, weight] of role.skills) {
    const needle = skill.toLowerCase();
    if (text.includes(needle)) {
      matched.push({ skill, weight });
    } else {
      missing.push({ skill, weight });
    }
  }

  const totalWeight = role.skills.reduce((s, [, w]) => s + w, 0);
  const matchedWeight = matched.reduce((s, m) => s + m.weight, 0);
  const skillScore = totalWeight > 0 ? matchedWeight / totalWeight : 0;

  const impactLines = IMPACT_PATTERNS.reduce(
    (count, pattern) => count + (text.match(new RegExp(pattern, "g"))?.length ?? 0),
    0
  );
  const impactScore = Math.min(impactLines / 4, 1);

  const actionVerbCount = ACTION_VERBS.filter((v) => text.includes(v)).length;
  const verbScore = Math.min(actionVerbCount / 6, 1);

  const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
  const lengthScore =
    wordCount < 120 ? wordCount / 120 : wordCount > 900 ? Math.max(0.6, 1 - (wordCount - 900) / 1200) : 1;

  const score = Math.round(
    (skillScore * 0.6 + impactScore * 0.2 + verbScore * 0.1 + lengthScore * 0.1) * 100
  );

  const suggestions: string[] = [];
  if (missing.length > 0) {
    const top = [...missing].sort((a, b) => b.weight - a.weight).slice(0, 3);
    suggestions.push(
      `Add concrete examples of ${top.map((m) => m.skill).join(", ")} — these carry the most weight for ${role.label}.`
    );
  }
  if (impactLines < 3) {
    suggestions.push("Quantify results with numbers or percentages (e.g. \"cut load time by 40%\").");
  }
  if (actionVerbCount < 4) {
    suggestions.push("Open bullet points with strong action verbs — built, led, shipped, optimized.");
  }
  if (wordCount < 120) {
    suggestions.push("Your resume reads thin — add detail on your most relevant projects.");
  } else if (wordCount > 900) {
    suggestions.push("Your resume runs long — trim to the most relevant one or two pages.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Solid match — fine-tune wording to mirror the exact job posting's language.");
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    matched: matched.sort((a, b) => b.weight - a.weight),
    missing: missing.sort((a, b) => b.weight - a.weight),
    wordCount,
    impactLines,
    actionVerbCount,
    suggestions,
    role,
  };
}
