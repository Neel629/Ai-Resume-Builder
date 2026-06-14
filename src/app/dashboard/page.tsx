"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { useResumeStore } from "@/store/resume-store";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  FileText,
  Pencil,
  Trash2,
  Copy,
  MoreVertical,
  Loader2,
} from "lucide-react";

interface ResumeRecord {
  id: string;
  title: string;
  selected_template: string;
  updated_at: string;
  personal_info: { fullName?: string };
}

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { resetStore, hydrateFromDB, setResumeId } = useResumeStore();

  // Memoize the Supabase client so it doesn't change on every render,
  // which would cause fetchResumes to be recreated infinitely.
  const supabase = useMemo(() => createClient(), []);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("id, title, selected_template, updated_at, personal_info")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch resumes:", error.message);
      }
      setResumes((data as ResumeRecord[]) || []);
    } catch (err) {
      console.error("Unexpected error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleNewResume = () => {
    resetStore();
    router.push("/builder");
  };

  const handleEdit = async (id: string) => {
    const { data } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      hydrateFromDB({
        resumeId: data.id,
        personalInfo: data.personal_info || {},
        education: data.education || [],
        experience: data.experience || [],
        skills: data.skills || { technical: [], soft: [], tools: [] },
        projects: data.projects || [],
        achievements: data.achievements || {},
        selectedTemplate: data.selected_template || "classic",
        photoUrl: data.photo_url,
        currentStep: 1,
      });
      setResumeId(data.id);
      router.push("/builder");
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("resumes").delete().eq("id", id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
    setOpenMenu(null);
  };

  const handleDuplicate = async (id: string) => {
    const { data: original } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .single();

    if (original) {
      const rest = { ...original } as Record<string, unknown>;
      delete rest.id;
      delete rest.created_at;
      delete rest.updated_at;

      await supabase.from("resumes").insert({
        ...rest,
        title: `${original.title} (Copy)`,
      });
      fetchResumes();
    }
    setOpenMenu(null);
  };

  const templateColors: Record<string, string> = {
    classic: "from-[#0A0A0A] to-[#1a1a1a]",
    modern: "from-[#0A0A0A] to-[#F8FAFC]",
    executive: "from-[#F8FAFC] to-[#E2E8F0]",
    creative: "from-[#15803d] to-[#4ADE80]",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-heading font-bold tracking-tight">
                My Resumes
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your resumes. Create, edit, or export anytime.
              </p>
            </div>
            <button
              onClick={handleNewResume}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald text-white font-medium hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20"
            >
              <Plus className="h-4 w-4" />
              New Resume
            </button>
          </div>

          {/* Resumes Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-8 w-8 text-emerald animate-spin" />
            </div>
          ) : resumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-border rounded-2xl">
              <FileText className="h-16 w-16 text-muted-foreground/20 mb-6" />
              <h2 className="text-xl font-heading font-semibold mb-2">
                No resumes yet
              </h2>
              <p className="text-muted-foreground mb-6 text-center max-w-sm">
                Create your first professional resume in minutes with our
                guided builder.
              </p>
              <button
                onClick={handleNewResume}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald text-white font-medium hover:bg-emerald-dark transition-all"
              >
                <Plus className="h-4 w-4" />
                Create Resume
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* New Resume Card */}
              <button
                onClick={handleNewResume}
                className="flex flex-col items-center justify-center aspect-[3/4] rounded-2xl border-2 border-dashed border-border hover:border-emerald/30 hover:bg-emerald/5 transition-all group"
              >
                <Plus className="h-8 w-8 text-muted-foreground group-hover:text-emerald transition-colors mb-2" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-emerald transition-colors">
                  New Resume
                </span>
              </button>

              {/* Resume Cards */}
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="relative group rounded-2xl border border-border bg-card card-hover overflow-hidden"
                >
                  {/* Template Preview */}
                  <div
                    className={`aspect-[3/2] bg-gradient-to-br ${
                      templateColors[resume.selected_template] || templateColors.classic
                    } relative`}
                  >
                    {/* Fake resume lines */}
                    <div className="absolute inset-0 p-5 flex flex-col">
                      <div className="h-2.5 w-20 rounded-full bg-white/15 mb-1.5" />
                      <div className="h-1.5 w-14 rounded-full bg-white/10 mb-3" />
                      <div className="h-px bg-emerald/30 mb-3" />
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full bg-white/8 mb-1.5"
                          style={{ width: `${55 + ((i * 17) % 40)}%` }}
                        />
                      ))}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(resume.id)}
                        className="px-4 py-2 rounded-lg bg-emerald text-white text-sm font-medium hover:bg-emerald-dark transition-colors flex items-center gap-1.5"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm text-foreground truncate max-w-[180px]">
                          {resume.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Updated{" "}
                          {new Date(resume.updated_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Menu */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === resume.id ? null : resume.id
                            )
                          }
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {openMenu === resume.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-border bg-card shadow-xl z-20 animate-fade-in overflow-hidden">
                            <button
                              onClick={() => handleEdit(resume.id)}
                              className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDuplicate(resume.id)}
                              className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
                            >
                              <Copy className="h-3.5 w-3.5" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDelete(resume.id)}
                              className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Template Badge */}
                    <div className="mt-2">
                      <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-md bg-emerald/10 text-emerald">
                        {resume.selected_template}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
