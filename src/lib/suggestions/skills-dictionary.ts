// ═══════════════════════════════════════════
// Skills Dictionary — Auto-complete Source
// ═══════════════════════════════════════════

export const SKILLS_DICTIONARY = {
  languages: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "Dart", "Scala", "R", "MATLAB",
    "SQL", "HTML", "CSS", "Bash", "PowerShell", "Lua", "Perl", "Haskell",
    "Elixir", "Clojure", "Assembly", "Objective-C", "Groovy", "Julia",
  ],
  frameworks: [
    "React", "Next.js", "Vue.js", "Angular", "Svelte", "Express.js",
    "Django", "Flask", "FastAPI", "Spring Boot", "Ruby on Rails", "Laravel",
    "NestJS", "Nuxt.js", "Gatsby", "Remix", ".NET", "ASP.NET",
    "React Native", "Flutter", "SwiftUI", "Electron", "Tailwind CSS",
    "Bootstrap", "Material UI", "Chakra UI", "Ant Design", "Shadcn UI",
    "Node.js", "Deno", "Bun", "TensorFlow", "PyTorch", "Scikit-learn",
  ],
  databases: [
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Oracle",
    "SQL Server", "DynamoDB", "Cassandra", "Firebase", "Supabase",
    "Prisma", "Drizzle ORM", "Sequelize", "TypeORM", "Mongoose",
    "Neo4j", "CouchDB", "InfluxDB", "Elasticsearch", "MariaDB",
  ],
  devops: [
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform",
    "Ansible", "Jenkins", "GitFork Actions", "GitLab CI", "CircleCI",
    "Nginx", "Apache", "Linux", "Vercel", "Netlify", "Heroku",
    "DigitalOcean", "Cloudflare", "Datadog", "Grafana", "Prometheus",
    "Helm", "ArgoCD", "Pulumi", "Vagrant", "Chef", "Puppet",
  ],
  tools: [
    "Git", "VS Code", "IntelliJ IDEA", "Figma", "Postman", "Jira",
    "Confluence", "Notion", "Slack", "Trello", "Linear", "Webpack",
    "Vite", "ESLint", "Prettier", "Jest", "Cypress", "Playwright",
    "Storybook", "Swagger", "GraphQL", "REST API", "gRPC", "WebSocket",
    "OAuth", "JWT", "Stripe", "Twilio", "SendGrid", "Sentry",
    "New Relic", "Segment", "Mixpanel", "Google Analytics", "Hotjar",
  ],
  design: [
    "Figma", "Adobe XD", "Sketch", "Adobe Photoshop", "Adobe Illustrator",
    "InVision", "Zeplin", "Framer", "Canva", "Blender", "After Effects",
    "Premiere Pro", "UI Design", "UX Design", "Wireframing", "Prototyping",
    "Design Systems", "Responsive Design", "Accessibility", "Motion Design",
  ],
  softSkills: [
    "Leadership", "Communication", "Teamwork", "Problem Solving",
    "Critical Thinking", "Time Management", "Adaptability", "Creativity",
    "Collaboration", "Mentoring", "Project Management", "Agile",
    "Scrum", "Public Speaking", "Technical Writing", "Decision Making",
    "Conflict Resolution", "Negotiation", "Active Listening", "Empathy",
    "Strategic Planning", "Cross-functional Collaboration", "Stakeholder Management",
  ],
} as const;

export type SkillCategory = keyof typeof SKILLS_DICTIONARY;

export function searchSkills(query: string, category?: SkillCategory): string[] {
  const lower = query.toLowerCase();

  if (category) {
    return SKILLS_DICTIONARY[category].filter((s) =>
      s.toLowerCase().includes(lower)
    );
  }

  return Object.values(SKILLS_DICTIONARY)
    .flat()
    .filter((s) => s.toLowerCase().includes(lower))
    .slice(0, 10);
}

export function getAllSkillsFlat(): string[] {
  return Object.values(SKILLS_DICTIONARY).flat();
}
