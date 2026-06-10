import { create } from "zustand";
import type {
  PersonalInfo,
  EducationItem,
  ExperienceItem,
  Skills,
  ProjectItem,
  Achievements,
  TemplateType,
} from "@/lib/schemas";

export interface CustomColors {
  primary: string;
  secondary: string;
  font: string;
}

interface ResumeState {
  // Data
  resumeId: string | null;
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: Skills;
  projects: ProjectItem[];
  achievements: Achievements;
  selectedTemplate: TemplateType;
  photoUrl: string | null;
  customColors: CustomColors;

  // UI State
  currentStep: number;
  isSaving: boolean;
  isDirty: boolean;

  // Actions — Personal Info
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Actions — Education
  addEducation: (item: EducationItem) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  // Actions — Experience
  addExperience: (item: ExperienceItem) => void;
  updateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;

  // Actions — Skills
  setSkills: (skills: Partial<Skills>) => void;
  addSkill: (category: keyof Skills, skill: string) => void;
  removeSkill: (category: keyof Skills, skill: string) => void;

  // Actions — Projects
  addProject: (item: ProjectItem) => void;
  updateProject: (id: string, item: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  // Actions — Achievements
  setAchievements: (achievements: Partial<Achievements>) => void;

  // Actions — Template & Navigation
  setSelectedTemplate: (template: TemplateType) => void;
  setCurrentStep: (step: number) => void;
  setPhotoUrl: (url: string | null) => void;
  setResumeId: (id: string | null) => void;
  setCustomColors: (colors: Partial<CustomColors>) => void;
  setIsSaving: (saving: boolean) => void;

  // Actions — Hydration & Reset
  hydrateFromDB: (data: Partial<ResumeState>) => void;
  resetStore: () => void;
}

const initialPersonalInfo: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  Link2: "",
  GitFork: "",
  portfolio: "",
  summary: "",
};

const initialSkills: Skills = {
  technical: [],
  soft: [],
  tools: [],
};

const initialAchievements: Achievements = {
  certifications: "",
  awards: "",
  extraCurriculars: "",
  volunteering: "",
};

const initialCustomColors: CustomColors = {
  primary: "#16A34A",
  secondary: "#0A0A0A",
  font: "#1a1a1a",
};

export const useResumeStore = create<ResumeState>((set) => ({
  // Initial State
  resumeId: null,
  personalInfo: { ...initialPersonalInfo },
  education: [],
  experience: [],
  skills: { ...initialSkills },
  projects: [],
  achievements: { ...initialAchievements },
  selectedTemplate: "classic",
  photoUrl: null,
  customColors: { ...initialCustomColors },
  currentStep: 1,
  isSaving: false,
  isDirty: false,

  // Personal Info
  setPersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
      isDirty: true,
    })),

  // Education
  addEducation: (item) =>
    set((state) => ({
      education: [...state.education, item],
      isDirty: true,
    })),
  updateEducation: (id, item) =>
    set((state) => ({
      education: state.education.map((e) =>
        e.id === id ? { ...e, ...item } : e
      ),
      isDirty: true,
    })),
  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((e) => e.id !== id),
      isDirty: true,
    })),

  // Experience
  addExperience: (item) =>
    set((state) => ({
      experience: [...state.experience, item],
      isDirty: true,
    })),
  updateExperience: (id, item) =>
    set((state) => ({
      experience: state.experience.map((e) =>
        e.id === id ? { ...e, ...item } : e
      ),
      isDirty: true,
    })),
  removeExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((e) => e.id !== id),
      isDirty: true,
    })),

  // Skills
  setSkills: (skills) =>
    set((state) => ({
      skills: { ...state.skills, ...skills },
      isDirty: true,
    })),
  addSkill: (category, skill) =>
    set((state) => ({
      skills: {
        ...state.skills,
        [category]: [...state.skills[category], skill],
      },
      isDirty: true,
    })),
  removeSkill: (category, skill) =>
    set((state) => ({
      skills: {
        ...state.skills,
        [category]: state.skills[category].filter((s) => s !== skill),
      },
      isDirty: true,
    })),

  // Projects
  addProject: (item) =>
    set((state) => ({
      projects: [...state.projects, item],
      isDirty: true,
    })),
  updateProject: (id, item) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...item } : p
      ),
      isDirty: true,
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      isDirty: true,
    })),

  // Achievements
  setAchievements: (achievements) =>
    set((state) => ({
      achievements: { ...state.achievements, ...achievements },
      isDirty: true,
    })),

  // Template & Navigation
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setPhotoUrl: (url) => set({ photoUrl: url, isDirty: true }),
  setResumeId: (id) => set({ resumeId: id }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  setCustomColors: (colors) =>
    set((state) => ({
      customColors: { ...state.customColors, ...colors },
    })),

  // Hydration & Reset
  hydrateFromDB: (data) =>
    set((state) => ({
      ...state,
      ...data,
      isDirty: false,
    })),
  resetStore: () =>
    set({
      resumeId: null,
      personalInfo: { ...initialPersonalInfo },
      education: [],
      experience: [],
      skills: { ...initialSkills },
      projects: [],
      achievements: { ...initialAchievements },
      selectedTemplate: "classic",
      photoUrl: null,
      customColors: { ...initialCustomColors },
      currentStep: 1,
      isSaving: false,
      isDirty: false,
    }),
}));
