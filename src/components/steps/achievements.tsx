"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getRandomTipForStep } from "@/lib/suggestions/ats-tips";
import { Lightbulb, Award, Medal, Users, Heart } from "lucide-react";

export default function AchievementsStep() {
  const { achievements, setAchievements } = useResumeStore();
  const [tip] = useState(() => getRandomTipForStep(6));

  const sections = [
    {
      key: "certifications" as const,
      label: "Certifications",
      icon: Award,
      placeholder: "AWS Certified Solutions Architect\nGoogle Cloud Professional Data Engineer\nMeta Front-End Developer Certificate",
    },
    {
      key: "awards" as const,
      label: "Awards & Honors",
      icon: Medal,
      placeholder: "Dean's List - Fall 2023\n1st Place - University Hackathon 2023\nScholarship Recipient - Merit Based Award",
    },
    {
      key: "extraCurriculars" as const,
      label: "Extra-Curriculars",
      icon: Users,
      placeholder: "President - Computer Science Club (2023-2024)\nVolunteer Mentor - Code.org\nHackathon Organizer - TechFest 2024",
    },
    {
      key: "volunteering" as const,
      label: "Volunteering",
      icon: Heart,
      placeholder: "Open Source Contributor - React.js\nTeaching Assistant - Intro to CS\nCommunity Tutor - Math & Science",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Achievements & Activities
        </h2>
        <p className="text-muted-foreground mt-1">
          Highlight certifications, awards, and extracurricular activities that set you apart.
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

      {/* Achievement Sections */}
      <div className="space-y-6">
        {sections.map(({ key, label, icon: Icon, placeholder }) => (
          <div
            key={key}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className="h-4 w-4 text-emerald" />
              <label className="label-mono text-foreground">{label}</label>
            </div>
            <textarea
              value={achievements[key] || ""}
              onChange={(e) => setAchievements({ [key]: e.target.value })}
              placeholder={placeholder}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
