"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getRandomTipForStep } from "@/lib/suggestions/ats-tips";
import { Lightbulb, User, Mail, Phone, MapPin, Link2, GitFork, Globe } from "lucide-react";

export default function PersonalInfoStep() {
  const { personalInfo, setPersonalInfo } = useResumeStore();
  const [tip] = useState(() => getRandomTipForStep(1));

  const fields = [
    { key: "fullName" as const, label: "Full Name", icon: User, placeholder: "John Doe", required: true },
    { key: "email" as const, label: "Email", icon: Mail, placeholder: "john@example.com", type: "email", required: true },
    { key: "phone" as const, label: "Phone", icon: Phone, placeholder: "+1 (555) 000-0000" },
    { key: "city" as const, label: "City", icon: MapPin, placeholder: "San Francisco, CA" },
    { key: "Link2" as const, label: "Link2", icon: Link2, placeholder: "https://Link2.com/in/johndoe" },
    { key: "GitFork" as const, label: "GitFork", icon: GitFork, placeholder: "https://GitFork.com/johndoe" },
    { key: "portfolio" as const, label: "Portfolio", icon: Globe, placeholder: "https://johndoe.com" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Personal Information
        </h2>
        <p className="text-muted-foreground mt-1">
          Let&apos;s start with the basics. This information appears at the top of your resume.
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

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(({ key, label, icon: Icon, placeholder, type, required }) => (
          <div key={key} className={key === "fullName" ? "md:col-span-2" : ""}>
            <label htmlFor={key} className="label-mono mb-2 block text-foreground">
              {label} {required && <span className="text-emerald">*</span>}
            </label>
            <div className="relative">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id={key}
                type={type || "text"}
                value={personalInfo[key] || ""}
                onChange={(e) => setPersonalInfo({ [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <label htmlFor="summary" className="label-mono mb-2 block text-foreground">
          Professional Summary
        </label>
        <textarea
          id="summary"
          value={personalInfo.summary || ""}
          onChange={(e) => setPersonalInfo({ summary: e.target.value })}
          placeholder="A brief 2-3 sentence overview of your experience and goals..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          {(personalInfo.summary?.length || 0)}/300 characters
        </p>
      </div>
    </div>
  );
}
