import { cn } from "@/lib/cn";

/** The Code Velocity mark: a prompt chevron and cursor — code, moving forward. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <rect width="32" height="32" fill="#C5F277" />
      <path
        d="M8.5 9.5 15 16l-6.5 6.5"
        fill="none"
        stroke="#0B0E11"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <path d="M17.5 22.5h7" stroke="#0B0E11" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.15rem] font-semibold leading-none tracking-[-0.03em]">
        Code Velocity
      </span>
    </span>
  );
}
