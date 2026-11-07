import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

/** Cached so reading the clock doesn't opt the shared footer out of prerendering. */
async function CopyrightYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

const linkClass = "link-underline text-paper/65 transition-colors hover:text-paper";

export function SiteFooter() {
  return (
    <footer className="surface-dark border-t border-white/10 bg-ink">
      <div className="container-site grid gap-14 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label={`${site.name} — home`} className="inline-block">
            <Logo />
          </Link>
          <p className="mt-6 max-w-sm text-pretty text-paper/65">
            An AI and software development studio. We build custom software, AI automation and
            digital products for ambitious businesses.
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="link-underline mt-8 inline-block font-mono text-sm text-paper"
          >
            {site.contact.email}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <h2 className="eyebrow mb-5 text-paper/45">Services</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5 text-paper/45">Studio</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <Link href="/work" className={linkClass}>
                  Our Work
                </Link>
              </li>
              <li>
                <Link href={`/work/${projects[0].slug}`} className={linkClass}>
                  Featured case study
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5 text-paper/45">Founder</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={site.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.founder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <Link href="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
