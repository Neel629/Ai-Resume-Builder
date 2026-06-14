import type { ResumeData } from "@/lib/schemas";
import { Mail, Phone, MapPin, Link2, GitFork, Globe, ExternalLink } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  photoUrl?: string | null;
}

export default function CreativeTemplate({ data, photoUrl }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, achievements } = data;

  return (
    <div
      className="w-full bg-white font-['Inter',sans-serif] text-[11px] leading-[1.5]"
      style={{ color: "var(--resume-font, #1a1a1a)" }}
    >
      {/* Gradient Header */}
      <div
        className="text-white px-8 py-7"
        style={{
          background: `linear-gradient(to right, var(--resume-secondary, #0A0A0A), var(--resume-primary, #16A34A))`,
        }}
      >
        <div className="flex items-center gap-5">
          {photoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoUrl}
              alt={personalInfo.fullName}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-white/30 shadow-lg"
            />
          )}
          <div>
            <h1 className="text-2xl font-['DM_Sans',sans-serif] font-bold tracking-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
            {personalInfo.summary && (
              <p className="text-[10.5px] text-white/70 mt-1 max-w-lg leading-relaxed">
                {personalInfo.summary}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[9.5px] text-white/60">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1 text-inherit no-underline hover:underline"
                >
                  <Mail className="h-2.5 w-2.5" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-1 text-inherit no-underline hover:underline"
                >
                  <Phone className="h-2.5 w-2.5" />
                  {personalInfo.phone}
                </a>
              )}
              {personalInfo.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />
                  {personalInfo.city}
                </span>
              )}
              {personalInfo.Link2 && (
                <a
                  href={personalInfo.Link2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-inherit no-underline hover:underline"
                >
                  <Link2 className="h-2.5 w-2.5" />
                  Link2
                </a>
              )}
              {personalInfo.GitFork && (
                <a
                  href={personalInfo.GitFork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-inherit no-underline hover:underline"
                >
                  <GitFork className="h-2.5 w-2.5" />
                  GitFork
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-inherit no-underline hover:underline"
                >
                  <Globe className="h-2.5 w-2.5" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Bar */}
      {(skills.technical.length > 0 || skills.tools.length > 0) && (
        <div className="bg-[#F8FAFC] px-8 py-3 border-b border-[#E2E8F0]">
          <div className="flex flex-wrap gap-1.5">
            {[...skills.technical, ...skills.tools].map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[8px] font-medium rounded-full border"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--resume-primary, #16A34A) 10%, transparent)",
                  color: "var(--resume-primary, #16A34A)",
                  borderColor: "color-mix(in srgb, var(--resume-primary, #16A34A) 20%, transparent)",
                }}
              >
                {s}
              </span>
            ))}
            {skills.soft.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[8px] font-medium rounded-full bg-[#0A0A0A]/5 text-[#666]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="px-8 py-5 space-y-4">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 pb-1 border-b border-[#E2E8F0] flex items-center gap-2"
              style={{ color: "var(--resume-secondary, #0A0A0A)" }}
            >
              <span
                className="h-4 w-1 rounded-full"
                style={{ background: `linear-gradient(to bottom, var(--resume-primary, #16A34A), color-mix(in srgb, var(--resume-primary, #16A34A) 60%, white))` }}
              />
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="pl-3 border-l-2"
                  style={{ borderColor: "color-mix(in srgb, var(--resume-primary, #16A34A) 30%, transparent)" }}
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[11px]" style={{ color: "var(--resume-secondary, #0A0A0A)" }}>{exp.role}</h3>
                    <span className="text-[9px] text-[#888] shrink-0 ml-2">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold" style={{ color: "var(--resume-primary, #16A34A)" }}>{exp.company}</p>
                  <div className="mt-1 text-[10.5px] text-[#444] whitespace-pre-line">
                    {exp.responsibilities}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 pb-1 border-b border-[#E2E8F0] flex items-center gap-2"
                style={{ color: "var(--resume-secondary, #0A0A0A)" }}
              >
                <span
                  className="h-4 w-1 rounded-full"
                  style={{ background: `linear-gradient(to bottom, var(--resume-primary, #16A34A), color-mix(in srgb, var(--resume-primary, #16A34A) 60%, white))` }}
                />
                Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-[10.5px]">{proj.name}</h3>
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-inherit hover:opacity-80 flex items-center"
                        >
                          <ExternalLink className="h-2 w-2" style={{ color: "var(--resume-primary, #16A34A)" }} />
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-inherit hover:opacity-80 flex items-center"
                        >
                          <GitFork className="h-2 w-2 text-[#888]" />
                        </a>
                      )}
                    </div>
                    {proj.techStack && (
                      <p className="text-[8px]" style={{ color: "var(--resume-primary, #16A34A)" }}>{proj.techStack}</p>
                    )}
                    <p className="text-[10px] text-[#444] mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education + Achievements */}
          <div className="space-y-4">
            {education.length > 0 && (
              <section>
                <h2
                  className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 pb-1 border-b border-[#E2E8F0] flex items-center gap-2"
                  style={{ color: "var(--resume-secondary, #0A0A0A)" }}
                >
                  <span
                    className="h-4 w-1 rounded-full"
                    style={{ background: `linear-gradient(to bottom, var(--resume-primary, #16A34A), color-mix(in srgb, var(--resume-primary, #16A34A) 60%, white))` }}
                  />
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-semibold text-[10.5px]">{edu.degree}</p>
                      <p className="text-[9px] font-medium" style={{ color: "var(--resume-primary, #16A34A)" }}>{edu.university}</p>
                      <p className="text-[8px] text-[#888]">
                        {edu.startYear} — {edu.endYear || "Present"}
                        {edu.cgpa ? ` · GPA: ${edu.cgpa}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(achievements.certifications || achievements.awards || achievements.extraCurriculars || achievements.volunteering) && (
              <section>
                <h2
                  className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 pb-1 border-b border-[#E2E8F0] flex items-center gap-2"
                  style={{ color: "var(--resume-secondary, #0A0A0A)" }}
                >
                  <span
                    className="h-4 w-1 rounded-full"
                    style={{ background: `linear-gradient(to bottom, var(--resume-primary, #16A34A), color-mix(in srgb, var(--resume-primary, #16A34A) 60%, white))` }}
                  />
                  Achievements
                </h2>
                <div className="text-[10px] text-[#444] space-y-1 whitespace-pre-line">
                  {achievements.certifications && <p>{achievements.certifications}</p>}
                  {achievements.awards && <p>{achievements.awards}</p>}
                  {achievements.extraCurriculars && <p>{achievements.extraCurriculars}</p>}
                  {achievements.volunteering && <p>{achievements.volunteering}</p>}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
