import { z } from "zod";

// ═══════════════════════════════════════════
// Personal Information
// ═══════════════════════════════════════════

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().optional(),
  Link2: z.string().url("Invalid URL").optional().or(z.literal("")),
  GitFork: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  summary: z.string().optional(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

// ═══════════════════════════════════════════
// Education
// ═══════════════════════════════════════════

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  university: z.string().min(1, "University is required"),
  startYear: z.string().min(1, "Start year is required"),
  endYear: z.string().optional(),
  cgpa: z.string().optional(),
  coursework: z.string().optional(),
});

export type EducationItem = z.infer<typeof educationItemSchema>;

// ═══════════════════════════════════════════
// Experience
// ═══════════════════════════════════════════

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  responsibilities: z.string().min(1, "Add at least one responsibility"),
});

export type ExperienceItem = z.infer<typeof experienceItemSchema>;

// ═══════════════════════════════════════════
// Skills
// ═══════════════════════════════════════════

export const skillsSchema = z.object({
  technical: z.array(z.string()).default([]),
  soft: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
});

export type Skills = z.infer<typeof skillsSchema>;

// ═══════════════════════════════════════════
// Projects
// ═══════════════════════════════════════════

export const projectItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  techStack: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  liveLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubLink: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ProjectItem = z.infer<typeof projectItemSchema>;

// ═══════════════════════════════════════════
// Achievements
// ═══════════════════════════════════════════

export const achievementsSchema = z.object({
  certifications: z.string().optional(),
  awards: z.string().optional(),
  extraCurriculars: z.string().optional(),
  volunteering: z.string().optional(),
});

export type Achievements = z.infer<typeof achievementsSchema>;

// ═══════════════════════════════════════════
// Full Resume
// ═══════════════════════════════════════════

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationItemSchema),
  experience: z.array(experienceItemSchema),
  skills: skillsSchema,
  projects: z.array(projectItemSchema),
  achievements: achievementsSchema,
});

export type ResumeData = z.infer<typeof resumeSchema>;

export type TemplateType = "classic" | "modern" | "executive" | "creative";

export const STEP_LABELS = [
  "Personal Info",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Achievements",
] as const;
