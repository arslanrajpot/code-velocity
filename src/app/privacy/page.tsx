import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const LAST_UPDATED = "21 October 2026";

const SECTIONS = [
  {
    title: "What we collect",
    body: [
      "When you send a project inquiry, we receive the details you enter: your name, work email, company (if provided), the service you're interested in, your project overview, and optional budget and timeline ranges.",
      "We don't use advertising trackers or analytics cookies on this website, and we don't ask you to create an account.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use inquiry details only to reply to you, understand your project, and continue the conversation you started. We don't sell your information or use it for unrelated marketing.",
    ],
  },
  {
    title: "How it's delivered and stored",
    body: [
      "Inquiries are delivered to our inbox by email through Resend, an email delivery provider, which processes the message on our behalf. Like most websites, our hosting provider may keep standard server logs (such as IP addresses) for security and reliability.",
      "We keep inquiry emails for as long as they're useful for the conversation and any resulting project, then delete them.",
    ],
  },
  {
    title: "Your choices",
    body: [
      `You can ask us at any time to access, correct or delete the information you've sent us. Email ${site.contact.email} and we'll respond promptly.`,
    ],
  },
  {
    title: "Changes",
    body: [
      "If we change how we handle information, we'll update this page and the date below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        intro={<p>Plain language, no surprises. Here&apos;s what happens to the information you share with us.</p>}
      />
      <section className="surface-light py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-mute-ink lg:col-span-3">
            Last updated {LAST_UPDATED}
          </p>
          <div className="max-w-2xl space-y-14 lg:col-span-8 lg:col-start-5">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="type-h3">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-pretty text-lg leading-relaxed text-mute-ink">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
