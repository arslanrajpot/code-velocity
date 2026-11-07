import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { TechBadge } from "@/components/ui/TechBadge";
import { expertise } from "@/content/expertise";

export function Expertise() {
  return (
    <section aria-labelledby="expertise" className="surface-dark bg-ink py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="04" className="mb-6 text-mute">
              Technical expertise
            </Eyebrow>
            <h2 id="expertise" className="type-h2 text-balance">
              Built with the right technology.
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5 lg:pt-12">
            <p className="text-pretty text-lg leading-relaxed text-paper/65">
              We choose tools for the problem, not the trend. Everything listed here has been used
              in shipped work or in the projects on this site — nothing more.
            </p>
          </Reveal>
        </div>

        <dl className="mt-16 border-t border-white/10">
          {expertise.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i * 50}
              className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-12 md:gap-10"
            >
              <dt className="md:col-span-3">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-lime">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl tracking-[-0.02em]">{group.group}</span>
                </span>
              </dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechBadge name={item} />
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
