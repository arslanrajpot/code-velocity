import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { AttributionBadge } from "@/components/work/AttributionBadge";
import { getProject } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development and automation, custom software, web applications and SaaS, and API and backend engineering — built around your business.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.short,
      url: `${site.url}/services#${service.id}`,
      provider: { "@type": "Organization", name: site.name, url: site.url },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Engineering for the problems that matter to your business."
        intro={
          <p>
            Four disciplines, one standard: software that solves a real problem, holds up in
            production, and can grow with you. Most projects combine more than one.
          </p>
        }
      >
        <nav aria-label="Services on this page">
          <ul className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id} className="border-b border-white/10 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6 sm:odd:pr-6">
                <a
                  href={`#${service.id}`}
                  className="group flex items-start justify-between gap-4 py-5 text-paper/75 transition-colors hover:text-paper"
                >
                  <span className="flex gap-3">
                    <span className="font-mono text-xs text-lime">{service.index}</span>
                    <span className="text-[0.9375rem] leading-snug">{service.title}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 rotate-90 opacity-50 transition-transform group-hover:translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((service, i) => {
        const light = i % 2 === 0;
        const related = service.relatedProjects
          .map((slug) => getProject(slug))
          .filter((project) => project !== undefined);

        return (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-title`}
            className={cn(
              "scroll-mt-16 py-24 sm:py-32",
              light ? "surface-light" : "surface-dark bg-charcoal",
            )}
          >
            <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-5">
                <p className={cn("font-mono text-sm", light ? "text-mute-ink" : "text-lime")}>
                  {service.index} / 04
                </p>
                <h2 id={`${service.id}-title`} className="type-h2 mt-6 text-balance">
                  {service.title}
                </h2>
                <p
                  className={cn(
                    "mt-6 text-pretty text-lg leading-relaxed",
                    light ? "text-mute-ink" : "text-paper/70",
                  )}
                >
                  {service.intro}
                </p>
                <ButtonLink
                  href={`/contact?service=${service.id}`}
                  variant={light ? "dark" : "primary"}
                  className="mt-9"
                >
                  Discuss this service
                </ButtonLink>
              </Reveal>

              <div className="space-y-14 lg:col-span-6 lg:col-start-7">
                <Reveal delay={60}>
                  <h3 className={cn("eyebrow mb-5", light ? "text-mute-ink" : "text-mute")}>
                    What we build
                  </h3>
                  <ul className={cn("border-t", light ? "border-charcoal/15" : "border-white/10")}>
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className={cn(
                          "flex items-baseline gap-4 border-b py-4 text-lg",
                          light ? "border-charcoal/15" : "border-white/10",
                        )}
                      >
                        <span aria-hidden="true" className="size-1.5 shrink-0 -translate-y-0.5 bg-lime" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={90}>
                  <h3 className={cn("eyebrow mb-5", light ? "text-mute-ink" : "text-mute")}>
                    A good fit when
                  </h3>
                  <ul className="space-y-3">
                    {service.fitWhen.map((item) => (
                      <li
                        key={item}
                        className={cn("text-pretty leading-relaxed", light ? "text-mute-ink" : "text-paper/70")}
                      >
                        “{item}”
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={120}>
                  <h3 className={cn("eyebrow mb-5", light ? "text-mute-ink" : "text-mute")}>
                    Typical technologies
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <li key={tech}>
                        <TechBadge name={tech} tone={light ? "light" : "dark"} />
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {related.length > 0 && (
                  <Reveal delay={150}>
                    <h3 className={cn("eyebrow mb-5", light ? "text-mute-ink" : "text-mute")}>
                      Related work
                    </h3>
                    <ul className={cn("border-t", light ? "border-charcoal/15" : "border-white/10")}>
                      {related.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/work/${project.slug}`}
                            className={cn(
                              "group flex flex-col gap-3 border-b py-5 sm:flex-row sm:items-center sm:justify-between",
                              light ? "border-charcoal/15" : "border-white/10",
                            )}
                          >
                            <span className="font-display text-xl tracking-[-0.02em]">
                              <span className="link-underline pb-0.5">{project.name}</span>
                            </span>
                            <span className="flex items-center gap-4">
                              <AttributionBadge
                                type={project.attribution.type}
                                tone={light ? "light" : "dark"}
                              />
                              <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                              />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <CtaSection
        title={
          <>
            Not sure which service fits? <span className="text-lime">Start with the problem.</span>
          </>
        }
        description="Tell us what you're trying to achieve. We'll help you work out what to build — and what not to."
      />
      <JsonLd data={servicesJsonLd} />
    </>
  );
}
