import type { ResumeData, TemplateType } from "@/lib/schemas";
import ClassicTemplate from "./classic";
import ModernTemplate from "./modern";
import ExecutiveTemplate from "./executive";
import CreativeTemplate from "./creative";

interface TemplateRendererProps {
  template: TemplateType;
  data: ResumeData;
  photoUrl?: string | null;
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
}: TemplateRendererProps) {
  const Component = templateMap[template];
  return <Component data={data} photoUrl={photoUrl} />;
}
