"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getRandomTipForStep } from "@/lib/suggestions/ats-tips";
import TagInput from "@/components/ui/tag-input";
import { Lightbulb, Code, Heart, Wrench } from "lucide-react";

export default function SkillsStep() {
  const { skills, addSkill, removeSkill } = useResumeStore();
  const [tip] = useState(() => getRandomTipForStep(4));

  const sections = [
    {
      key: "technical" as const,
      label: "Technical Skills",
      icon: Code,
      placeholder: "e.g. React, Python, PostgreSQL...",
      categories: ["languages", "frameworks", "databases"] as const,
    },
    {
      key: "tools" as const,
      label: "Tools & Technologies",
      icon: Wrench,
      placeholder: "e.g. Git, Docker, Figma...",
      categories: ["tools", "devops", "design"] as const,
    },
    {
      key: "soft" as const,
      label: "Soft Skills",
      icon: Heart,
      placeholder: "e.g. Leadership, Communication...",
      categories: ["softSkills"] as const,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Skills
        </h2>
        <p className="text-muted-foreground mt-1">
          Add your skills. Start typing for auto-suggestions from our curated dictionary.
        </p>
      </div>

      {/* ATS Tip */}
      <div className="flex gap-3 p-4 rounded-xl bg-emerald/5 border border-emerald/10">
        <Lightbulb className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
        <div>
          <span className="label-mono text-emerald block mb-1">ATS Tip</span>
          <p className="text-sm text-muted-foreground">
            {tip}
          </p>
        </div>
      </div>

      {/* Skill Sections */}
      <div className="space-y-8">
        {sections.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4 text-emerald" />
              <label className="label-mono text-foreground">{label}</label>
              <span className="text-xs text-muted-foreground">
                ({skills[key].length})
              </span>
            </div>
            <TagInput
              tags={skills[key]}
              onAdd={(tag) => addSkill(key, tag)}
              onRemove={(tag) => removeSkill(key, tag)}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      {/* Skills summary */}
      {(skills.technical.length > 0 ||
        skills.tools.length > 0 ||
        skills.soft.length > 0) && (
        <div className="p-4 rounded-xl border border-border bg-card">
          <span className="label-mono text-muted-foreground block mb-2">
            Total Skills Added
          </span>
          <div className="flex items-center gap-6">
            <span className="text-2xl font-heading font-bold text-foreground">
              {skills.technical.length + skills.tools.length + skills.soft.length}
            </span>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>{skills.technical.length} Technical</span>
              <span>{skills.tools.length} Tools</span>
              <span>{skills.soft.length} Soft</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
