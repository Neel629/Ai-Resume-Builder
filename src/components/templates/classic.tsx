import type { ResumeData } from "@/lib/schemas";
import { Mail, Phone, MapPin, Link2, GitFork, Globe, ExternalLink } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  photoUrl?: string | null;
}

export default function ClassicTemplate({ data, photoUrl }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, achievements } = data;

  return (
    <div
      className="w-full bg-white font-['Inter',sans-serif] text-[11px] leading-[1.5]"
      style={{ color: "var(--resume-font, #1a1a1a)" }}
    >
      {/* Header */}
      <div
        className="text-white px-8 py-6"
        style={{ backgroundColor: "var(--resume-secondary, #0A0A0A)" }}
      >
        <div className="flex items-center gap-5">
          {photoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoUrl}
              alt={personalInfo.fullName}
              className="h-16 w-16 rounded-full object-cover border-2"
              style={{ borderColor: "var(--resume-primary, #16A34A)" }}
            />
          )}
          <div>
            <h1 className="text-xl font-['DM_Sans',sans-serif] font-bold tracking-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px] text-white/70">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-2.5 w-2.5" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-2.5 w-2.5" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />
                  {personalInfo.city}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-[10px]" style={{ color: "var(--resume-primary, #4ADE80)" }}>
              {personalInfo.Link2 && (
                <span className="flex items-center gap-1">
                  <Link2 className="h-2.5 w-2.5" />
                  Link2
                </span>
              )}
              {personalInfo.GitFork && (
                <span className="flex items-center gap-1">
                  <GitFork className="h-2.5 w-2.5" />
                  GitFork
                </span>
              )}
              {personalInfo.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="h-2.5 w-2.5" />
                  Portfolio
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 space-y-4">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] pb-1 mb-2"
              style={{ color: "var(--resume-primary, #16A34A)", borderBottom: "1px solid color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)" }}
            >
              Summary
            </h2>
            <p className="text-[10.5px] text-[#444]">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] pb-1 mb-2"
              style={{ color: "var(--resume-primary, #16A34A)", borderBottom: "1px solid color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)" }}
            >
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px]">{exp.role}</h3>
                    <span className="text-[9px] text-[#888]">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: "var(--resume-primary, #16A34A)" }}>{exp.company}</p>
                  <div className="mt-1 text-[10.5px] text-[#444] whitespace-pre-line">
                    {exp.responsibilities}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] pb-1 mb-2"
              style={{ color: "var(--resume-primary, #16A34A)", borderBottom: "1px solid color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)" }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-[11px]">{edu.degree}</h3>
                    <span className="text-[9px] text-[#888]">
                      {edu.startYear} — {edu.endYear || "Present"}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: "var(--resume-primary, #16A34A)" }}>{edu.university}</p>
                  {edu.cgpa && (
                    <p className="text-[10px] text-[#666]">GPA: {edu.cgpa}</p>
                  )}
                  {edu.coursework && (
                    <p className="text-[10px] text-[#666]">
                      Coursework: {edu.coursework}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.tools.length > 0 || skills.soft.length > 0) && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] pb-1 mb-2"
              style={{ color: "var(--resume-primary, #16A34A)", borderBottom: "1px solid color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)" }}
            >
              Skills
            </h2>
            <div className="space-y-1">
              {skills.technical.length > 0 && (
                <p className="text-[10.5px]">
                  <span className="font-semibold">Technical:</span>{" "}
                  <span className="text-[#444]">{skills.technical.join(", ")}</span>
                </p>
              )}
              {skills.tools.length > 0 && (
                <p className="text-[10.5px]">
                  <span className="font-semibold">Tools:</span>{" "}
                  <span className="text-[#444]">{skills.tools.join(", ")}</span>
                </p>
              )}
              {skills.soft.length > 0 && (
                <p className="text-[10.5px]">
                  <span className="font-semibold">Soft Skills:</span>{" "}
                  <span className="text-[#444]">{skills.soft.join(", ")}</span>
                </p>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] pb-1 mb-2"
              style={{ color: "var(--resume-primary, #16A34A)", borderBottom: "1px solid color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)" }}
            >
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[11px]">{proj.name}</h3>
                    {proj.liveLink && (
                      <ExternalLink className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
                    )}
                    {proj.githubLink && (
                      <GitFork className="h-2.5 w-2.5 text-[#888]" />
                    )}
                  </div>
                  {proj.techStack && (
                    <p className="text-[9px] font-medium" style={{ color: "var(--resume-primary, #16A34A)" }}>{proj.techStack}</p>
                  )}
                  <p className="text-[10.5px] text-[#444] mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {(achievements.certifications || achievements.awards || achievements.extraCurriculars || achievements.volunteering) && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] pb-1 mb-2"
              style={{ color: "var(--resume-primary, #16A34A)", borderBottom: "1px solid color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)" }}
            >
              Achievements
            </h2>
            <div className="space-y-1.5 text-[10.5px] text-[#444] whitespace-pre-line">
              {achievements.certifications && (
                <div>
                  <span className="font-semibold" style={{ color: "var(--resume-font, #1a1a1a)" }}>Certifications: </span>
                  {achievements.certifications}
                </div>
              )}
              {achievements.awards && (
                <div>
                  <span className="font-semibold" style={{ color: "var(--resume-font, #1a1a1a)" }}>Awards: </span>
                  {achievements.awards}
                </div>
              )}
              {achievements.extraCurriculars && (
                <div>
                  <span className="font-semibold" style={{ color: "var(--resume-font, #1a1a1a)" }}>Activities: </span>
                  {achievements.extraCurriculars}
                </div>
              )}
              {achievements.volunteering && (
                <div>
                  <span className="font-semibold" style={{ color: "var(--resume-font, #1a1a1a)" }}>Volunteering: </span>
                  {achievements.volunteering}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
