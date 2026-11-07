import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { ProcessTimeline } from "./ProcessTimeline";

export function HowWeBuild() {
  return (
    <section aria-labelledby="how-we-build" className="surface-light py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <Eyebrow index="03" className="mb-6 text-mute-ink">
              How we build
            </Eyebrow>
            <h2 id="how-we-build" className="type-h2 max-w-[16ch] text-balance">
              From your challenge to a working solution.
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-4">
            <p className="text-pretty text-lg leading-relaxed text-mute-ink">
              Four stages, each ending in something you can review — so decisions are made with you,
              not handed to you.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <ProcessTimeline />
        </Reveal>
      </div>
    </section>
  );
}
