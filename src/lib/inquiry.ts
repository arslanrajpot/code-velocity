/** Shared inquiry schema and validation — used by the form and the API route. */

export const SERVICE_OPTIONS = [
  { value: "ai-automation", label: "AI Development & Automation" },
  { value: "custom-software", label: "Custom Software Development" },
  { value: "web-saas", label: "Web Applications & SaaS" },
  { value: "backend-apis", label: "API Integration & Backend Engineering" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const BUDGET_OPTIONS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Flexible / exploring",
] as const;

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  service: string;
  overview: string;
  budget: string;
  timeline: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 120, email: 254, company: 160, overview: 5000 } as const;
export const OVERVIEW_MIN = 20;

/** Coerces unknown input (FormData or JSON) into a trimmed Inquiry. */
export function toInquiry(input: Record<string, unknown>): Inquiry {
  const text = (key: string) => (typeof input[key] === "string" ? (input[key] as string).trim() : "");
  return {
    name: text("name"),
    email: text("email"),
    company: text("company"),
    service: text("service"),
    overview: text("overview"),
    budget: text("budget"),
    timeline: text("timeline"),
  };
}

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!inquiry.name) errors.name = "Please tell us your name.";
  else if (inquiry.name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!inquiry.email) errors.email = "Please enter your work email.";
  else if (inquiry.email.length > LIMITS.email || !EMAIL_PATTERN.test(inquiry.email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (inquiry.company.length > LIMITS.company) errors.company = "That company name is too long.";

  if (!SERVICE_OPTIONS.some((option) => option.value === inquiry.service))
    errors.service = "Please choose the service you need.";

  if (inquiry.overview.length < OVERVIEW_MIN)
    errors.overview = `Please share a little more about your project (at least ${OVERVIEW_MIN} characters).`;
  else if (inquiry.overview.length > LIMITS.overview)
    errors.overview = `Please keep the overview under ${LIMITS.overview.toLocaleString("en-US")} characters.`;

  if (inquiry.budget && !(BUDGET_OPTIONS as readonly string[]).includes(inquiry.budget))
    errors.budget = "Please choose a budget range from the list.";

  if (inquiry.timeline && !(TIMELINE_OPTIONS as readonly string[]).includes(inquiry.timeline))
    errors.timeline = "Please choose a timeline from the list.";

  return errors;
}

export function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
