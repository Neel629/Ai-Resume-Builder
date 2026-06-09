"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getRandomTipForStep } from "@/lib/suggestions/ats-tips";
import { Lightbulb, Plus, Trash2, FolderGit2, ExternalLink, GitFork } from "lucide-react";

export default function ProjectsStep() {
  const { projects, addProject, updateProject, removeProject } =
    useResumeStore();
  const [tip] = useState(() => getRandomTipForStep(5));

  const handleAdd = () => {
    addProject({
      id: crypto.randomUUID(),
      name: "",
      techStack: "",
      description: "",
      liveLink: "",
      githubLink: "",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-heading font-bold tracking-tight">
          Projects
        </h2>
        <p className="text-muted-foreground mt-1">
          Showcase your best work. Include 2-4 impactful projects with links.
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

      {/* Project Entries */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-2xl">
          <FolderGit2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald text-white text-sm font-medium hover:bg-emerald-dark transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-border bg-card animate-fade-in"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="label-mono text-emerald">
                  Project #{index + 1}
                </span>
                <button
                  onClick={() => removeProject(item.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Project Name <span className="text-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      updateProject(item.id, { name: e.target.value })
                    }
                    placeholder="E-Commerce Platform"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    value={item.techStack || ""}
                    onChange={(e) =>
                      updateProject(item.id, { techStack: e.target.value })
                    }
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label-mono mb-2 block text-foreground">
                    Description <span className="text-emerald">*</span>
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateProject(item.id, { description: e.target.value })
                    }
                    placeholder="Built a full-stack e-commerce platform with user authentication, product management, and payment integration..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3" />
                      Live Link
                    </span>
                  </label>
                  <input
                    type="url"
                    value={item.liveLink || ""}
                    onChange={(e) =>
                      updateProject(item.id, { liveLink: e.target.value })
                    }
                    placeholder="https://myproject.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block text-foreground">
                    <span className="flex items-center gap-1.5">
                      <GitFork className="h-3 w-3" />
                      GitFork Link
                    </span>
                  </label>
                  <input
                    type="url"
                    value={item.githubLink || ""}
                    onChange={(e) =>
                      updateProject(item.id, { githubLink: e.target.value })
                    }
                    placeholder="https://GitFork.com/user/project"
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
            Add Another Project
          </button>
        </div>
      )}
    </div>
  );
}
