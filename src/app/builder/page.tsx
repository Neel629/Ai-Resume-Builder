"use client";

import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resume-store";
import Navbar from "@/components/navbar";
import ProgressBar from "@/components/ui/progress-bar";
import StepNavigator from "@/components/ui/step-navigator";
import PersonalInfoStep from "@/components/steps/personal-info";
import EducationStep from "@/components/steps/education";
import ExperienceStep from "@/components/steps/experience";
import SkillsStep from "@/components/steps/skills";
import ProjectsStep from "@/components/steps/projects";
import AchievementsStep from "@/components/steps/achievements";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const stepComponents = [
  PersonalInfoStep,
  EducationStep,
  ExperienceStep,
  SkillsStep,
  ProjectsStep,
  AchievementsStep,
];

export default function BuilderPage() {
  const router = useRouter();
  const {
    currentStep,
    setCurrentStep,
    personalInfo,
    education,
    experience,
    skills,
    projects,
    achievements,
    selectedTemplate,
    photoUrl,
    resumeId,
    setResumeId,
    isSaving,
    setIsSaving,
  } = useResumeStore();

  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, [supabase.auth]);

  const StepComponent = stepComponents[currentStep - 1];

  const handleSave = async () => {
    if (!userId) return;
    setIsSaving(true);

    const resumeData = {
      user_id: userId,
      title: personalInfo.fullName
        ? `${personalInfo.fullName}'s Resume`
        : "Untitled Resume",
      personal_info: personalInfo,
      education,
      experience,
      skills,
      projects,
      achievements,
      selected_template: selectedTemplate,
      photo_url: photoUrl,
      updated_at: new Date().toISOString(),
    };

    try {
      if (resumeId) {
        await supabase
          .from("resumes")
          .update(resumeData)
          .eq("id", resumeId);
      } else {
        const { data } = await supabase
          .from("resumes")
          .insert(resumeData)
          .select("id")
          .single();

        if (data) {
          setResumeId(data.id);
        }
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      handleSave();
    } else {
      handleSave();
      router.push("/preview");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <ProgressBar currentStep={currentStep} />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            <StepComponent />
          </div>

          {/* Navigation */}
          <StepNavigator
            currentStep={currentStep}
            onNext={handleNext}
            onBack={handleBack}
            onSave={handleSave}
            isSaving={isSaving}
            isLastStep={currentStep === 6}
          />
        </div>
      </div>
    </div>
  );
}
