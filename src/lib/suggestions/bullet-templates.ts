// ═══════════════════════════════════════════
// Bullet Point Templates by Role
// ═══════════════════════════════════════════

export const BULLET_TEMPLATES = {
  "Software Engineer": [
    "Developed and maintained [feature/system] using [tech stack], resulting in [metric/outcome]",
    "Reduced [metric] by [X]% through [optimization/refactoring] of [system/module]",
    "Architected [system/service] handling [X] requests/day with [X]% uptime",
    "Led migration from [old tech] to [new tech], improving [performance metric] by [X]%",
    "Implemented CI/CD pipeline reducing deployment time from [X] to [Y]",
    "Built RESTful APIs serving [X] daily active users with <[X]ms response time",
    "Collaborated with [X]-person team to deliver [project] [X] weeks ahead of schedule",
    "Wrote [X]+ unit/integration tests achieving [X]% code coverage",
  ],
  "Frontend Developer": [
    "Built responsive web application using [React/Vue/Angular] serving [X]+ users",
    "Improved Core Web Vitals — LCP reduced by [X]%, CLS improved to <0.1",
    "Implemented design system with [X]+ reusable components reducing development time by [X]%",
    "Optimized bundle size by [X]% through code splitting and lazy loading",
    "Developed pixel-perfect UI from Figma designs with cross-browser compatibility",
    "Integrated [API/service] with error handling and optimistic UI updates",
  ],
  "Backend Developer": [
    "Designed and implemented microservices architecture serving [X]M+ requests/month",
    "Optimized database queries reducing average response time from [X]ms to [Y]ms",
    "Built authentication system supporting OAuth, JWT, and MFA for [X]+ users",
    "Implemented caching strategy using [Redis/Memcached] reducing DB load by [X]%",
    "Created data pipeline processing [X]GB of data daily with [X]% accuracy",
    "Designed RESTful/GraphQL API with comprehensive documentation and versioning",
  ],
  "Data Scientist": [
    "Developed ML model achieving [X]% accuracy for [prediction/classification] task",
    "Analyzed [X]M+ data points revealing [insight], leading to [business outcome]",
    "Built data pipeline automating [process], saving [X] hours/week of manual work",
    "Created interactive dashboards in [Tableau/Power BI] used by [X]+ stakeholders",
    "Implemented A/B testing framework increasing [conversion/metric] by [X]%",
  ],
  "Product Manager": [
    "Defined product roadmap for [product] resulting in [X]% increase in [metric]",
    "Led cross-functional team of [X] to launch [feature/product] serving [X]+ users",
    "Conducted [X]+ user interviews identifying key pain points, informing [X] product decisions",
    "Increased user retention by [X]% through data-driven feature prioritization",
    "Managed product backlog of [X]+ items, maintaining sprint velocity of [X] story points",
  ],
  "Designer": [
    "Designed user interface for [product] used by [X]+ users with [X]% satisfaction score",
    "Created comprehensive design system with [X]+ components, improving design consistency",
    "Conducted usability testing with [X]+ participants, improving task completion rate by [X]%",
    "Redesigned [flow/feature] reducing user drop-off by [X]%",
    "Produced [X]+ high-fidelity prototypes for stakeholder review and developer handoff",
  ],
  "Marketing": [
    "Executed digital marketing campaigns generating [X]+ leads with [X]% conversion rate",
    "Grew social media following by [X]% through data-driven content strategy",
    "Managed $[X] advertising budget across [platforms], achieving [X]x ROAS",
    "Increased organic traffic by [X]% through SEO optimization and content strategy",
    "Launched email campaigns with [X]% open rate and [X]% click-through rate",
  ],
  "General": [
    "Led [initiative/project] resulting in [quantifiable outcome]",
    "Collaborated with [team/department] to achieve [goal]",
    "Streamlined [process] reducing [time/cost/effort] by [X]%",
    "Trained and mentored [X] team members on [skill/tool/process]",
    "Presented [findings/proposal] to [audience], securing [approval/funding]",
    "Identified and resolved [issue], preventing [negative outcome]",
    "Managed [X] concurrent projects with a [X]% on-time delivery rate",
  ],
} as const;

export type RoleType = keyof typeof BULLET_TEMPLATES;

export function getTemplatesForRole(role: RoleType): readonly string[] {
  return BULLET_TEMPLATES[role];
}

export function getAllRoles(): RoleType[] {
  return Object.keys(BULLET_TEMPLATES) as RoleType[];
}
