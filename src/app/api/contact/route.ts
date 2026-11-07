import { serviceLabel, toInquiry, validateInquiry, type Inquiry } from "@/lib/inquiry";

/**
 * Project inquiry endpoint. Delivers inquiries by email through Resend
 * (https://resend.com). Requires:
 *   RESEND_API_KEY      — API key from Resend
 *   CONTACT_TO_EMAIL    — inbox that receives inquiries
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "Code Velocity <inquiries@yourdomain.com>"
 *
 * It only responds `ok: true` after Resend accepts the message, so the form
 * never shows success for an inquiry that wasn't sent.
 */

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
// Best-effort, per-instance limiter. Use a shared store (e.g. Redis) if you run several instances.
const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_LIMIT.max;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailBody(inquiry: Inquiry) {
  const rows: Array<[string, string]> = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Company", inquiry.company || "—"],
    ["Service", serviceLabel(inquiry.service)],
    ["Budget", inquiry.budget || "—"],
    ["Timeline", inquiry.timeline || "—"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject overview:\n${inquiry.overview}`;
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#555"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="font-family:sans-serif;font-size:14px"><strong>Project overview</strong></p><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(inquiry.overview)}</p>`;
  return { text, html };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field, so reject without sending.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: false, code: "rejected" }, { status: 400 });
  }

  const inquiry = toInquiry(body);
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Inquiry not sent: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL to enable delivery.",
    );
    return Response.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const { text, html } = emailBody(inquiry);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        reply_to: inquiry.email,
        subject: `New project inquiry — ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Resend rejected the inquiry:", response.status, await response.text());
      return Response.json({ ok: false, code: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return Response.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
