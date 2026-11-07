import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "secondary-light" | "dark";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-lime text-ink hover:bg-lime-deep",
  secondary: "border border-white/20 text-paper hover:border-white/60 hover:bg-white/[0.04]",
  "secondary-light":
    "border border-charcoal/20 text-charcoal hover:border-charcoal/70 hover:bg-charcoal/[0.03]",
  dark: "bg-charcoal text-paper hover:bg-ink",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab and shows an outbound arrow. */
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium tracking-[-0.01em] transition-colors duration-300",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <Icon
        aria-hidden="true"
        className={cn(
          "size-4 transition-transform duration-500 ease-[var(--ease-out-expo)]",
          external
            ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            : "group-hover:translate-x-1",
        )}
      />
    </>
  );

  // Plain anchors for mailto:, tel: and off-site links; Link for internal routes.
  if (external || /^(mailto:|tel:|https?:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** Inline text link with an animated underline and arrow. */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
      <Icon
        aria-hidden="true"
        className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
      />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const classes = cn("group inline-flex items-center gap-2 font-medium", className);

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
