"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import {
  BUDGET_OPTIONS,
  LIMITS,
  OVERVIEW_MIN,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  serviceLabel,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; inquiry: Inquiry }
  | { state: "error"; code: string };

const EMPTY: Inquiry = {
  name: "",
  email: "",
  company: "",
  service: "",
  overview: "",
  budget: "",
  timeline: "",
};

const ERROR_MESSAGES: Record<string, string> = {
  not_configured: "Our inquiry form isn't connected to email yet, so your message wasn't sent.",
  send_failed: "We couldn't deliver your message just now.",
  rate_limited: "You've sent several inquiries in a short time. Please wait a few minutes and try again.",
  network: "We couldn't reach our server. Check your connection and try again.",
};

const noopSubscribe = () => () => {};

/** The service preselected via /contact?service=… (links from the Services page). */
function readServiceParam() {
  const service = new URLSearchParams(window.location.search).get("service") ?? "";
  return SERVICE_OPTIONS.some((option) => option.value === service) ? service : "";
}

const fieldClass =
  "block w-full border border-charcoal/20 bg-white px-4 text-base text-charcoal placeholder:text-charcoal/40 transition-colors hover:border-charcoal/45 focus:border-charcoal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-red-700";

export function ContactForm() {
  const [rawValues, setValues] = useState<Inquiry>(EMPTY);
  const presetService = useSyncExternalStore(noopSubscribe, readServiceParam, () => "");
  const values: Inquiry = { ...rawValues, service: rawValues.service || presetService };
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
    if (status.state === "error") summaryRef.current?.focus();
  }, [status.state]);

  const update =
    (key: keyof Inquiry) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [key]: value }));
      // Clear a field's error as soon as it's corrected.
      if (errors[key]) {
        setErrors((current) => {
          const nextErrors = validateInquiry({ ...values, [key]: value });
          return { ...current, [key]: nextErrors[key] };
        });
      }
    };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;

    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as Inquiry;
    const nextErrors = validateInquiry(trimmed);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus({ state: "idle" });
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, website: honeypot }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: InquiryErrors;
      };

      if (response.ok && data.ok) {
        setStatus({ state: "success", inquiry: trimmed });
        return;
      }
      if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus({ state: "idle" });
        return;
      }
      setStatus({ state: "error", code: data.code ?? "send_failed" });
    } catch {
      setStatus({ state: "error", code: "network" });
    }
  }

  if (status.state === "success") {
    const { inquiry } = status;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border border-charcoal/15 bg-white p-8 outline-none sm:p-12"
      >
        <span className="grid size-12 place-items-center bg-lime text-ink">
          <Check aria-hidden="true" className="size-6" />
        </span>
        <h2 className="type-h3 mt-8">Thank you, {inquiry.name.split(" ")[0]}. Your inquiry is on its way.</h2>
        <p className="mt-4 max-w-lg text-pretty leading-relaxed text-mute-ink">
          We&apos;ve received your message about{" "}
          <strong className="font-medium text-charcoal">{serviceLabel(inquiry.service)}</strong> and
          will reply to <strong className="font-medium text-charcoal">{inquiry.email}</strong> to
          arrange a conversation.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setStatus({ state: "idle" });
          }}
          className="link-underline mt-8 text-sm font-medium"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const submitting = status.state === "submitting";

  const describedBy = (key: keyof Inquiry, hint?: boolean) =>
    [hint ? `${id}-${key}-hint` : null, errors[key] ? `${id}-${key}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const fieldError = (key: keyof Inquiry) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-red-700">
        <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {errors[key]}
      </p>
    ) : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${id}-required`} className="space-y-7">
      <p id={`${id}-required`} className="text-sm text-mute-ink">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {status.state === "error" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-red-700 bg-red-50 p-5 text-charcoal outline-none"
        >
          <p className="font-medium">{ERROR_MESSAGES[status.code] ?? ERROR_MESSAGES.send_failed}</p>
          <p className="mt-2 text-sm leading-relaxed text-mute-ink">
            Your details are still in the form. You can try again, or email us directly at{" "}
            <a href={`mailto:${site.contact.email}?subject=Project%20inquiry`} className="font-medium text-charcoal underline underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      {errorCount > 0 && status.state !== "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} below.
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={cn(fieldClass, "h-12")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium">
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cn(fieldClass, "h-12")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-company`} className="mb-2 block text-sm font-medium">
            Company <span className="font-normal text-mute-ink">(optional)</span>
          </label>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            value={values.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={cn(fieldClass, "h-12")}
          />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor={`${id}-service`} className="mb-2 block text-sm font-medium">
            Service required <span aria-hidden="true">*</span>
          </label>
          <select
            id={`${id}-service`}
            name="service"
            required
            value={values.service}
            onChange={update("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy("service")}
            className={cn(fieldClass, "select-chevron h-12 pr-10")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-overview`} className="mb-2 block text-sm font-medium">
          Project overview <span aria-hidden="true">*</span>
        </label>
        <p id={`${id}-overview-hint`} className="mb-3 text-sm text-mute-ink">
          What are you building or improving, and what problem should it solve? A few sentences is
          plenty.
        </p>
        <textarea
          id={`${id}-overview`}
          name="overview"
          required
          rows={6}
          minLength={OVERVIEW_MIN}
          maxLength={LIMITS.overview}
          value={values.overview}
          onChange={update("overview")}
          aria-invalid={Boolean(errors.overview)}
          aria-describedby={describedBy("overview", true)}
          className={cn(fieldClass, "resize-y py-3 leading-relaxed")}
        />
        {fieldError("overview")}
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        {(
          [
            ["budget", "Approximate budget", BUDGET_OPTIONS],
            ["timeline", "Timeline", TIMELINE_OPTIONS],
          ] as const
        ).map(([key, label, options]) => (
          <div key={key}>
            <label htmlFor={`${id}-${key}`} className="mb-2 block text-sm font-medium">
              {label} <span className="font-normal text-mute-ink">(optional)</span>
            </label>
            <select
              id={`${id}-${key}`}
              name={key}
              value={values[key]}
              onChange={update(key)}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={describedBy(key)}
              className={cn(fieldClass, "select-chevron h-12 pr-10")}
            >
              <option value="">Prefer not to say</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldError(key)}
          </div>
        ))}
      </div>

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 border-t border-charcoal/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-mute-ink">
          We use your details only to reply to this inquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-charcoal">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-14 shrink-0 items-center justify-center gap-2.5 bg-charcoal px-7 font-medium text-paper transition-colors hover:bg-ink disabled:cursor-progress disabled:opacity-80"
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-lime transition-transform duration-500 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your inquiry…" : ""}
      </p>
    </form>
  );
}
