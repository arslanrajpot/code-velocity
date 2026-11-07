import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="surface-dark relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      <div className="container-site relative flex min-h-[70dvh] flex-col justify-center py-24">
        <p className="font-mono text-sm text-lime">404 · route not found</p>
        <h1 className="type-h1 mt-6 max-w-[14ch] text-balance">This page took a different path.</h1>
        <p className="mt-6 max-w-md text-lg text-paper/65">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            Explore Our Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
