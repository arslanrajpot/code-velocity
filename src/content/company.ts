/** Process, principles and founder background used across Home and About. */

export const processSteps = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    summary: "Understand your business, challenges, objectives, and technical requirements.",
    activities: [
      "Conversations with the people who own the problem",
      "Review of existing systems, data and constraints",
      "Agreement on what success looks like",
    ],
    output: "A shared understanding of the problem and a prioritised scope.",
  },
  {
    id: "design",
    index: "02",
    title: "Design",
    summary: "Define the solution architecture, experience, and implementation plan.",
    activities: [
      "System architecture, data model and integrations",
      "User flows and interface direction",
      "Milestones sequenced to deliver value early",
    ],
    output: "An architecture and plan you can review before code is written.",
  },
  {
    id: "develop",
    index: "03",
    title: "Develop",
    summary: "Engineer the software using technologies appropriate to the project.",
    activities: [
      "Iterative builds you can see and try along the way",
      "Code review and automated checks on every change",
      "Regular updates on progress, risks and decisions",
    ],
    output: "Working software, delivered in reviewable increments.",
  },
  {
    id: "deliver",
    index: "04",
    title: "Deliver",
    summary: "Test, deploy, document, and support the solution.",
    activities: [
      "Testing against the agreed success criteria",
      "Production deployment and handover",
      "Documentation your team can actually use",
    ],
    output: "A deployed, documented system — and support while it settles in.",
  },
] as const;

/**
 * Each principle is paired with evidence from verified work, so the claim is
 * grounded in something that actually happened.
 */
export const principles = [
  {
    title: "Business-First Thinking",
    statement: "We approach technology through the problems it needs to solve.",
    evidence:
      "The AI Market Research Platform was built around one measurable workflow — and took it from four hours to under ten minutes.",
    evidenceHref: "/work/ai-market-research-platform",
  },
  {
    title: "Purposeful Engineering",
    statement: "We build practical solutions around real requirements.",
    evidence:
      "A production connection-pool exhaustion incident was solved by separating API, worker and scheduler processes — not by buying more hardware.",
    evidenceHref: "/work/ballogy-platform",
  },
  {
    title: "Clear Collaboration",
    statement: "Transparent communication throughout planning and development.",
    evidence:
      "You see the architecture and its trade-offs before code is written — the same kind of design decisions documented in every case study on this site.",
    evidenceHref: "/work",
  },
  {
    title: "Built for Growth",
    statement: "Solutions designed with maintainability and future expansion in mind.",
    evidence:
      "Single-responsibility agents, independently deployed services, and access control designed in from day one — so systems can grow without rewrites.",
    evidenceHref: "/work/insightrag",
  },
] as const;

export const engineeringPrinciples = [
  {
    title: "Own the whole system",
    body: "From database schema and API design through to production deployment — no hand-offs where context gets lost.",
  },
  {
    title: "Keep workloads separate",
    body: "API traffic and background work run in separate processes, so one never degrades the other.",
  },
  {
    title: "Design access in from the start",
    body: "Token trust models, role-based access and tenant isolation are architecture decisions, not afterthoughts.",
  },
  {
    title: "Measure AI systems",
    body: "Confidence scoring and evaluation, not just a working demo — so you know when an answer can be trusted.",
  },
] as const;

/** The founder's verified background, from the published portfolio. */
export const founderBackground = {
  summary:
    "Code Velocity's engineering foundation comes from its founder, Arslan Arshad — a backend and AI engineer with more than six years of experience architecting and shipping production Python systems, from Django and FastAPI backends to multi-agent LangGraph pipelines and RAG systems.",
  facts: [
    { value: "6+", label: "Years shipping production backend and AI systems" },
    { value: "3", label: "Engineering teams, from contributor to technical lead" },
    { value: "4", label: "Independently deployed microservices led on one platform" },
  ],
  roles: [
    {
      period: "Dec 2024 – Present",
      org: "Kinetic Intelligence",
      place: "Remote · Dubai, UAE",
      role: "Senior Software Engineer, Backend & AI Architecture",
      note: "Leads backend and AI-integration engineering for a four-service microservices platform on AWS EKS, including its identity trust model and AI-coaching bridge.",
    },
    {
      period: "Jan 2023 – Dec 2024",
      org: "Inovaqo",
      place: "Lahore, Pakistan",
      role: "Full-Stack Software Engineer, AI & Data Systems",
      note: "Built a production multi-agent research system, RAG pipelines on Pinecone, and multi-tenant SaaS backends with Stripe, Plaid and Twilio integrations.",
    },
    {
      period: "Nov 2019 – Dec 2022",
      org: "CodingCops",
      place: "Lahore, Pakistan",
      role: "Software Engineer",
      note: "Built and shipped full-stack web and mobile applications with Django REST Framework and React across e-commerce, SaaS and marketplace domains.",
    },
  ],
  education: "BS Software Engineering — Punjab University College of Information Technology (PUCIT)",
} as const;
