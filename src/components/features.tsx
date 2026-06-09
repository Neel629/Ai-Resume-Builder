"use client";

import { useEffect, useRef } from "react";
import {
  FileText,
  Lightbulb,
  Palette,
  Download,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Smart Suggestions",
    description:
      "200+ action verbs, bullet point templates, and ATS tips to make your resume stand out.",
  },
  {
    icon: Palette,
    title: "4 Pro Templates",
    description:
      "Classic, Modern, Executive, and Creative — each crafted for different industries and styles.",
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description:
      "Download your resume as a pixel-perfect A4 PDF, ready to submit to any employer.",
  },
  {
    icon: Lightbulb,
    title: "ATS Optimized",
    description:
      "Real-time tips ensure your resume passes Applicant Tracking Systems every time.",
  },
  {
    icon: FileText,
    title: "Multi-Step Wizard",
    description:
      "Guided 6-step form with auto-save, so you never lose your progress.",
  },
  {
    icon: Shield,
    title: "Free & Open Source",
    description:
      "No hidden fees, no premium tiers. Your data stays yours. Forever free.",
  },
];

export default function Features() {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-feature]");
    cards?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-20">
        <span className="label-mono text-emerald mb-4 block">Features</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
          Everything You Need
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          No bloat. No subscriptions. Just the tools to build a resume that
          gets you interviews.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            data-feature
            className={`opacity-0 stagger-${i + 1} group relative p-8 rounded-2xl border border-border bg-card card-hover`}
          >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald mb-6 transition-colors group-hover:bg-emerald group-hover:text-white">
              <feature.icon className="h-6 w-6" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-heading font-semibold mb-3 text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl bg-emerald/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
