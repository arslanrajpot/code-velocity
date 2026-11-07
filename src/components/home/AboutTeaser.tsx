import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { founderBackground } from "@/content/company";

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser" className="surface-dark bg-charcoal py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <Eyebrow index="06" className="mb-6 text-mute">
            About Code Velocity
          </Eyebrow>
          <h2 id="about-teaser" className="type-h2 text-balance">
            Built on engineering. Driven by possibility.
          </h2>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-5 lg:col-start-8 lg:pt-14">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-paper/70">
            <p>
              Code Velocity is a new, deliberately focused studio for AI and software development.
              Our mission is simple: help ambitious businesses turn complex problems into dependable
              software — and put AI to work where it genuinely helps.
            </p>
            <p>
              What we bring is a technical foundation proven in production: our founder&apos;s years
              of building backend platforms, multi-agent AI systems and RAG pipelines, plus
              independent work that shows how we think. We&apos;re early, and we don&apos;t pretend
              otherwise.
            </p>
          </div>
          <ArrowLink href="/about" className="mt-8 text-paper">
            More about the studio
          </ArrowLink>
        </Reveal>

        <dl className="grid border-t border-white/10 sm:grid-cols-3 lg:col-span-12 lg:mt-6">
          {founderBackground.facts.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={i * 80}
              className="flex flex-col-reverse border-b border-white/10 py-8 sm:border-b-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
            >
              <dt className="mt-3 max-w-[24ch] text-paper/65">{fact.label}</dt>
              <dd className="font-display text-6xl font-medium tracking-[-0.04em] text-lime">
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="-mt-8 font-mono text-xs text-paper/40 lg:col-span-12">
          Figures describe the founder&apos;s professional background, not Code Velocity engagements.
        </p>
      </div>
    </section>
  );
}
