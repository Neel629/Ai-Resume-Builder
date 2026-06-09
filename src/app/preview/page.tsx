"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resume-store";
import Navbar from "@/components/navbar";
import TemplateRenderer from "@/components/templates/template-renderer";
import { exportToPDF, exportToPDFBase64 } from "@/lib/pdf-export";
import { Download, ArrowLeft, Check, Loader2, Mail } from "lucide-react";
import type { TemplateType, ResumeData } from "@/lib/schemas";

const templates: { key: TemplateType; name: string; description: string }[] = [
  { key: "classic", name: "Classic Dark", description: "ATS-friendly, clean" },
  { key: "modern", name: "Modern White", description: "Black sidebar, elegant" },
  { key: "executive", name: "Executive Split", description: "Two-column, impactful" },
  { key: "creative", name: "Creative Gradient", description: "Bold, dynamic" },
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
  } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);

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
    // Defer the heavy PDF export task to let the browser render the spinner smoothly first
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

  const handleEmail = () => {
    if (!personalInfo.email) {
      alert("Please add your email in the Personal Info section first.");
      return;
    }
    
    setIsEmailing(true);
    setTimeout(async () => {
      try {
        const filename = personalInfo.fullName || "resume";
        const pdfBase64 = await exportToPDFBase64("resume-preview");
        
        const response = await fetch("/api/send-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: personalInfo.email, pdfBase64, filename }),
        });

        if (response.ok) {
          alert(`Resume emailed successfully to ${personalInfo.email}!`);
        } else {
          alert("Failed to email resume.");
        }
      } catch (error) {
        console.error("PDF export/email failed:", error);
        alert("An error occurred while emailing the resume.");
      } finally {
        setIsEmailing(false);
      }
    }, 150);
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
                Choose a template and download your resume as PDF.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleEmail}
                disabled={isEmailing || isExporting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald border border-emerald font-medium hover:bg-emerald/5 transition-all shadow-sm disabled:opacity-50"
              >
                {isEmailing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Email to Me
              </button>

              <button
                onClick={handleExport}
                disabled={isExporting || isEmailing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald text-white font-medium hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20 disabled:opacity-50"
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
            {/* Template Selector */}
            <div className="lg:w-64 shrink-0">
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
