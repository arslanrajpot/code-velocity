export type Service = {
  id: string;
  index: string;
  title: string;
  short: string;
  intro: string;
  capabilities: string[];
  /** Questions that signal this service is the right fit. */
  fitWhen: string[];
  stack: string[];
  relatedProjects: string[];
};

export const services: Service[] = [
  {
    id: "ai-automation",
    index: "01",
    title: "AI Development & Automation",
    short:
      "Custom AI solutions, intelligent assistants, LLM integrations, and workflow automation.",
    intro:
      "We build AI that does real work inside your business — agents that research, assistants that answer from your own documents, and automations that remove hours of manual effort. Every system is designed to be measured, not just demoed.",
    capabilities: [
      "Multi-agent workflows with LangGraph",
      "Retrieval-augmented assistants over your own data",
      "LLM integration into existing products",
      "Document processing and workflow automation",
      "Confidence scoring, evaluation and human-review paths",
    ],
    fitWhen: [
      "Your team spends hours on research, document review or repetitive questions.",
      "You want an AI assistant grounded in your own data, not a generic chatbot.",
      "You need AI answers you can trust — or clearly flag when you can't.",
    ],
    stack: ["LangGraph", "LangChain", "OpenAI", "Google Gemini", "Groq", "Pinecone", "FAISS"],
    relatedProjects: ["ai-market-research-platform", "insightrag", "youtube-talker"],
  },
  {
    id: "custom-software",
    index: "02",
    title: "Custom Software Development",
    short: "Reliable software systems, business platforms, and specialised applications.",
    intro:
      "When off-the-shelf tools stop fitting the way you work, we design and build software around your actual process — with the data model, access control and integrations planned from the start.",
    capabilities: [
      "Business platforms and internal tools",
      "Role-based access control and multi-tenant data isolation",
      "Payment, banking-verification and messaging flows",
      "Background processing and scheduled jobs",
      "Modernising and extending existing systems",
    ],
    fitWhen: [
      "Your operations run on spreadsheets and disconnected tools.",
      "You need software shaped around a specific workflow or industry.",
      "An existing system has become hard to change safely.",
    ],
    stack: ["Python", "Django", "PostgreSQL", "Celery", "Redis", "Stripe", "Twilio", "Plaid"],
    relatedProjects: ["ballogy-platform"],
  },
  {
    id: "web-saas",
    index: "03",
    title: "Web Applications & SaaS",
    short: "Scalable web applications, SaaS platforms, dashboards, and MVPs.",
    intro:
      "From a first MVP to a multi-tenant SaaS platform, we build web products with a solid backend underneath — so the version you launch can become the version you grow.",
    capabilities: [
      "MVPs scoped for a focused first release",
      "Multi-tenant SaaS backends with tenant-scoped permissions",
      "Dashboards, reporting and admin tools",
      "React frontends on Python backends",
      "Authentication with JWT and OAuth 2.0",
    ],
    fitWhen: [
      "You're validating a product idea and need a focused first version.",
      "Your SaaS needs proper tenant isolation and permissions.",
      "Your team needs a dashboard that turns data into decisions.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "Django", "PostgreSQL", "Docker"],
    relatedProjects: ["ai-market-research-platform", "youtube-talker", "interview-question-predictor"],
  },
  {
    id: "backend-apis",
    index: "04",
    title: "API Integration & Backend Engineering",
    short: "Backend services, data management, API development, and system integrations.",
    intro:
      "The part of software most people never see is the part that decides whether it holds up. We design APIs, services and data layers that stay fast, secure and maintainable as usage grows.",
    capabilities: [
      "REST and GraphQL API design and development",
      "Microservices and service-to-service authentication",
      "Performance work: query profiling, indexing and caching",
      "Third-party and internal system integrations",
      "Containerised deployment to AWS and Kubernetes",
    ],
    fitWhen: [
      "Your API is slowing down as usage grows.",
      "You need several systems to share data reliably.",
      "You're splitting a monolith or adding services and need a sound trust model.",
    ],
    stack: ["FastAPI", "Django REST Framework", "GraphQL", "Redis", "Kubernetes", "AWS EKS"],
    relatedProjects: ["ballogy-platform", "insightrag"],
  },
];
