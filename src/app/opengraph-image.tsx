import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Code Velocity — We Build Technology That Builds Your Business.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "AI & Software Development Studio",
    title: "We build technology that builds your business.",
    subtitle: "Custom software, AI automation, SaaS platforms and backend engineering.",
  });
}
