import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";

const faqs = [
  {
    question: "What does an AI and software development studio actually build?",
    answer:
      "Custom AI agents, retrieval-augmented (RAG) assistants grounded in your own data, AI chatbots and automation, and the full-stack software — backends, APIs, dashboards and SaaS platforms — those systems run on. Most projects combine more than one of these, since an AI feature still needs a solid backend underneath it.",
  },
  {
    question: "How much does custom AI development cost?",
    answer:
      "It depends on scope — a focused RAG assistant is a different project from a multi-agent platform with billing and multi-tenant access control. We scope cost and timeline together during the Discover stage, before any commitment, based on your actual requirements rather than a generic package price.",
  },
  {
    question: "What is RAG (retrieval-augmented generation), and why does it matter?",
    answer:
      "RAG grounds an AI system's answers in your own documents or data instead of the model's general training, so it can cite real information rather than guess. It matters most anywhere a confident-sounding wrong answer is worse than no answer — compliance, customer support, internal knowledge bases — which is why several of our case studies use it with added confidence scoring.",
  },
  {
    question: "How long does it take to build an AI chatbot or automation system?",
    answer:
      "A focused assistant or automation can move from Discover to a working first version in weeks, not months, when the scope is kept tight. Larger platforms with multiple services, billing or multi-tenant access take longer. We sequence milestones so you see and can test working software early rather than waiting for one big reveal.",
  },
  {
    question: "Is Code Velocity a fit for a small business or startup, or only larger companies?",
    answer:
      "Both — the same engineering standard applies regardless of size. What changes is scope: a small business might need one well-built AI feature or automation, while a larger team might need a full platform with multiple services. We'd rather scope something you'll actually use than oversell a bigger build.",
  },
  {
    question: "Do you work with international or remote clients?",
    answer:
      "Yes — we work remotely with clients across the US, Europe and elsewhere, and our process (Discover, Design, Develop, Deliver) is built around async, written updates and scheduled calls rather than requiring co-location.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function FAQ() {
  return (
    <section aria-labelledby="faq" className="surface-light py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <Eyebrow index="07" className="mb-6 text-mute-ink">
            Frequently asked
          </Eyebrow>
          <h2 id="faq" className="type-h2 text-balance">
            Questions we hear before the first call.
          </h2>
        </Reveal>

        <div className="mt-14 max-w-3xl divide-y divide-charcoal/15 border-t border-charcoal/15">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) * 80}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-pretty text-lg font-medium leading-snug marker:content-none">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-mute-ink transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-pretty leading-relaxed text-mute-ink">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      <JsonLd data={faqJsonLd} />
    </section>
  );
}
