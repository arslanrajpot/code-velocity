import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { engineeringPrinciples, founderBackground, processSteps } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Code Velocity is an emerging AI and software development studio, built on production engineering experience in backend platforms, multi-agent AI and RAG systems.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Code Velocity"
        title="Built on engineering. Driven by possibility."
        intro={
          <p>
            Code Velocity is an AI and software development studio built on a technical foundation
            proven in production — backend platforms, multi-agent AI and RAG systems shipped and
            running today. We&apos;re new as a studio, and we&apos;d rather tell you that than
            pretend otherwise.
          </p>
        }
      />

      {/* Mission */}
      <section aria-labelledby="mission" className="surface-light py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="01" className="mb-6 text-mute-ink">
              Our mission
            </Eyebrow>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-8">
            <h2 id="mission" className="type-h2 text-balance">
              Help ambitious businesses turn complex problems into dependable software — and put AI
              to work where it genuinely helps.
            </h2>
            <div className="mt-10 grid gap-8 text-pretty text-lg leading-relaxed text-mute-ink md:grid-cols-2">
              <p>
                Plenty of software gets built. Less of it solves the problem it was meant to, keeps
                working as the business grows, and can be changed without fear. That&apos;s the bar
                we hold ourselves to.
              </p>
              <p>
                With AI, the bar matters even more. A convincing demo is easy; a system you can
                trust with real work needs grounding, evaluation and a clear path for when the model
                isn&apos;t sure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy" className="surface-dark bg-charcoal py-24 sm:py-32">
        <div className="container-site">
          <Reveal className="max-w-4xl">
            <Eyebrow index="02" className="mb-6 text-mute">
              Development philosophy
            </Eyebrow>
            <h2 id="philosophy" className="type-h2 text-balance">
              Four rules we don&apos;t bend.
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {engineeringPrinciples.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={(i % 2) * 80} className="bg-charcoal p-7 sm:p-10">
                <span className="font-mono text-sm text-lime">0{i + 1}</span>
                <h3 className="type-h3 mt-8">{principle.title}</h3>
                <p className="mt-4 max-w-md text-pretty leading-relaxed text-paper/65">{principle.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Founder foundation */}
      <section aria-labelledby="foundation" className="surface-dark bg-ink py-24 sm:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="03" className="mb-6 text-mute">
              Technical foundation
            </Eyebrow>
            <h2 id="foundation" className="type-h2 text-balance">
              The experience behind the studio.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-paper/70">
              {founderBackground.summary}
            </p>
            <div className="mt-10 border-l-2 border-lime pl-5">
              <p className="font-display text-xl tracking-[-0.02em]">{site.founder.name}</p>
              <p className="mt-1 text-paper/60">{site.founder.title}</p>
              <div className="mt-4 flex gap-6 text-sm">
                <ArrowLink href={site.founder.linkedin} external className="text-paper">
                  LinkedIn
                </ArrowLink>
                <ArrowLink href={site.founder.github} external className="text-paper">
                  GitHub
                </ArrowLink>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="eyebrow mb-5 text-mute">Founder background</h3>
            </Reveal>
            <ol className="border-t border-white/10">
              {founderBackground.roles.map((role, i) => (
                <Reveal as="li" key={role.org} delay={i * 60} className="border-b border-white/10 py-7">
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-lime">{role.period}</p>
                  <p className="mt-3 font-display text-2xl tracking-[-0.02em]">{role.org}</p>
                  <p className="mt-1 text-paper/60">
                    {role.role} · {role.place}
                  </p>
                  <p className="mt-4 text-pretty leading-relaxed text-paper/70">{role.note}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <p className="mt-7 text-paper/60">{founderBackground.education}</p>
              <p className="mt-6 font-mono text-xs leading-relaxed text-paper/40">
                This is the founder&apos;s professional history. Work done for these employers is
                presented on this site as founder experience, never as Code Velocity client work.
              </p>
            </Reveal>
          </div>

          <dl className="grid border-t border-white/10 sm:grid-cols-3 lg:col-span-12">
            {founderBackground.facts.map((fact, i) => (
              <Reveal
                key={fact.label}
                delay={i * 80}
                className="flex flex-col-reverse border-b border-white/10 py-8 sm:border-b-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
              >
                <dt className="mt-3 max-w-[24ch] text-paper/65">{fact.label}</dt>
                <dd className="font-display text-6xl font-medium tracking-[-0.04em] text-lime">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="working-together" className="surface-light py-24 sm:py-32">
        <div className="container-site">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="04" className="mb-6 text-mute-ink">
                Working together
              </Eyebrow>
              <h2 id="working-together" className="type-h2 text-balance">
                A clear path from first call to launch.
              </h2>
            </div>
            <p className="text-pretty text-lg leading-relaxed text-mute-ink lg:col-span-5">
              Every engagement follows the same four stages, each ending in something you can review.
            </p>
          </Reveal>
          <ol className="mt-14 grid border-l border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.id} delay={i * 60} className="border-b border-r border-charcoal/15 p-6 sm:p-8">
                <span className="font-mono text-sm text-mute-ink">{step.index}</span>
                <h3 className="type-h3 mt-10">{step.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-mute-ink">{step.summary}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
