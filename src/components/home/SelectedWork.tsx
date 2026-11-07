import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { getActiveCategories, projects } from "@/content/projects";

const FEATURED = projects.slice(0, 3);

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work" className="surface-dark bg-charcoal py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="02" className="mb-6 text-mute">
              Selected work
            </Eyebrow>
            <h2 id="selected-work" className="type-h2 text-balance">
              Ideas engineered into reality.
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5">
            <p className="text-pretty text-lg leading-relaxed text-paper/65">
              Production systems and independent builds from our founder&apos;s engineering
              background — each labelled clearly, so you always know whose work you&apos;re looking
              at and where it was built.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-16">
          <ProjectGrid projects={FEATURED} categories={getActiveCategories(FEATURED)} />
        </div>

        <Reveal className="mt-20 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-paper/65">
            {projects.length} case studies, from multi-agent research systems to microservices
            platforms and independent AI builds.
          </p>
          <ButtonLink href="/work" size="lg">
            Explore All Projects
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
