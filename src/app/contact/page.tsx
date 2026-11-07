import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us what you're building. Share a few details about your project and we'll reply by email to arrange a conversation.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const NEXT_STEPS = [
  { title: "We read your inquiry", body: "Every message is read by a person, not a sales funnel." },
  { title: "We reply by email", body: "With any questions and a time to talk through your project." },
  { title: "We map the way forward", body: "An honest view of approach, scope and whether we're the right fit." },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="surface-light">
      <div className="container-site grid gap-14 pb-24 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <div className="lg:col-span-5">
          <p className="eyebrow fade-up mb-8 flex items-center gap-3 text-mute-ink">
            <span aria-hidden="true" className="size-1.5 bg-lime" />
            Start a project
          </p>
          <h1 id="contact-title" className="type-h1 line-mask text-balance">
            <span>Tell us what you&apos;re building.</span>
          </h1>
          <p
            className="fade-up mt-8 max-w-md text-pretty text-lg leading-relaxed text-mute-ink"
            style={{ "--delay": "150ms" } as React.CSSProperties}
          >
            A new product, an existing system that needs work, or an idea for AI automation — share
            a few details and we&apos;ll take it from there.
          </p>

          <ol
            className="fade-up mt-12 border-t border-charcoal/15"
            style={{ "--delay": "250ms" } as React.CSSProperties}
          >
            {NEXT_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 border-b border-charcoal/15 py-5">
                <span className="font-mono text-sm text-mute-ink">0{i + 1}</span>
                <span>
                  <span className="block font-medium">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-mute-ink">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="fade-up mt-10 space-y-2" style={{ "--delay": "300ms" } as React.CSSProperties}>
            <p className="eyebrow text-mute-ink">Prefer email?</p>
            <ArrowLink href={`mailto:${site.contact.email}`} className="text-lg text-charcoal">
              {site.contact.email}
            </ArrowLink>
          </div>
        </div>

        <div
          className="fade-up lg:col-span-6 lg:col-start-7"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          <div className="border border-charcoal/15 bg-paper-dim p-5 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
