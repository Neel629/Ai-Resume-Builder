"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resume-store";
import Navbar from "@/components/navbar";
import TemplateRenderer from "@/components/templates/template-renderer";
import { exportToPDF } from "@/lib/pdf-export";
import { Download, ArrowLeft, Check, Loader2, Palette, RotateCcw } from "lucide-react";
import type { TemplateType, ResumeData } from "@/lib/schemas";

const templates: { key: TemplateType; name: string; description: string }[] = [
  { key: "classic", name: "Classic Dark", description: "ATS-friendly, clean" },
  { key: "modern", name: "Modern White", description: "Black sidebar, elegant" },
  { key: "executive", name: "Executive Split", description: "Two-column, impactful" },
  { key: "creative", name: "Creative Gradient", description: "Bold, dynamic" },
];

const presetPalettes = [
  { name: "Emerald", primary: "#16A34A", secondary: "#0A0A0A", font: "#1a1a1a" },
  { name: "Ocean", primary: "#2563EB", secondary: "#0F172A", font: "#1e293b" },
  { name: "Sunset", primary: "#EA580C", secondary: "#1C1917", font: "#292524" },
  { name: "Royal", primary: "#7C3AED", secondary: "#1E1B4B", font: "#1e1b4b" },
  { name: "Rose", primary: "#E11D48", secondary: "#1C1917", font: "#171717" },
  { name: "Teal", primary: "#0D9488", secondary: "#042F2E", font: "#134E4A" },
];

export default function PreviewPage() {
  const router = useRouter();
  const {
    selectedTemplate,
    setSelectedTemplate,
    personalInfo,
    education,
    experience,
    skills,
    projects,
    achievements,
    photoUrl,
    customColors,
    setCustomColors,
  } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);
  const [showColorPanel, setShowColorPanel] = useState(false);

  const resumeData: ResumeData = {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    achievements,
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(async () => {
      try {
        const filename = personalInfo.fullName || "resume";
        await exportToPDF("resume-preview", filename);
      } catch (error) {
        console.error("PDF export failed:", error);
      } finally {
        setIsExporting(false);
      }
    }, 150);
  };

  const handleResetColors = () => {
    setCustomColors({ primary: "#16A34A", secondary: "#0A0A0A", font: "#1a1a1a" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => router.push("/builder")}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Editor
              </button>
              <h1 className="text-2xl font-heading font-bold tracking-tight">
                Preview & Export
              </h1>
              <p className="text-muted-foreground mt-1">
                Choose a template, customize colors, and download your resume.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowColorPanel(!showColorPanel)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition-all text-sm ${
                  showColorPanel
                    ? "border-emerald bg-emerald/5 text-emerald"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-emerald/30"
                }`}
              >
                <Palette className="h-4 w-4" />
                Colors
              </button>

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald text-white font-medium hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20 disabled:opacity-50 text-sm"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download PDF
              </button>
            </div>
          </div>

          <div className="flex gap-8 flex-col lg:flex-row">
            {/* Left Sidebar: Template + Color Panel */}
            <div className="lg:w-72 shrink-0 space-y-6">
              {/* Template Selector */}
              <div>
                <span className="label-mono text-muted-foreground mb-4 block">
                  Template
                </span>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  {templates.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setSelectedTemplate(t.key)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        selectedTemplate === t.key
                          ? "border-emerald bg-emerald/5 ring-2 ring-emerald/20"
                          : "border-border bg-card hover:border-emerald/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm text-foreground">
                          {t.name}
                        </h3>
                        {selectedTemplate === t.key && (
                          <Check className="h-4 w-4 text-emerald" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Customization Panel */}
              {showColorPanel && (
                <div className="p-5 rounded-2xl border border-border bg-card space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-muted-foreground">
                      Custom Colors
                    </span>
                    <button
                      onClick={handleResetColors}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  </div>

                  {/* Preset Palettes */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Quick Presets</p>
                    <div className="grid grid-cols-3 gap-2">
                      {presetPalettes.map((palette) => (
                        <button
                          key={palette.name}
                          onClick={() =>
                            setCustomColors({
                              primary: palette.primary,
                              secondary: palette.secondary,
                              font: palette.font,
                            })
                          }
                          className={`group relative p-2 rounded-xl border transition-all hover:scale-[1.03] ${
                            customColors.primary === palette.primary &&
                            customColors.secondary === palette.secondary
                              ? "border-emerald ring-2 ring-emerald/20"
                              : "border-border hover:border-foreground/20"
                          }`}
                        >
                          <div className="flex gap-1 mb-1.5">
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: palette.primary }}
                            />
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: palette.secondary }}
                            />
                          </div>
                          <p className="text-[10px] text-muted-foreground font-medium">
                            {palette.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual Color Pickers */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Fine-tune</p>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-foreground font-medium">
                        Primary
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {customColors.primary}
                        </span>
                        <input
                          type="color"
                          value={customColors.primary}
                          onChange={(e) => setCustomColors({ primary: e.target.value })}
                          className="h-8 w-8 rounded-lg border border-border cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-foreground font-medium">
                        Secondary
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {customColors.secondary}
                        </span>
                        <input
                          type="color"
                          value={customColors.secondary}
                          onChange={(e) => setCustomColors({ secondary: e.target.value })}
                          className="h-8 w-8 rounded-lg border border-border cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm text-foreground font-medium">
                        Font
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {customColors.font}
                        </span>
                        <input
                          type="color"
                          value={customColors.font}
                          onChange={(e) => setCustomColors({ font: e.target.value })}
                          className="h-8 w-8 rounded-lg border border-border cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resume Preview */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[700px]">
                <div
                  id="resume-preview"
                  className="bg-white shadow-2xl shadow-black/10 rounded-lg overflow-hidden"
                  style={{ aspectRatio: "210/297" }}
                >
                  <TemplateRenderer
                    template={selectedTemplate}
                    data={resumeData}
                    photoUrl={photoUrl}
                    customColors={customColors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
