import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ATTRIBUTION_LABELS, getActiveCategories, projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies in AI automation, multi-agent systems, RAG pipelines and backend platforms — with clear attribution for every project.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work" },
};

const LEGEND = [
  {
    label: ATTRIBUTION_LABELS["founder-experience"],
    body: "Systems our founder engineered while working at other companies. Shown to demonstrate capability — not as Code Velocity client work.",
    marker: "bg-lime",
  },
  {
    label: ATTRIBUTION_LABELS.independent,
    body: "Products our founder designed and built independently, with source code you can inspect.",
    marker: "ring-1 ring-paper/70",
  },
  {
    label: ATTRIBUTION_LABELS.client,
    body: "Code Velocity client engagements will be added here as they are completed and cleared for publication.",
    marker: "bg-paper/25",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Our Work"
        title="Selected engineering work."
        intro={
          <p>
            Multi-agent research systems, self-grading RAG, microservices platforms and AI tools —
            the technical foundation Code Velocity is built on. Every project is labelled with
            exactly where it came from.
          </p>
        }
      >
        <dl className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {LEGEND.map((item) => (
            <div key={item.label} className="bg-ink p-6">
              <dt className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.1em] text-paper">
                <span aria-hidden="true" className={`size-1.5 ${item.marker}`} />
                {item.label}
              </dt>
              <dd className="mt-3 text-pretty text-sm leading-relaxed text-paper/60">{item.body}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-label="Projects" className="surface-dark bg-charcoal py-20 sm:py-28">
        <div className="container-site">
          <ProjectGrid projects={projects} categories={getActiveCategories()} headingLevel="h2" />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
