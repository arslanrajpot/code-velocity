import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Expertise } from "@/components/home/Expertise";
import { FAQ } from "@/components/home/FAQ";
import { Hero } from "@/components/home/Hero";
import { HowWeBuild } from "@/components/home/HowWeBuild";
import { SelectedWork } from "@/components/home/SelectedWork";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyUs } from "@/components/home/WhyUs";

export const metadata: Metadata = {
  title: "AI Development & Custom Software Studio",
  description:
    "Code Velocity designs and builds custom AI agents, RAG systems, and software platforms for startups and businesses — multi-agent automation, AI chatbots, and full-stack SaaS development.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <SelectedWork />
      <HowWeBuild />
      <Expertise />
      <WhyUs />
      <AboutTeaser />
      <FAQ />
      <CtaSection />
    </>
  );
}
