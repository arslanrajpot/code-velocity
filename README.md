# Code Velocity — Company Website

Marketing and portfolio site for **Code Velocity**, an AI and software development studio.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Motion and Lucide.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

| Script          | What it does                                                        |
| --------------- | ------------------------------------------------------------------- |
| `npm run dev`   | Development server                                                  |
| `npm run build` | Production build (all pages prerender as static HTML)               |
| `npm run start` | Serve the production build                                          |
| `npm run lint`  | ESLint                                                              |
| `npm run icons` | Regenerate `src/content/tech-icons.ts` from `simple-icons`          |

## Environment variables

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL — canonical links, sitemap, social previews             |
| `RESEND_API_KEY`       | [Resend](https://resend.com) API key used to deliver inquiries          |
| `CONTACT_TO_EMAIL`     | Inbox that receives inquiries (comma-separate multiple addresses)       |
| `CONTACT_FROM_EMAIL`   | Verified sender, e.g. `Code Velocity <inquiries@yourdomain.com>`        |

The contact form only shows a success message after Resend accepts the email. Until the three
Resend variables are set, submissions return a clear error with a direct-email fallback.

## Editing content

All copy lives in typed data files — pages don't need to change to update content.

| File                          | Contents                                                       |
| ----------------------------- | -------------------------------------------------------------- |
| `src/content/site.ts`         | Company name, tagline, contact email, founder links            |
| `src/content/projects.ts`     | Case studies (one object per project)                          |
| `src/content/services.ts`     | Service descriptions, capabilities, related work               |
| `src/content/company.ts`      | Process steps, principles, founder background                  |
| `src/content/expertise.ts`    | Technology groups shown on the homepage                        |

### Content rules

Project facts come from the founder's published portfolio and the linked GitHub repositories.
Keep it that way:

- Every project has an `attribution.type`: `founder-experience` (built while employed elsewhere),
  `independent` (built independently), or `client` (a verified Code Velocity engagement).
- Only add metrics, outcomes, clients or testimonials that are verified.
- To add real screenshots, put them in `public/work/<slug>/` and list them in the project's
  `gallery` array (with `width`, `height` and descriptive `alt` text). They render automatically
  in the case study's gallery.

## Structure

```
src/
├── app/                 routes, metadata, sitemap, robots, OG images, /api/contact
├── components/
│   ├── home/            homepage sections
│   ├── work/            project cards, grid + filters, previews, system explorer
│   ├── contact/         inquiry form
│   ├── layout/          header and footer
│   └── ui/              buttons, reveal, tech badges, logo
├── content/             editable site content
└── lib/                 helpers, inquiry validation, OG image renderer
```
