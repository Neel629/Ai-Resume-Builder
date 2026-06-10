import type { ResumeData } from "@/lib/schemas";
import { Mail, Phone, MapPin, Link2, GitFork, Globe, ExternalLink } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  photoUrl?: string | null;
}

export default function ExecutiveTemplate({ data, photoUrl }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, achievements } = data;

  return (
    <div
      className="w-full bg-white font-['Inter',sans-serif] text-[11px] leading-[1.5]"
      style={{ color: "var(--resume-font, #1a1a1a)" }}
    >
      {/* Top Name Bar */}
      <div
        className="px-8 pt-6 pb-4 border-b-2"
        style={{ borderColor: "var(--resume-primary, #16A34A)" }}
      >
        <h1
          className="text-2xl font-['DM_Sans',sans-serif] font-bold tracking-tight text-center"
          style={{ color: "var(--resume-secondary, #0A0A0A)" }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-3 mt-2 text-[9.5px] text-[#666]">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
              {personalInfo.city}
            </span>
          )}
          {personalInfo.Link2 && (
            <span className="flex items-center gap-1">
              <Link2 className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
              Link2
            </span>
          )}
          {personalInfo.GitFork && (
            <span className="flex items-center gap-1">
              <GitFork className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
              GitFork
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
              Portfolio
            </span>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Left Column - Main Content */}
        <div className="flex-1 p-6 pr-4 space-y-4">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5"
                style={{ color: "var(--resume-primary, #16A34A)" }}
              >
                Professional Summary
              </h2>
              <p className="text-[10.5px] text-[#444] leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                style={{ color: "var(--resume-primary, #16A34A)" }}
              >
                Professional Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px]">{exp.role}</h3>
                      <span className="text-[9px] text-[#888] shrink-0 ml-2">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold italic" style={{ color: "var(--resume-primary, #16A34A)" }}>
                      {exp.company}
                    </p>
                    <div className="mt-1 text-[10.5px] text-[#444] whitespace-pre-line">
                      {exp.responsibilities}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                style={{ color: "var(--resume-primary, #16A34A)" }}
              >
                Key Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[11px]">{proj.name}</h3>
                      {proj.liveLink && <ExternalLink className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />}
                      {proj.githubLink && <GitFork className="h-2.5 w-2.5 text-[#888]" />}
                    </div>
                    {proj.techStack && (
                      <p className="text-[9px] text-[#888] italic">{proj.techStack}</p>
                    )}
                    <p className="text-[10.5px] text-[#444] mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-[32%] bg-[#F8FAFC] p-5 space-y-4 border-l border-[#E2E8F0]">
          {/* Photo */}
          {photoUrl && (
            <div className="mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={personalInfo.fullName}
                className="w-full aspect-square rounded-xl object-cover"
              />
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2
                className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--resume-primary, #16A34A)" }}
              >
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[10px] font-semibold">{edu.degree}</p>
                    <p className="text-[9px] text-[#666]">{edu.university}</p>
                    <p className="text-[8px] text-[#888]">
                      {edu.startYear} — {edu.endYear || "Present"}
                    </p>
                    {edu.cgpa && <p className="text-[8px] text-[#888]">GPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(skills.technical.length > 0 || skills.tools.length > 0 || skills.soft.length > 0) && (
            <div>
              <h2
                className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--resume-primary, #16A34A)" }}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {skills.technical.length > 0 && (
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-[#888] mb-1">Technical</p>
                    <div className="flex flex-wrap gap-1">
                      {skills.technical.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 text-[8px] rounded font-medium"
                          style={{ backgroundColor: "color-mix(in srgb, var(--resume-primary, #16A34A) 10%, transparent)", color: "var(--resume-primary, #16A34A)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.tools.length > 0 && (
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-[#888] mb-1">Tools</p>
                    <div className="flex flex-wrap gap-1">
                      {skills.tools.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 text-[8px] rounded bg-[#0A0A0A]/5 text-[#444]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.soft.length > 0 && (
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-[#888] mb-1">Soft Skills</p>
                    <p className="text-[9px] text-[#666]">{skills.soft.join(" · ")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Achievements */}
          {(achievements.certifications || achievements.awards) && (
            <div>
              <h2
                className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--resume-primary, #16A34A)" }}
              >
                Achievements
              </h2>
              <div className="text-[9.5px] text-[#444] space-y-1 whitespace-pre-line">
                {achievements.certifications && <p>{achievements.certifications}</p>}
                {achievements.awards && <p>{achievements.awards}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
