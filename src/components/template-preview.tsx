"use client";

import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { useEffect, useRef } from "react";

const templates = [
  {
    name: "Classic Dark",
    description: "ATS-friendly. Clean, professional layout.",
    gradient: "from-[#0A0A0A] to-[#1a1a1a]",
    accent: "border-emerald/30",
  },
  {
    name: "Modern White",
    description: "Clean recruiter-loved design with green accents.",
    gradient: "from-[#F8FAFC] to-[#E2E8F0]",
    accent: "border-emerald/40",
    dark: true,
  },
  {
    name: "Executive Split",
    description: "Two-column with dark sidebar. Impactful.",
    gradient: "from-[#0A0A0A] via-[#141414] to-[#F8FAFC]",
    accent: "border-emerald/30",
  },
  {
    name: "Creative Gradient",
    description: "Bold header, dynamic layout for creatives.",
    gradient: "from-emerald-dark via-emerald to-emerald-light",
    accent: "border-emerald/50",
  },
];

export default function TemplatePreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-template]");
    cards?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="label-mono text-emerald mb-4 block">
            Templates
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
            Pick Your Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Four professionally designed templates. Switch anytime with a
            single click.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, i) => (
            <div
              key={template.name}
              data-template
              className={`opacity-0 stagger-${i + 1} group relative`}
            >
              {/* Preview Card */}
              <div
                className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${template.gradient} border ${template.accent} overflow-hidden card-hover relative`}
              >
                {/* Fake resume lines */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <div
                      className={`h-3 w-24 rounded-full ${template.dark ? "bg-black/20" : "bg-white/20"} mb-2`}
                    />
                    <div
                      className={`h-2 w-16 rounded-full ${template.dark ? "bg-black/10" : "bg-white/10"}`}
                    />
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-emerald/30 mb-4" />

                  {/* Content lines */}
                  {[...Array(8)].map((_, j) => (
                    <div
                      key={j}
                      className={`h-1.5 rounded-full ${template.dark ? "bg-black/10" : "bg-white/10"} mb-2`}
                      style={{ width: `${60 + ((i * 7 + j * 13) % 35)}%` }}
                    />
                  ))}

                  {/* Skills section */}
                  <div className="mt-auto flex gap-1.5 flex-wrap">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className={`h-4 w-12 rounded-md ${template.dark ? "bg-black/10" : "bg-white/15"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium">
                    <Eye className="h-4 w-4" />
                    Preview
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="mt-4">
                <h3 className="font-heading font-semibold text-foreground">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/auth/signup"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald text-white font-medium hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20"
          >
            Start Building Your Resume
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
