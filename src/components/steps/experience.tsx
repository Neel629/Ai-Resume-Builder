"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getRandomTipForStep } from "@/lib/suggestions/ats-tips";
import { getRandomVerbs } from "@/lib/suggestions/action-verbs";
import { BULLET_TEMPLATES, getAllRoles, type RoleType } from "@/lib/suggestions/bullet-templates";
import { Lightbulb, Plus, Trash2, Briefcase, Sparkles, ChevronDown } from "lucide-react";

export default function ExperienceStep() {
  const { experience, addExperience, updateExperience, removeExperience } =
    useResumeStore();
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleType>("General");
  const [tip] = useState(() => getRandomTipForStep(3));

  const [suggestionVerbs] = useState(() => ({
    technical: getRandomVerbs("technical", 3),
    leadership: getRandomVerbs("leadership", 3),
    achievement: getRandomVerbs("achievement", 3),
    analytical: getRandomVerbs("analytical", 3),
    communication: getRandomVerbs("communication", 3),
  }));

  const handleAdd = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: "",
    });
  };

  const verbCategories: { key: "technical" | "leadership" | "achievement" | "analytical" | "communication"; label: string }[] = [
    { key: "technical", label: "Technical" },
    { key: "leadership", label: "Leadership" },
    { key: "achievement", label: "Achievement" },
    { key: "analytical", label: "Analytical" },
    { key: "communication", label: "Communication" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Work Experience
        </h2>
        <p className="text-muted-foreground mt-1">
          Add your work experience, most recent first. Use action verbs and quantify achievements.
        </p>
      </div>

      {/* ATS Tip */}
      <div className="flex gap-3 p-4 rounded-xl bg-emerald/5 border border-emerald/10">
        <Lightbulb className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
        <div>
          <span className="label-mono text-emerald block mb-1">Pro Tip</span>
          <p className="text-sm text-muted-foreground">
            {tip}
          </p>
        </div>
      </div>

      {/* Experience Entries */}
      {experience.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-2xl">
          <Briefcase className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground mb-4">
            No experience entries yet
          </p>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald text-white text-sm font-medium hover:bg-emerald-dark transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-border bg-card animate-fade-in"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="label-mono text-emerald">
                  Experience #{index + 1}
                </span>
                <button
                  onClick={() => removeExperience(item.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Company <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) =>
                      updateExperience(item.id, { company: e.target.value })
                    }
                    placeholder="Google"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Role <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) =>
                      updateExperience(item.id, { role: e.target.value })
                    }
                    placeholder="Software Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Start Date <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) =>
                      updateExperience(item.id, { startDate: e.target.value })
                    }
                    placeholder="Jan 2023"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    End Date
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={item.current ? "Present" : item.endDate || ""}
                      onChange={(e) =>
                        updateExperience(item.id, { endDate: e.target.value })
                      }
                      disabled={item.current}
                      placeholder="Dec 2024"
                      className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all disabled:opacity-50"
                    />
                    <label className="flex items-center gap-2 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={item.current}
                        onChange={(e) =>
                          updateExperience(item.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? "" : item.endDate,
                          })
                        }
                        className="accent-emerald h-4 w-4"
                      />
                      <span className="text-xs text-muted-foreground">
                        Current
                      </span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="label-mono text-foreground">
                      Responsibilities <span className="text-emerald">*</span>
                    </label>
                    <button
                      onClick={() =>
                        setShowSuggestions(
                          showSuggestions === item.id ? null : item.id
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-emerald hover:text-emerald-light transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Smart Suggestions
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${
                          showSuggestions === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Smart Suggestions Panel */}
                  {showSuggestions === item.id && (
                    <div className="mb-3 p-4 rounded-xl border border-emerald/10 bg-emerald/5 animate-fade-in">
                      {/* Action Verbs */}
                      <div className="mb-4">
                        <span className="label-mono text-emerald block mb-2">
                          Action Verbs
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {verbCategories.map(({ key, label }) => (
                            <div key={key}>
                              <span className="text-[10px] text-muted-foreground block mb-1">
                                {label}
                              </span>
                              <div className="flex gap-1">
                                {suggestionVerbs[key].map((verb) => (
                                  <button
                                    key={verb}
                                    onClick={() => {
                                      const current =
                                        item.responsibilities || "";
                                      updateExperience(item.id, {
                                        responsibilities: current
                                          ? `${current}\n• ${verb} `
                                          : `• ${verb} `,
                                      });
                                    }}
                                    className="px-2 py-0.5 text-xs rounded-md bg-card border border-border text-foreground hover:border-emerald/30 hover:text-emerald transition-colors"
                                  >
                                    {verb}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bullet Templates */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="label-mono text-emerald">
                            Templates
                          </span>
                          <select
                            value={selectedRole}
                            onChange={(e) =>
                              setSelectedRole(e.target.value as RoleType)
                            }
                            className="text-xs bg-card border border-border rounded-lg px-2 py-1 text-foreground"
                          >
                            {getAllRoles().map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          {BULLET_TEMPLATES[selectedRole]
                            .slice(0, 4)
                            .map((template, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  const current = item.responsibilities || "";
                                  updateExperience(item.id, {
                                    responsibilities: current
                                      ? `${current}\n• ${template}`
                                      : `• ${template}`,
                                  });
                                }}
                                className="w-full text-left px-3 py-2 text-xs rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-emerald/30 transition-colors"
                              >
                                • {template}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <textarea
                    value={item.responsibilities}
                    onChange={(e) =>
                      updateExperience(item.id, {
                        responsibilities: e.target.value,
                      })
                    }
                    placeholder={"• Developed and maintained...\n• Led a team of...\n• Improved performance by..."}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-emerald hover:border-emerald/30 transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
}
