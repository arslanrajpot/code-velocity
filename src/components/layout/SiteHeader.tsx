"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { mainNav, site } from "@/content/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Close the menu whenever the route changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnDesktop = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", closeOnDesktop);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", closeOnDesktop);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="surface-dark sticky top-0 z-50">
      {/* The blur lives on this bar, not the header: backdrop-filter would trap the fixed menu. */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          open ? "bg-ink" : "bg-ink/85 backdrop-blur-md",
          scrolled || open ? "border-white/10" : "border-transparent",
        )}
      >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center px-4 text-[0.9375rem] transition-colors duration-300",
                      active ? "text-paper" : "text-paper/65 hover:text-paper",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-4 bottom-1.5 h-px origin-left bg-lime transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" className="hidden sm:inline-flex">
            Start a Project
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 grid size-11 place-items-center border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-5 bg-paper transition-transform duration-300",
                  open && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-5 bg-paper transition-transform duration-300",
                  open && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pb-10 pt-6">
              <ul className="flex-1 border-t border-white/10">
                {[{ href: "/", label: "Home" }, ...mainNav].map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-white/10"
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between py-5"
                      >
                        <span
                          className={cn(
                            "font-display text-[2.1rem] font-medium leading-none tracking-[-0.03em]",
                            active ? "text-lime" : "text-paper",
                          )}
                        >
                          {item.label}
                        </span>
                        <ArrowRight aria-hidden="true" className="size-5 text-paper/40" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-10 space-y-6">
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Start a Project
                </ButtonLink>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block text-center font-mono text-sm text-paper/60"
                >
                  {site.contact.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
