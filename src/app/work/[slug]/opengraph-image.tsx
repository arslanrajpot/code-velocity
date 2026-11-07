import { ATTRIBUTION_LABELS, getProject, projects } from "@/content/projects";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Code Velocity case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug) ?? projects[0];
  return renderOgImage({
    eyebrow: `Case study · ${ATTRIBUTION_LABELS[project.attribution.type]}`,
    title: project.name,
    subtitle: project.tagline,
  });
}
