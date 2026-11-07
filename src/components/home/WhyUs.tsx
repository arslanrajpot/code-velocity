import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { principles } from "@/content/company";

export function WhyUs() {
  return (
    <section aria-labelledby="why-us" className="surface-light py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="max-w-5xl">
          <Eyebrow index="05" className="mb-6 text-mute-ink">
            Why Code Velocity
          </Eyebrow>
          <h2 id="why-us" className="type-h2 text-balance">
            More than code. <span className="text-charcoal/50">A partner in progress.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid border-l border-t border-charcoal/15 md:grid-cols-2">
          {principles.map((principle, i) => (
            <Reveal
              as="li"
              key={principle.title}
              delay={(i % 2) * 80}
              className="flex flex-col border-b border-r border-charcoal/15 p-7 sm:p-10"
            >
              <span className="font-mono text-sm text-mute-ink">0{i + 1}</span>
              <h3 className="type-h3 mt-8">{principle.title}</h3>
              <p className="mt-3 text-pretty text-lg leading-relaxed">{principle.statement}</p>
              <div className="mt-auto pt-10">
                <p className="eyebrow text-mute-ink">In practice</p>
                <p className="mt-3 text-pretty leading-relaxed text-mute-ink">{principle.evidence}</p>
                <Link
                  href={principle.evidenceHref}
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-medium"
                >
                  <span className="link-underline pb-0.5">See the work</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  />
                  <span className="sr-only"> for {principle.title}</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
