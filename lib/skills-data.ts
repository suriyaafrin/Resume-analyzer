export type Role = {
  id: string;
  label: string;
  // Weighted skill list: [skill, weight 1-3]
  skills: [string, number][];
  // Phrases that indicate quantifiable impact, checked separately
};

export const ROLES: Role[] = [
  {
    id: "frontend",
    label: "Frontend Developer",
    skills: [
      ["javascript", 3], ["typescript", 3], ["react", 3], ["next.js", 3],
      ["tailwind", 2], ["css", 2], ["html", 2], ["redux", 1], ["zustand", 1],
      ["rest api", 2], ["git", 2], ["testing", 1], ["jest", 1], ["figma", 1],
      ["accessibility", 1], ["webpack", 1], ["vite", 1], ["responsive design", 2],
    ],
  },
  {
    id: "backend",
    label: "Backend Developer",
    skills: [
      ["node.js", 3], ["python", 3], ["fastapi", 2], ["django", 2], ["express", 2],
      ["sql", 3], ["postgresql", 2], ["mongodb", 2], ["rest api", 3], ["docker", 2],
      ["kubernetes", 1], ["redis", 1], ["microservices", 1], ["git", 2],
      ["authentication", 2], ["testing", 1], ["ci/cd", 1],
    ],
  },
  {
    id: "fullstack",
    label: "Full Stack Developer",
    skills: [
      ["javascript", 3], ["typescript", 2], ["react", 3], ["node.js", 3],
      ["next.js", 2], ["sql", 2], ["mongodb", 1], ["rest api", 3], ["docker", 1],
      ["git", 2], ["tailwind", 1], ["testing", 1], ["ci/cd", 1], ["aws", 1],
    ],
  },
  {
    id: "data",
    label: "Data Scientist / ML",
    skills: [
      ["python", 3], ["pandas", 2], ["numpy", 2], ["scikit-learn", 2],
      ["tensorflow", 2], ["pytorch", 2], ["sql", 2], ["machine learning", 3],
      ["deep learning", 2], ["statistics", 2], ["data visualization", 2],
      ["nlp", 1], ["computer vision", 1], ["git", 1], ["jupyter", 1],
    ],
  },
  {
    id: "uiux",
    label: "UI/UX Designer",
    skills: [
      ["figma", 3], ["wireframing", 2], ["prototyping", 2], ["user research", 3],
      ["design systems", 2], ["accessibility", 2], ["adobe xd", 1], ["usability testing", 2],
      ["typography", 1], ["interaction design", 2], ["information architecture", 1],
    ],
  },
  {
    id: "devops",
    label: "DevOps Engineer",
    skills: [
      ["docker", 3], ["kubernetes", 3], ["ci/cd", 3], ["aws", 2], ["azure", 1],
      ["terraform", 2], ["linux", 2], ["bash", 1], ["monitoring", 1],
      ["git", 1], ["ansible", 1], ["nginx", 1],
    ],
  },
];

export const IMPACT_PATTERNS: RegExp[] = [
  /\b\d+%/,
  /\b\d+x\b/i,
  /\$\s?\d/,
  /\b\d{2,}\s?(users|customers|requests|downloads|records|projects|members|students)\b/i,
];

export const ACTION_VERBS = [
  "built", "led", "designed", "developed", "launched", "improved", "optimized",
  "reduced", "increased", "created", "implemented", "architected", "shipped",
  "automated", "migrated", "mentored",
];
