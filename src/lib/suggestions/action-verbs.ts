// ═══════════════════════════════════════════
// Action Verbs — Categorized for Resume Bullets
// ═══════════════════════════════════════════

export const ACTION_VERBS = {
  leadership: [
    "Spearheaded", "Orchestrated", "Pioneered", "Championed", "Directed",
    "Oversaw", "Mentored", "Delegated", "Supervised", "Led",
    "Coordinated", "Managed", "Facilitated", "Guided", "Inspired",
    "Mobilized", "Steered", "Empowered", "Cultivated", "Established",
  ],
  technical: [
    "Engineered", "Architected", "Developed", "Implemented", "Automated",
    "Optimized", "Debugged", "Refactored", "Integrated", "Deployed",
    "Built", "Designed", "Programmed", "Configured", "Migrated",
    "Scaled", "Containerized", "Modularized", "Prototyped", "Benchmarked",
  ],
  analytical: [
    "Analyzed", "Assessed", "Evaluated", "Researched", "Investigated",
    "Identified", "Quantified", "Measured", "Diagnosed", "Forecasted",
    "Mapped", "Surveyed", "Audited", "Examined", "Interpreted",
    "Calculated", "Validated", "Modeled", "Synthesized", "Profiled",
  ],
  communication: [
    "Presented", "Published", "Documented", "Communicated", "Briefed",
    "Reported", "Articulated", "Authored", "Collaborated", "Negotiated",
    "Advocated", "Pitched", "Persuaded", "Translated", "Clarified",
    "Conveyed", "Drafted", "Edited", "Illustrated", "Mediated",
  ],
  creative: [
    "Designed", "Created", "Conceptualized", "Innovated", "Crafted",
    "Transformed", "Revamped", "Reimagined", "Visualized", "Curated",
    "Shaped", "Fashioned", "Composed", "Devised", "Formulated",
    "Invented", "Launched", "Originated", "Produced", "Redesigned",
  ],
  achievement: [
    "Achieved", "Exceeded", "Surpassed", "Boosted", "Increased",
    "Reduced", "Improved", "Delivered", "Accelerated", "Generated",
    "Maximized", "Minimized", "Strengthened", "Elevated", "Advanced",
    "Doubled", "Tripled", "Streamlined", "Saved", "Expanded",
  ],
  organizational: [
    "Organized", "Structured", "Systematized", "Standardized", "Consolidated",
    "Prioritized", "Scheduled", "Planned", "Budgeted", "Allocated",
    "Cataloged", "Centralized", "Classified", "Compiled", "Maintained",
    "Monitored", "Processed", "Recorded", "Tracked", "Updated",
  ],
} as const;

export type VerbCategory = keyof typeof ACTION_VERBS;

export function getRandomVerbs(category: VerbCategory, count: number = 5): string[] {
  const verbs = [...ACTION_VERBS[category]];
  const shuffled = verbs.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getAllVerbs(): string[] {
  return Object.values(ACTION_VERBS).flat();
}

export function searchVerbs(query: string): string[] {
  const all = getAllVerbs();
  const lower = query.toLowerCase();
  return all.filter((v) => v.toLowerCase().startsWith(lower));
}
