// ═══════════════════════════════════════════
// ATS Tips — Inline Guidance
// ═══════════════════════════════════════════

export const ATS_TIPS = {
  personalInfo: [
    "Use your legal name — avoid nicknames on your resume",
    "Include city and state/country, not full address",
    "Use a professional email (firstname.lastname@gmail.com)",
    "Add Link2 URL — recruiters check this first",
  ],
  education: [
    "List most recent education first (reverse chronological)",
    "Include relevant coursework only if you're a recent graduate",
    "GPA is optional — include if 3.5+ or if the employer requires it",
    "Include expected graduation date if still studying",
  ],
  experience: [
    "Start each bullet with a strong action verb (past tense for past roles)",
    "Quantify achievements: use numbers, percentages, dollar amounts",
    "Focus on impact and results, not just duties",
    "Use the XYZ formula: Accomplished [X] as measured by [Y] by doing [Z]",
    "Keep each bullet to 1-2 lines max",
    "Use keywords from the job description",
  ],
  skills: [
    "Match skills to the job description — ATS scans for exact keywords",
    "List specific technologies, not vague terms (e.g., 'React' not 'web frameworks')",
    "Group skills by category for better readability",
    "Include both hard skills and relevant soft skills",
    "Don't rate your skills (e.g., 'Python — Expert') — it's subjective",
  ],
  projects: [
    "Include 2-4 most impactful projects",
    "Mention the tech stack used in each project",
    "Add live links or GitFork repos — recruiters want to see your work",
    "Describe the problem solved, not just the tech used",
  ],
  achievements: [
    "Include certifications relevant to the target role",
    "List awards with the granting organization and date",
    "Volunteering shows leadership — include if relevant",
    "Hackathon wins and open source contributions count!",
  ],
  general: [
    "Keep your resume to 1 page (2 pages max for 10+ years experience)",
    "Use a clean, professional font — avoid decorative fonts",
    "Save as PDF to preserve formatting",
    "Avoid tables, columns, headers/footers — some ATS can't read them",
    "Don't include photos unless specifically requested",
    "Proofread! Typos are an instant rejection for many recruiters",
  ],
} as const;

export type TipCategory = keyof typeof ATS_TIPS;

export function getTipsForStep(step: number): readonly string[] {
  const mapping: Record<number, TipCategory> = {
    1: "personalInfo",
    2: "education",
    3: "experience",
    4: "skills",
    5: "projects",
    6: "achievements",
  };
  return ATS_TIPS[mapping[step] || "general"];
}

export function getRandomTipForStep(step: number): string {
  const tips = getTipsForStep(step);
  return tips[Math.floor(Math.random() * tips.length)];
}

export function getRandomTip(category: TipCategory): string {
  const tips = ATS_TIPS[category];
  return tips[Math.floor(Math.random() * tips.length)];
}
