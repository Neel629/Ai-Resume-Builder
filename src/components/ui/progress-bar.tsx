"use client";

import { STEP_LABELS } from "@/lib/schemas";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps = 6,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-emerald transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald text-white"
                    : isCurrent
                    ? "bg-emerald text-white ring-4 ring-emerald/20 animate-pulse-glow"
                    : "bg-card border-2 border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2.5 text-[10px] font-medium tracking-wider uppercase hidden sm:block ${
                  isCurrent
                    ? "text-emerald"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile current step label */}
      <div className="sm:hidden mt-4 text-center">
        <span className="label-mono text-emerald">
          Step {currentStep} of {totalSteps}
        </span>
        <p className="text-sm font-medium text-foreground mt-0.5">
          {STEP_LABELS[currentStep - 1]}
        </p>
      </div>
    </div>
  );
}
