/**
 * Company-wide facts. Everything here is shown publicly — keep it verified.
 *
 * Contact details and profiles below come from the founder's published
 * portfolio (https://arslan-arshad.netlify.app/). Replace them with company
 * accounts (e.g. a company inbox or LinkedIn page) once those exist.
 */
export const site = {
  name: "Code Velocity",
  tagline: "We Build Technology That Builds Your Business.",
  description:
    "Code Velocity is an AI and software development studio. We design and develop custom software, AI-powered solutions, and digital products that help businesses solve complex challenges, work smarter, and move forward.",
  shortDescription:
    "An AI and software development studio building custom software, AI automation, SaaS platforms, and backend systems.",
  /** Set NEXT_PUBLIC_SITE_URL in production; used for canonical URLs, sitemap and social previews. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  contact: {
    email: "contact@thecodevelocity.com",
  },
  founder: {
    name: "Arslan Arshad",
    title: "Founder · Backend & AI Engineering",
    linkedin: "https://www.linkedin.com/in/arslanarshad-dev/",
    github: "https://github.com/arslanrajpot/",
    portfolio: "https://arslan-arshad.netlify.app/",
  },
} as const;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
