"use client";

import { ArrowLeft, ArrowRight, Save } from "lucide-react";

interface StepNavigatorProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  isLastStep?: boolean;
}

export default function StepNavigator({
  currentStep,
  onNext,
  onBack,
  onSave,
  isSaving = false,
  isLastStep = false,
}: StepNavigatorProps) {
  return (
    <div className="flex items-center justify-between pt-8 border-t border-border mt-8">
      {/* Back button */}
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex items-center gap-3">
        {/* Save button */}
        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </button>
        )}

        {/* Next / Preview button */}
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald text-white text-sm font-medium hover:bg-emerald-dark transition-all shadow-lg shadow-emerald/20"
        >
          {isLastStep ? "Preview Resume" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
