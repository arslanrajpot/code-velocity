import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { TechBadge } from "@/components/ui/TechBadge";
import { AttributionBadge } from "@/components/work/AttributionBadge";
import { ProjectPreview } from "@/components/work/ProjectPreview";
import { SystemExplorer } from "@/components/work/SystemExplorer";
import { ATTRIBUTION_LABELS, getNextProject, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
    },
    twitter: { title: `${project.name} — ${project.tagline}`, description: project.summary },
  };
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <Eyebrow index={index} className="mb-6 opacity-80">
      {children}
    </Eyebrow>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const attributionLabel = ATTRIBUTION_LABELS[project.attribution.type];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.tagline,
    description: project.overview,
    url: `${site.url}/work/${project.slug}`,
    genre: project.category,
    keywords: project.stack.join(", "),
    creator: { "@type": "Person", name: site.founder.name },
    ...(project.repo ? { codeRepository: project.repo } : {}),
  };

  return (
    <article>
      {/* Header */}
      <header className="surface-dark relative overflow-hidden bg-ink">
        <div className="container-site relative pb-16 pt-10 sm:pt-14">
          <nav aria-label="Breadcrumb" className="fade-up">
            <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-mute">
              <li>
                <Link href="/work" className="link-underline inline-flex items-center gap-2 hover:text-paper">
                  <ArrowLeft aria-hidden="true" className="size-3.5" />
                  Our Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate text-paper/70">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="fade-up flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-mute">
                  {project.category}
                </span>
                <AttributionBadge type={project.attribution.type} />
              </div>
              <h1 className="type-h1 line-mask mt-7 text-balance">
                <span>{project.name}</span>
              </h1>
              <p
                className="fade-up mt-6 font-display text-2xl tracking-[-0.02em] text-lime sm:text-3xl"
                style={{ "--delay": "150ms" } as React.CSSProperties}
              >
                {project.tagline}
              </p>
              <p
                className="fade-up mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-paper/70"
                style={{ "--delay": "220ms" } as React.CSSProperties}
              >
                {project.overview}
              </p>
            </div>

            <dl
              className="fade-up grid grid-cols-2 content-start gap-px self-end border border-white/10 bg-white/10 lg:col-span-4 lg:col-start-9"
              style={{ "--delay": "300ms" } as React.CSSProperties}
            >
              {[
                ["Attribution", attributionLabel],
                ["Period", project.period],
                ["Category", project.category],
                ["Source", project.repo ? "GitHub" : "Proprietary"],
              ].map(([term, value]) => (
                <div key={term} className="bg-ink p-5">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-mute">{term}</dt>
                  <dd className="mt-2 text-paper">
                    {term === "Source" && project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-1.5"
                      >
                        View on GitHub
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="fade-up mt-16" style={{ "--delay": "380ms" } as React.CSSProperties}>
            <ProjectPreview project={project} size="wide" />
          </div>
        </div>
      </header>

      {/* Challenge & solution */}
      <section aria-label="Challenge and solution" className="surface-light py-24 sm:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <SectionLabel index="01">The challenge</SectionLabel>
            <p className="type-h3 max-w-xl text-pretty">{project.challenge}</p>
          </Reveal>
          <Reveal delay={100} className="lg:pt-40">
            <SectionLabel index="02">The solution</SectionLabel>
            <p className="max-w-xl text-pretty text-xl leading-relaxed text-mute-ink">{project.solution}</p>
          </Reveal>
        </div>

        <div className="container-site mt-24">
          <Reveal>
            <SectionLabel index="03">Key features</SectionLabel>
          </Reveal>
          <ul className="grid border-l border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, i) => (
              <Reveal
                as="li"
                key={feature}
                delay={(i % 3) * 60}
                className="border-b border-r border-charcoal/15 p-6 sm:p-8"
              >
                <span className="font-mono text-sm text-mute-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 text-pretty text-lg leading-snug">{feature}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Engineering approach */}
      <section aria-labelledby="approach" className="surface-dark bg-charcoal py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="04">Engineering approach</SectionLabel>
            <h2 id="approach" className="type-h2 text-balance">
              How it&apos;s built.
            </h2>
            <ul className="mt-10 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <TechBadge name={tech} />
                </li>
              ))}
            </ul>
          </Reveal>
          <ol className="border-t border-white/10 lg:col-span-7 lg:col-start-6">
            {project.approach.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 50} className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-lime">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-pretty text-lg leading-relaxed text-paper/80">{item}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* System views (gallery) */}
      <section aria-labelledby="gallery" className="surface-dark bg-ink py-24 sm:py-32">
        <div className="container-site">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="05">Project gallery</SectionLabel>
              <h2 id="gallery" className="type-h2 text-balance">
                Inside the system.
              </h2>
            </div>
            <p className="text-pretty leading-relaxed text-paper/60 lg:col-span-5">
              {project.gallery.length > 0
                ? "Screenshots and architecture of the delivered system."
                : "Architecture views drawn from the project's documented design" +
                  (project.repo ? " and its public source code." : ".")}
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <SystemExplorer systems={project.systems} />
          </Reveal>

          {project.gallery.length > 0 && (
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <figure className="border border-white/10 bg-charcoal">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                    {image.caption && (
                      <figcaption className="border-t border-white/10 px-5 py-3 text-sm text-paper/60">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          )}

          {project.repoTree && (
            <Reveal className="mt-6">
              <figure className="border border-white/10 bg-charcoal">
                <figcaption className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-mute sm:flex-row sm:items-center sm:justify-between">
                  <span>Repository map</span>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1.5 normal-case tracking-normal text-paper/70 hover:text-paper"
                    >
                      {project.repo.replace("https://", "")}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </figcaption>
                <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-paper/75 sm:p-8">
                  <code>{project.repoTree}</code>
                </pre>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* Outcome */}
      <section aria-labelledby="outcome" className="surface-light py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="06">Outcome</SectionLabel>
            <h2 id="outcome" className="type-h2 text-balance">
              What it delivered.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-mute-ink">{project.outcomeSummary}</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-charcoal/15">
              {project.outcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="flex flex-col-reverse gap-2 border-b border-charcoal/15 py-8 sm:flex-row-reverse sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <dt className="max-w-xs text-pretty text-mute-ink sm:text-right">{outcome.label}</dt>
                  <dd className="font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.04em]">
                    {outcome.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-mono text-xs text-mute-ink">
              As published in the founder&apos;s portfolio. No figures on this page are estimates or
              projections.
            </p>
          </Reveal>
        </div>

        {/* Attribution */}
        <div className="container-site mt-24">
          <Reveal className="grid gap-8 border border-charcoal/15 bg-paper-dim p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel index="07">Project attribution</SectionLabel>
              <AttributionBadge type={project.attribution.type} tone="light" />
            </div>
            <div className="lg:col-span-8">
              <p className="text-pretty text-lg leading-relaxed">{project.attribution.context}</p>
              <p className="mt-6 text-sm text-mute-ink">
                Sources:{" "}
                {project.sources.map((source, i) => (
                  <span key={source.href}>
                    {i > 0 && " · "}
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-charcoal/30 underline-offset-4 hover:decoration-charcoal"
                    >
                      {source.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next project / start a project */}
      <nav aria-label="More" className="surface-dark grid bg-ink md:grid-cols-2">
        <Link
          href={`/work/${next.slug}`}
          className="group border-b border-white/10 p-8 transition-colors hover:bg-charcoal sm:p-14 md:border-b-0 md:border-r"
        >
          <span className="eyebrow text-mute">Next project</span>
          <span className="type-h2 mt-6 block text-balance">{next.name}</span>
          <span className="mt-4 block text-paper/60">{next.tagline}</span>
          <ArrowRight
            aria-hidden="true"
            className="mt-10 size-7 text-lime transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2"
          />
        </Link>
        <div className="flex flex-col justify-between gap-10 p-8 sm:p-14">
          <div>
            <span className="eyebrow text-mute">Building something similar?</span>
            <p className="type-h2 mt-6 text-balance">Let&apos;s talk about your project.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Start Your Project
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary">
              All Projects
            </ButtonLink>
          </div>
        </div>
      </nav>

      <JsonLd data={jsonLd} />
    </article>
  );
}
