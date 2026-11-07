import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { services } from "@/content/services";

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do" className="surface-light py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index="01" className="mb-6 text-mute-ink">
              What we do
            </Eyebrow>
            <h2 id="what-we-do" className="type-h2 text-balance">
              Technology built around your ambitions.
            </h2>
            <p className="mt-6 max-w-sm text-pretty text-lg leading-relaxed text-mute-ink">
              Four disciplines, one engineering standard. Most projects draw on more than one — an
              AI feature still needs a solid backend underneath it.
            </p>
            <ArrowLink href="/services" className="mt-8 text-charcoal">
              Explore our services
            </ArrowLink>
          </div>
        </Reveal>

        <ol className="border-t border-charcoal/15 lg:col-span-8">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 60} className="border-b border-charcoal/15">
              <Link
                href={`/services#${service.id}`}
                className="group relative grid gap-5 py-9 sm:grid-cols-[4rem_1fr_auto] sm:gap-6 sm:py-11"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-4 right-0 origin-bottom scale-y-0 bg-paper-dim transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 sm:-left-6"
                />
                <span className="relative font-mono text-sm text-mute-ink">{service.index}</span>
                <span className="relative">
                  <span className="type-h3 block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {service.title}
                  </span>
                  <span className="mt-3 block max-w-xl text-pretty leading-relaxed text-mute-ink">
                    {service.short}
                  </span>
                  <span className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.08em] text-charcoal/60">
                    {service.capabilities.slice(0, 3).map((capability) => (
                      <span
                        key={capability}
                        className="before:mr-4 before:text-charcoal/30 before:content-['/'] first:before:hidden"
                      >
                        {capability}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="relative hidden size-12 place-items-center border border-charcoal/15 transition-colors duration-300 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-lime sm:grid">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
