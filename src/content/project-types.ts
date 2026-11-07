/** Project types and labels — safe to import from client components. */

export const CATEGORIES = [
  "AI & Automation",
  "Web Applications",
  "Backend Systems",
  "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type AttributionType = "founder-experience" | "independent" | "client";

export const ATTRIBUTION_LABELS: Record<AttributionType, string> = {
  "founder-experience": "Founder Experience",
  independent: "Independent Project",
  client: "Client Engagement",
};

export type SystemStep = { title: string; detail: string };

export type SystemView = {
  id: string;
  label: string;
  title: string;
  summary: string;
  steps: SystemStep[];
  decisions: string[];
};

export type Outcome = { value: string; label: string };

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** The single category used for the card label. */
  category: Category;
  /** All categories the project can be filtered by. */
  categories: Category[];
  attribution: { type: AttributionType; context: string };
  period: string;
  tagline: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  approach: string[];
  stack: string[];
  /** Reported outcomes, as published by the founder. */
  outcomes: Outcome[];
  outcomeSummary: string;
  systems: SystemView[];
  /** The big figure shown on the project preview. */
  signal: Outcome;
  repo?: string;
  repoTree?: string;
  /** Real screenshots or recordings. Leave empty rather than using mock-ups. */
  gallery: GalleryImage[];
  sources: { label: string; href: string }[];
};
