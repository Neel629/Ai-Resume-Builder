"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald/3 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald/[0.02] blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          data-animate
          className="opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald/20 bg-emerald/5 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald" />
          <span className="label-mono text-emerald-light">
            Free & Open Source
          </span>
        </div>

        {/* Headline */}
        <h1
          data-animate
          className="opacity-0 stagger-1 text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-6"
        >
          Build Your Resume
          <br />
          <span className="text-gradient">in Minutes</span>
        </h1>

        {/* Subheadline */}
        <p
          data-animate
          className="opacity-0 stagger-2 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Smart suggestions. Professional templates. Instant PDF export.
          <br className="hidden sm:block" />
          Everything you need to land your dream job — completely free.
        </p>

        {/* CTA Buttons */}
        <div
          data-animate
          className="opacity-0 stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auth/signup"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald text-white font-medium text-base hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 hover:shadow-xl hover:shadow-emerald/30 hover:-translate-y-0.5"
          >
            Start Building
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-medium text-base hover:bg-secondary transition-all duration-300"
          >
            See Features
          </Link>
        </div>

        {/* Stats */}
        <div
          data-animate
          className="opacity-0 stagger-4 mt-16 flex items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "4", label: "Templates" },
            { value: "500+", label: "Smart Suggestions" },
            { value: "∞", label: "Free Forever" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                {stat.value}
              </div>
              <div className="label-mono mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
