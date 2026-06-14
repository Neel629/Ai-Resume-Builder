import type { ResumeData } from "@/lib/schemas";
import { Mail, Phone, MapPin, Link2, GitFork, Globe, ExternalLink } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  photoUrl?: string | null;
}

export default function ModernTemplate({ data, photoUrl }: TemplateProps) {
  const { personalInfo, education, experience, skills, projects, achievements } = data;

  return (
    <div
      className="w-full bg-white font-['Inter',sans-serif] text-[11px] leading-[1.5]"
      style={{ color: "var(--resume-font, #1a1a1a)" }}
    >
      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-[30%] text-white min-h-full p-5"
          style={{ backgroundColor: "var(--resume-secondary, #0A0A0A)" }}
        >
          {/* Photo */}
          {photoUrl && (
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={personalInfo.fullName}
                className="w-full aspect-square rounded-xl object-cover"
              />
            </div>
          )}

          {/* Contact */}
          <div className="mb-5">
            <h2
              className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--resume-primary, #4ADE80)" }}
            >
              Contact
            </h2>
            <div className="space-y-1.5 text-[9.5px] text-white/70">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-1.5 text-inherit no-underline hover:underline"
                >
                  <Mail className="h-2.5 w-2.5 mt-0.5 shrink-0" style={{ color: "var(--resume-primary, #4ADE80)" }} />
                  <span className="break-all">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-1.5 text-inherit no-underline hover:underline"
                >
                  <Phone className="h-2.5 w-2.5 shrink-0" style={{ color: "var(--resume-primary, #4ADE80)" }} />
                  {personalInfo.phone}
                </a>
              )}
              {personalInfo.city && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-2.5 w-2.5 shrink-0" style={{ color: "var(--resume-primary, #4ADE80)" }} />
                  {personalInfo.city}
                </div>
              )}
              {personalInfo.Link2 && (
                <a
                  href={personalInfo.Link2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-inherit no-underline hover:underline"
                >
                  <Link2 className="h-2.5 w-2.5 shrink-0" style={{ color: "var(--resume-primary, #4ADE80)" }} />
                  Link2
                </a>
              )}
              {personalInfo.GitFork && (
                <a
                  href={personalInfo.GitFork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-inherit no-underline hover:underline"
                >
                  <GitFork className="h-2.5 w-2.5 shrink-0" style={{ color: "var(--resume-primary, #4ADE80)" }} />
                  GitFork
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-inherit no-underline hover:underline"
                >
                  <Globe className="h-2.5 w-2.5 shrink-0" style={{ color: "var(--resume-primary, #4ADE80)" }} />
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {/* Skills */}
          {(skills.technical.length > 0 || skills.tools.length > 0 || skills.soft.length > 0) && (
            <div className="mb-5">
              <h2
                className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--resume-primary, #4ADE80)" }}
              >
                Skills
              </h2>
              {skills.technical.length > 0 && (
                <div className="mb-2">
                  <p className="text-[8px] uppercase tracking-wider text-white/40 mb-1">Technical</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.technical.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 text-[8px] rounded bg-white/10 text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div className="mb-2">
                  <p className="text-[8px] uppercase tracking-wider text-white/40 mb-1">Tools</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.tools.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 text-[8px] rounded bg-white/10 text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-white/40 mb-1">Soft Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.soft.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 text-[8px] rounded bg-white/10 text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Education in sidebar */}
          {education.length > 0 && (
            <div>
              <h2
                className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: "var(--resume-primary, #4ADE80)" }}
              >
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[10px] font-semibold text-white">{edu.degree}</p>
                    <p className="text-[9px] text-white/60">{edu.university}</p>
                    <p className="text-[8px] text-white/40">
                      {edu.startYear} — {edu.endYear || "Present"}
                    </p>
                    {edu.cgpa && <p className="text-[8px] text-white/40">GPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-4">
          {/* Name */}
          <div className="mb-4">
            <h1
              className="text-2xl font-['DM_Sans',sans-serif] font-bold tracking-tight"
              style={{ color: "var(--resume-secondary, #0A0A0A)" }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            {personalInfo.summary && (
              <p className="text-[10.5px] text-[#666] mt-1.5 leading-relaxed">
                {personalInfo.summary}
              </p>
            )}
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-2"
                style={{ color: "var(--resume-secondary, #0A0A0A)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--resume-primary, #16A34A)" }} />
                Experience
              </h2>
              <div className="space-y-3 border-l-2 border-[#E2E8F0] pl-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11px]">{exp.role}</h3>
                      <span className="text-[9px] text-[#888] shrink-0 ml-2">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-2"
                style={{ color: "var(--resume-secondary, #0A0A0A)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--resume-primary, #16A34A)" }} />
                Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[11px]">{proj.name}</h3>
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-inherit hover:opacity-80 flex items-center"
                        >
                          <ExternalLink className="h-2.5 w-2.5" style={{ color: "var(--resume-primary, #16A34A)" }} />
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-inherit hover:opacity-80 flex items-center"
                        >
                          <GitFork className="h-2.5 w-2.5 text-[#888]" />
                        </a>
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
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 flex items-center gap-2"
                style={{ color: "var(--resume-secondary, #0A0A0A)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--resume-primary, #16A34A)" }} />
                Achievements
              </h2>
              <div className="space-y-1 text-[10.5px] text-[#444] whitespace-pre-line">
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
  );
}
