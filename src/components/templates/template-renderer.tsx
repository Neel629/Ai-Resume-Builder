import type { ResumeData, TemplateType } from "@/lib/schemas";
import type { CustomColors } from "@/store/resume-store";
import ClassicTemplate from "./classic";
import ModernTemplate from "./modern";
import ExecutiveTemplate from "./executive";
import CreativeTemplate from "./creative";

interface TemplateRendererProps {
  template: TemplateType;
  data: ResumeData;
  photoUrl?: string | null;
  customColors?: CustomColors;
}

const templateMap = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
} as const;

export default function TemplateRenderer({
  template,
  data,
  photoUrl,
  customColors,
}: TemplateRendererProps) {
  const Component = templateMap[template];

  // Inject custom colors as CSS custom properties on the wrapper
  const colorVars = customColors
    ? ({
        "--resume-primary": customColors.primary,
        "--resume-secondary": customColors.secondary,
        "--resume-font": customColors.font,
      } as React.CSSProperties)
    : {};

  return (
    <div style={colorVars}>
      <Component data={data} photoUrl={photoUrl} />
    </div>
  );
}
