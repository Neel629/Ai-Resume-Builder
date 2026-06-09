"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getRandomTipForStep } from "@/lib/suggestions/ats-tips";
import { Lightbulb, Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationStep() {
  const { education, addEducation, updateEducation, removeEducation } =
    useResumeStore();
  const [tip] = useState(() => getRandomTipForStep(2));

  const handleAdd = () => {
    addEducation({
      id: crypto.randomUUID(),
      degree: "",
      university: "",
      startYear: "",
      endYear: "",
      cgpa: "",
      coursework: "",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Education
        </h2>
        <p className="text-muted-foreground mt-1">
          Add your educational qualifications, most recent first.
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

      {/* Education Entries */}
      {education.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-2xl">
          <GraduationCap className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground mb-4">
            No education entries yet
          </p>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald text-white text-sm font-medium hover:bg-emerald-dark transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-border bg-card animate-fade-in"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="label-mono text-emerald">
                  Education #{index + 1}
                </span>
                <button
                  onClick={() => removeEducation(item.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="label-mono mb-2 block text-foreground">
                    Degree <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) =>
                      updateEducation(item.id, { degree: e.target.value })
                    }
                    placeholder="B.Tech in Computer Science"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label-mono mb-2 block text-foreground">
                    University <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.university}
                    onChange={(e) =>
                      updateEducation(item.id, { university: e.target.value })
                    }
                    placeholder="Stanford University"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Start Year <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.startYear}
                    onChange={(e) =>
                      updateEducation(item.id, { startYear: e.target.value })
                    }
                    placeholder="2020"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={item.endYear || ""}
                    onChange={(e) =>
                      updateEducation(item.id, { endYear: e.target.value })
                    }
                    placeholder="2024 (or Expected 2025)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    CGPA / GPA
                  </label>
                  <input
                    type="text"
                    value={item.cgpa || ""}
                    onChange={(e) =>
                      updateEducation(item.id, { cgpa: e.target.value })
                    }
                    placeholder="3.8 / 4.0"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Relevant Coursework
                  </label>
                  <input
                    type="text"
                    value={item.coursework || ""}
                    onChange={(e) =>
                      updateEducation(item.id, { coursework: e.target.value })
                    }
                    placeholder="Data Structures, Algorithms, ML"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
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
            Add Another Education
          </button>
        </div>
      )}
    </div>
  );
}
