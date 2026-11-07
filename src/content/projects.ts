/**
 * Portfolio content. Every fact here was taken from the founder's published
 * portfolio (https://arslan-arshad.netlify.app/) or from the linked source
 * repositories. Do not add metrics, clients or outcomes that are not verified.
 *
 * Attribution rules:
 * - "founder-experience": built by the founder while employed elsewhere.
 * - "independent": built independently by the founder, not for a client.
 * - "client": a verified Code Velocity client engagement (none yet).
 */

import type { Project } from "./project-types";
import { CATEGORIES, type Category } from "./project-types";

export * from "./project-types";

const PORTFOLIO = {
  label: "Founder portfolio",
  href: "https://arslan-arshad.netlify.app/",
};

export const projects: Project[] = [
  {
    slug: "ai-market-research-platform",
    name: "AI Market Research Platform",
    category: "AI & Automation",
    categories: ["AI & Automation", "Web Applications"],
    attribution: {
      type: "founder-experience",
      context:
        "Engineered by our founder, Arslan Arshad, as a Full-Stack Software Engineer (AI & Data Systems) at Inovaqo. Shown as founder experience — it is not a Code Velocity client engagement. The linked repository is published by the founder.",
    },
    period: "2023 – 2024",
    tagline: "Four hours of research, done in ten minutes.",
    summary:
      "A multi-agent LangGraph platform that plans, retrieves and generates structured market analysis reports for enterprise clients.",
    overview:
      "A multi-agent research platform that automates market research end to end — from gathering evidence to producing a polished, structured report — while keeping every insight grounded in retrieved data rather than a model's memory.",
    challenge:
      "Manual market research took analysts four hours or more per report. Generic LLM research tools were no shortcut: they tend to hallucinate or produce shallow, generic output that can't be put in front of enterprise clients.",
    solution:
      "A coordinated team of specialised agents, orchestrated as a stateful LangGraph graph and grounded by a Pinecone retrieval layer. A modular FastAPI backend runs the pipeline; a React application lets teams generate, review and manage reports.",
    features: [
      "Multi-agent pipeline covering planning, evidence gathering, synthesis, critique and reporting",
      "Retrieval-augmented generation on Pinecone with semantic chunking and context ranking",
      "Confidence scoring that rewrites low-confidence queries before anything is generated",
      "Configurable report templates for different research and analysis types",
      "Report history, search and analytics in the React frontend",
      "Secure sign-in with JWT and Google OAuth2",
    ],
    approach: [
      "Agents are separated by responsibility instead of one long prompt — a Scout plans the research and gathers evidence (including live web data), a Synthesizer structures findings, a Critic reviews them for gaps and weak evidence, and a Reporter writes the final report. Each piece is easier to debug and extend.",
      "Confidence scoring sits between retrieval and generation: weak context triggers an automatic query rewrite instead of a hallucinated answer.",
      "The graph uses SQLite-backed LangGraph checkpointing so long-running research jobs can resume reliably.",
      "The FastAPI backend keeps services and agents separate, validates every request with Pydantic, and uses Redis caching with SQLAlchemy persistence.",
    ],
    stack: [
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Pinecone",
      "Groq",
      "LLaMA",
      "HuggingFace embeddings",
      "React",
      "Redis",
      "Docker",
    ],
    outcomes: [
      { value: "4h → 10m", label: "Manual research workflow automated" },
      { value: "8+", label: "Enterprise clients the platform was deployed across" },
    ],
    outcomeSummary:
      "The automated workflow completes in under ten minutes and was deployed across more than eight enterprise clients during the founder's time at Inovaqo.",
    signal: { value: "4h → 10m", label: "Research workflow automated" },
    systems: [
      {
        id: "research-agent",
        label: "Multi-agent RAG",
        title: "Plan, retrieve, generate — with a check.",
        summary:
          "The pipeline plans the research task, retrieves grounded context, checks its confidence, and only then writes the report.",
        steps: [
          { title: "Research request", detail: "A market question and report template" },
          { title: "Scout agent", detail: "Plans the research and gathers evidence" },
          { title: "Pinecone retrieval", detail: "Semantic chunking and vector search" },
          { title: "Confidence scoring", detail: "Rewrites the query if retrieval is weak" },
          { title: "Synthesize & critique", detail: "Merges findings, then checks for gaps" },
          { title: "Reporter agent", detail: "Structured report via FastAPI + React" },
        ],
        decisions: [
          "Low-confidence context triggers an automatic query rewrite instead of a hallucinated answer.",
          "Single-responsibility agents instead of one long prompt — easier to debug and extend.",
          "Checkpointed graph state so long-running research jobs resume rather than restart.",
        ],
      },
    ],
    repo: "https://github.com/arslanrajpot/Research_analyst",
    repoTree: `backend/
├── agents/        scout · enhanced_scout · synthesizer · critic · reporter
├── routers/       FastAPI route definitions
├── services/      business logic
├── models/        data models
├── db/            database layer
├── tools/         agent tools (web retrieval)
└── main.py        FastAPI entrypoint
frontend/src/
├── components/    UI components
├── context/       auth and research state
├── pages/         dashboard · generator · reports · profile
└── services/      API client`,
    gallery: [],
    sources: [
      PORTFOLIO,
      { label: "Repository README", href: "https://github.com/arslanrajpot/Research_analyst" },
    ],
  },
  {
    slug: "ballogy-platform",
    name: "Ballogy Platform Architecture",
    category: "Backend Systems",
    categories: ["Backend Systems", "AI & Automation"],
    attribution: {
      type: "founder-experience",
      context:
        "Backend and AI-integration engineering led by our founder as Senior Software Engineer (Backend & AI Architecture) at Kinetic Intelligence, Dubai, UAE. Shown as founder experience — it is not a Code Velocity client engagement. The system is proprietary, so no source code or screenshots are published.",
    },
    period: "2024 – present",
    tagline: "Four services, one identity.",
    summary:
      "Microservices backend and AI-coaching integration for an athlete training platform — four services, independently deployed to AWS EKS.",
    overview:
      "The backend architecture behind Ballogy, an athlete training platform: four independently deployed services covering identity, training (drills, assessments and shot-tracking) and notifications, plus the layer that connects athletes to a generative AI coaching assistant.",
    challenge:
      "Four services had to trust a single identity without re-authenticating on every call. Background processing could not be allowed to starve the API. And athletes needed access to an AI coaching assistant with fair, per-profile usage limits and relevant context.",
    solution:
      "A JWT trust model anchored in one identity service, API and background workers split into separate Kubernetes deployments, and a bridging layer that owns quota, chat history and context assembly around an external AI agent.",
    features: [
      "Identity, authentication and profiles centralised in one Django service",
      "FastAPI services for drills, assessments and shot-tracking",
      "Push and in-app notification service",
      "Freemium AI-coaching quota scoped per profile and per sport",
      "Chat session and history APIs for the mobile app",
      "Independent delivery per service: Bitbucket → ECR → kubectl on AWS EKS",
    ],
    approach: [
      "Identity sits in one service: ballogy-users issues the JWT and the other three services decode it with shared-secret middleware, removing a callback on every request.",
      "API and background work never share a pod: Celery and django-q workers and beat schedulers run as separate Kubernetes deployments from the web API.",
      "A production database connection-pool exhaustion incident on the training service was resolved by splitting API, worker and beat processes into separate deployments with tuned pool sizes — not by adding hardware.",
      "The platform doesn't generate AI responses itself. It owns identity, quota, history and context assembly, and bridges to a separate generative AI service over HTTP.",
      "Coaching quota is scoped per profile and per sport rather than pooled across an account — fixing a real bug where limits leaked across profiles.",
      "Context sent to the AI agent is capped at the last ten days of reports, so grounding stays relevant without an unbounded payload.",
    ],
    stack: [
      "Django",
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "JWT",
      "Kubernetes",
      "AWS EKS",
    ],
    outcomes: [
      { value: "4", label: "Independently deployed services sharing one identity" },
    ],
    outcomeSummary:
      "A platform where each service deploys on its own, authentication doesn't cost a network call per request, and background load stays isolated from the API.",
    signal: { value: "4 services", label: "One identity, independent deploys" },
    systems: [
      {
        id: "microservices",
        label: "Microservices",
        title: "Four services, one identity.",
        summary:
          "Independently deployed services trust a single identity provider instead of re-authenticating on every call, with background work isolated into its own pods.",
        steps: [
          { title: "ballogy-users", detail: "Django — identity, auth & profiles" },
          { title: "JWT middleware", detail: "Shared secret, no callback per request" },
          { title: "training / tests", detail: "FastAPI — drills, assessments, shot-tracking" },
          { title: "notification", detail: "Django — push and in-app notifications" },
          { title: "Celery · Redis · django-q", detail: "Workers in separate pods from the API" },
          { title: "AWS EKS", detail: "Bitbucket → ECR → kubectl, per service" },
        ],
        decisions: [
          "One service issues identity; the rest verify tokens locally.",
          "API, workers and schedulers run as separate Kubernetes deployments.",
          "A pool-exhaustion incident was fixed by process separation and tuned pool sizes.",
        ],
      },
      {
        id: "ai-coaching-bridge",
        label: "AI coaching bridge",
        title: "Auth and context, not just a chat window.",
        summary:
          "The platform owns the identity, quota and context assembly around a separate generative AI service.",
        steps: [
          { title: "Athlete opens chat", detail: "From the daily training-report screen" },
          { title: "Freemium gate", detail: "Per-profile, per-sport monthly quota" },
          { title: "Context assembly", detail: "Last 10 days of reports + history" },
          { title: "External AI agent", detail: "Generates the grounded response" },
          { title: "Response bridge", detail: "Saved to MongoDB via a wrapper service" },
          { title: "Chat history API", detail: "Session and history endpoints for mobile" },
        ],
        decisions: [
          "Quota scoped per profile and sport — not pooled across an account.",
          "Context capped at ten days of reports to keep grounding relevant.",
          "The LLM call lives in a separate service the platform bridges to over HTTP.",
        ],
      },
    ],
    gallery: [],
    sources: [PORTFOLIO],
  },
  {
    slug: "insightrag",
    name: "InsightRAG",
    category: "AI & Automation",
    categories: ["AI & Automation", "Backend Systems"],
    attribution: {
      type: "independent",
      context:
        "An independent project designed and built by our founder, Arslan Arshad. It is a technical demonstration, not a client engagement.",
    },
    period: "2025",
    tagline: "Answers that know when they're not sure.",
    summary:
      "A self-grading document Q&A agent for compliance-critical workflows, where a confident-sounding wrong answer is worse than no answer.",
    overview:
      "A retrieval-augmented document assistant: upload PDFs, ask questions in plain language, and get answers grounded in the documents — each one returned with a confidence score so people know how far to trust it.",
    challenge:
      "Standard RAG chatbots answer every question with the same confidence, even when the retrieved evidence is weak or irrelevant. In compliance-critical workflows, that kind of confident hallucination is unacceptable.",
    solution:
      "A LangGraph agent that rewrites and classifies each question, retrieves from the uploaded documents, grades the evidence, refines the query when it falls short, and attaches a calibrated confidence score to every answer.",
    features: [
      "PDF upload, parsing and chunking",
      "Semantic search with HuggingFace embeddings and FAISS",
      "Query rewriting and question classification before retrieval",
      "Evidence grading — relevant, needs refinement or irrelevant — with refinement loops",
      "A confidence score and label on every answer",
      "Conversation memory across turns",
    ],
    approach: [
      "Confidence blends three signals: vector similarity from FAISS distances, lexical overlap between the question and the retrieved context, and the LLM grader's verdict — scaled conservatively to avoid inflated scores.",
      "When evidence is insufficient, the agent refines the query and retries; answers that remain low-confidence are surfaced as such so they can be routed to human review instead of being trusted blindly.",
      "A modular FastAPI structure — routers, services, models and utilities — built to extend to new document types and retrieval strategies.",
    ],
    stack: ["FastAPI", "LangGraph", "LangChain", "FAISS", "Groq", "HuggingFace embeddings", "PyPDF"],
    outcomes: [
      { value: "3-signal", label: "Confidence scoring: vector + lexical + LLM grader" },
    ],
    outcomeSummary:
      "A working document Q&A agent that grades its own evidence and makes its uncertainty visible, rather than presenting every answer as equally reliable.",
    signal: { value: "3-signal", label: "Confidence scoring" },
    systems: [
      {
        id: "self-grading-rag",
        label: "Self-grading RAG",
        title: "Grade the evidence before answering.",
        summary:
          "Every question passes through rewriting, retrieval and grading before an answer — and a confidence score — is produced.",
        steps: [
          { title: "Upload PDF", detail: "Parsed, chunked and embedded" },
          { title: "Rewrite & classify", detail: "Sharpens the question for retrieval" },
          { title: "Retrieve", detail: "Top matches from the FAISS index" },
          { title: "Grade evidence", detail: "Relevant · needs refinement · irrelevant" },
          { title: "Refine or answer", detail: "Loops back when evidence falls short" },
          { title: "Confidence score", detail: "Vector + lexical + grader blend" },
        ],
        decisions: [
          "Three independent signals feed the confidence score, not the LLM's own opinion alone.",
          "Weak evidence triggers query refinement instead of a guess.",
          "Low-confidence answers are labelled so people can review them.",
        ],
      },
    ],
    repo: "https://github.com/arslanrajpot/InsightRAG-Chatbot-",
    repoTree: `backend/app/
├── main.py                  FastAPI entrypoint
├── config.py                configuration
├── models/schemas.py        request & response models
├── routers/api.py           API routes
├── services/rag_service.py  LangGraph RAG pipeline
├── services/memory_service.py  conversation memory
└── utils/pdf_utils.py       PDF text extraction`,
    gallery: [],
    sources: [
      PORTFOLIO,
      { label: "Repository README & source", href: "https://github.com/arslanrajpot/InsightRAG-Chatbot-" },
    ],
  },
  {
    slug: "youtube-talker",
    name: "YouTube Talker",
    category: "AI & Automation",
    categories: ["AI & Automation", "Web Applications"],
    attribution: {
      type: "independent",
      context:
        "An independent project designed and built by our founder, Arslan Arshad. It is not a client engagement.",
    },
    period: "2025",
    tagline: "Chat with any video instead of watching it.",
    summary:
      "A GenAI web app that extracts a video's transcript, indexes it, and answers natural-language questions grounded in what is actually said.",
    overview:
      "An AI web application that turns any YouTube video into a searchable conversation. Paste a link, ask questions in plain language, and get answers grounded in the video's transcript.",
    challenge:
      "Long-form video — from one to six-plus hours — is slow to review. Finding a single answer can mean scrubbing through an entire recording.",
    solution:
      "A Flask application that pulls the video's transcript (or transcribes the audio with Whisper when none exists), indexes it in a FAISS vector store, and answers questions with retrieval-grounded responses.",
    features: [
      "Works with any YouTube video, with or without published captions",
      "Whisper audio transcription fallback with multi-language support",
      "Transcript chunking and FAISS vector indexing",
      "Grounded, context-aware answers to free-form questions",
      "Automatic failover between LLM providers (Google Gemini and Groq)",
      "Deployment configurations for Docker, Render, Railway and Vercel",
    ],
    approach: [
      "Transcript retrieval tries the video's published captions first and only falls back to downloading and transcribing the audio with Whisper when needed — keeping the common path fast.",
      "Both embeddings and generation have fallbacks: Google embeddings fall back to HuggingFace sentence-transformers, and Gemini and Groq (Llama 3.1) fail over to each other.",
      "Transcripts are split into overlapping chunks (1,000 characters with a 200-character overlap) before indexing, so answers keep their surrounding context.",
    ],
    stack: [
      "Flask",
      "LangChain",
      "Whisper",
      "Google Gemini",
      "Groq",
      "FAISS",
      "HuggingFace embeddings",
      "Docker",
    ],
    outcomes: [{ value: "45m → 30s", label: "Video review time per video" }],
    outcomeSummary:
      "A real-time chat experience over long-form video content, cutting the time to find an answer from roughly 45 minutes of review to about 30 seconds.",
    signal: { value: "45m → 30s", label: "Video review time" },
    systems: [
      {
        id: "video-rag",
        label: "Video RAG",
        title: "From a URL to grounded answers.",
        summary:
          "Captions first, transcription only when needed — then retrieval-grounded answers with provider failover.",
        steps: [
          { title: "YouTube URL", detail: "Any public video" },
          { title: "Transcript", detail: "Captions, or Whisper when none exist" },
          { title: "Chunk & embed", detail: "Overlapping chunks, Gemini or HF embeddings" },
          { title: "FAISS index", detail: "Vector store per video" },
          { title: "Retrieve context", detail: "Relevant passages for each question" },
          { title: "Answer", detail: "Gemini ⇄ Groq with automatic failover" },
        ],
        decisions: [
          "Fast path first: published captions before audio transcription.",
          "Provider fallbacks at both the embedding and generation steps.",
          "Overlapping chunks so retrieved passages keep their context.",
        ],
      },
    ],
    repo: "https://github.com/arslanrajpot/ai-youtube-video-chatbot",
    repoTree: `app.py                              Flask entrypoint
services/
├── youtube_service.py              captions + transcription fallback
├── audio_transcription_service.py  Whisper transcription
└── rag_service.py                  chunking, FAISS, LLM failover
templates/index.html                web interface
Dockerfile · render.yaml · railway.json · vercel.json`,
    gallery: [],
    sources: [
      PORTFOLIO,
      { label: "Repository README & source", href: "https://github.com/arslanrajpot/ai-youtube-video-chatbot" },
    ],
  },
  {
    slug: "interview-question-predictor",
    name: "AI Interview Question Predictor",
    category: "AI & Automation",
    categories: ["AI & Automation", "Web Applications"],
    attribution: {
      type: "independent",
      context:
        "An independent project designed and built by our founder, Arslan Arshad. It is not a client engagement.",
    },
    period: "2025",
    tagline: "Interview prep, matched to the real job.",
    summary:
      "A RAG tool that predicts likely interview questions from a candidate's actual CV, target role and job description.",
    overview:
      "An AI tool for recruiters, hiring teams and candidates that predicts the interview questions a person is most likely to face — based on their real CV, the target role and the specific job description.",
    challenge:
      "Interview preparation usually relies on generic question lists that ignore a candidate's actual background and the job they're applying for.",
    solution:
      "A Flask application that extracts the CV text, embeds it alongside the job description with Google Gemini, and retrieves the most relevant questions from a curated bank segmented by role and seniority.",
    features: [
      "CV parsing directly from PDF uploads",
      "Gemini semantic embeddings for matching experience to questions",
      "Curated question bank by role (MERN, Python) and level (Intern, Associate, Experienced)",
      "Vector similarity search over the question bank",
      "A simple web interface for uploading a CV and viewing predicted questions",
    ],
    approach: [
      "Small, single-purpose modules — CV processing, embedding, vector storage and question matching — so new roles, levels or question sets can be added without touching the pipeline.",
      "Questions are retrieved from a curated, segmented bank rather than freely generated, which keeps the shortlist relevant to the candidate's seniority.",
    ],
    stack: ["Flask", "Google Gemini", "RAG", "Vector Search", "PDF Parsing"],
    outcomes: [{ value: "Role + level", label: "Question bank matched by seniority" }],
    outcomeSummary:
      "Candidates get a targeted shortlist of interview questions matched to their real background and the job description, instead of a one-size-fits-all list.",
    signal: { value: "Role + level", label: "Questions matched by seniority" },
    systems: [
      {
        id: "question-rag",
        label: "Question RAG",
        title: "From a CV to a targeted shortlist.",
        summary:
          "The CV and job description are embedded and matched against a curated, segmented question bank.",
        steps: [
          { title: "CV + job description", detail: "PDF upload and role selection" },
          { title: "Text extraction", detail: "CV parsed from PDF" },
          { title: "Gemini embeddings", detail: "gemini-embedding-001" },
          { title: "Vector search", detail: "Similarity over the question bank" },
          { title: "Question matching", detail: "Filtered by role and level" },
          { title: "Shortlist", detail: "Predicted interview questions" },
        ],
        decisions: [
          "Retrieval from a curated bank keeps questions realistic.",
          "Segmentation by role and seniority before matching.",
          "Single-purpose modules make the pipeline easy to extend.",
        ],
      },
    ],
    repo: "https://github.com/arslanrajpot/ai-question-predictor-rag",
    repoTree: `main.py              Flask entrypoint
api.py               API routes
cv_processor.py      extracts text from the uploaded CV
embedder.py          Gemini embeddings
vector_store.py      stores and searches question embeddings
question_matcher.py  matches CV + job description to questions
questions/           intern · associate · experienced × MERN · Python
templates/           web interface`,
    gallery: [],
    sources: [
      PORTFOLIO,
      { label: "Repository README", href: "https://github.com/arslanrajpot/ai-question-predictor-rag" },
    ],
  },
  {
    slug: "reviewpulse",
    name: "ReviewPulse",
    category: "AI & Automation",
    categories: ["AI & Automation", "Web Applications", "Backend Systems"],
    attribution: {
      type: "independent",
      context:
        "An independent project designed and built by our founder, Arslan Arshad. It is a complete, production-architected SaaS build — not a Code Velocity client engagement.",
    },
    period: "2026",
    tagline: "Real reviews in, grounded answers out — not AI guesswork.",
    summary:
      "A subscription SaaS platform that turns a restaurant's public reviews into a RAG-grounded Q&A assistant and analytics dashboard, with Stripe-metered billing engineered to survive upgrades, retries and cancellations.",
    overview:
      "A platform that gives restaurant owners a practical way to understand what their customers are actually saying — across their own reviews and nearby competitors — instead of scrolling through hundreds of reviews by hand or asking a generic AI chatbot that has no real data to work from.",
    challenge:
      "Restaurant owners have hundreds of reviews spread across platforms but no practical way to answer questions like \"what do customers dislike about our service?\" or \"how do we compare with competitors nearby?\" Reading reviews by hand doesn't scale, and generic AI chatbots don't have the restaurant's actual review data, so they make answers up.",
    solution:
      "A platform that auto-discovers a restaurant and its closest competitors on signup, collects and indexes their reviews in a vector database, and answers plain-English questions through a retrieval-augmented assistant grounded in that real review data — backed by an analytics dashboard and tiered Stripe subscription billing.",
    features: [
      "Automatic restaurant and competitor discovery via Google Maps at onboarding",
      "Parallel, rate-limited review collection — up to 50 reviews across up to 5 competitors",
      "LangChain function-calling RAG agent on GPT-4o, grounded in each restaurant's own reviews",
      "Guided question library: a tree of questions with per-question prompt templates and follow-ups",
      "Thumbs-up/down feedback loop that adapts the assistant's tone, structure and depth per user",
      "Analytics dashboard with rating distribution and review metrics",
      "Tiered Stripe subscriptions with monthly message allowances",
      "Full billing lifecycle: prorated upgrades, payment-retry grace periods, cancellations and undo-cancellation",
    ],
    approach: [
      "Retrieval over fine-tuning: every answer is grounded in a restaurant's live review data, so a new restaurant can be added instantly with no retraining. The agent searches the verified review data first and only falls back to the model's general knowledge when the data lacks an answer — cutting down on made-up answers.",
      "A small local embedding model (384-dimension Sentence-Transformers/MiniLM) keeps embedding cost and latency predictable, paired with a serverless Pinecone index for search.",
      "Stripe is the source of truth: webhooks drive every account-tier change, checked against stale and out-of-order events so an old event can never downgrade a user who has already upgraded.",
      "Usage metering deducts each message from the monthly allowance in a single atomic database update, so parallel requests can't overspend it — and refunds the message automatically if the underlying AI call fails.",
      "Clear module boundaries — users, restaurants, subscription, FAQ and AI assistants are each split into routes, business logic and database access, keeping the codebase testable and easy to extend.",
      "A full security and reliability audit covered authentication, per-user data isolation, billing correctness, XSS and dependency vulnerabilities, including a critical Next.js dependency upgrade.",
    ],
    stack: [
      "FastAPI",
      "LangChain",
      "OpenAI GPT-4o",
      "Pinecone",
      "Sentence-Transformers",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Stripe",
      "SerpAPI",
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Docker",
    ],
    outcomes: [
      { value: "50 × 5", label: "Reviews per restaurant, across up to 5 auto-discovered competitors" },
      { value: "Atomic metering", label: "Usage allowance can't be overspent by concurrent requests" },
    ],
    outcomeSummary:
      "A production-architected SaaS platform where answers stay grounded in a restaurant's real reviews, billing stays correct through every Stripe edge case, and usage limits hold even under concurrent load.",
    signal: { value: "0 overspend", label: "Usage metering stays atomic under concurrent requests" },
    systems: [
      {
        id: "review-rag",
        label: "Review RAG",
        title: "Database first, model second.",
        summary:
          "Onboarding auto-discovers the restaurant and its competitors, indexes their reviews, and answers every question from that grounded data before ever falling back to the model's general knowledge.",
        steps: [
          { title: "Restaurant signup", detail: "Business found automatically via Google Maps" },
          { title: "Competitor discovery", detail: "Up to 5 competitors matched by cuisine and location" },
          { title: "Review collection", detail: "Up to 50 reviews per restaurant, collected in parallel" },
          { title: "Embed & index", detail: "MiniLM embeddings into a serverless Pinecone index" },
          { title: "RAG agent", detail: "LangChain + GPT-4o, grounded in retrieved reviews" },
          { title: "Guided Q&A", detail: "Question library with templated prompts and follow-ups" },
        ],
        decisions: [
          "Retrieval before generation — the agent falls back to general knowledge only when the data has no answer.",
          "A small local embedding model keeps cost and latency predictable instead of a hosted embeddings API.",
          "Thumbs-up/down feedback adjusts the assistant's tone and depth per user.",
        ],
      },
      {
        id: "billing-lifecycle",
        label: "Billing lifecycle",
        title: "Stripe as the source of truth.",
        summary:
          "Every account-tier change is driven by Stripe webhooks, guarded against the stale and out-of-order events that make subscription billing easy to get wrong.",
        steps: [
          { title: "Stripe Checkout", detail: "Tiered Pro/Premium plans with monthly message allowances" },
          { title: "Webhook events", detail: "Drive every tier change, not client-side state" },
          { title: "Upgrades", detail: "Prorated mid-cycle, applied immediately" },
          { title: "Failed payments", detail: "Grace period while Stripe retries" },
          { title: "Cancellation", detail: "Effective at period end, reversible, syncs with Stripe dashboard cancels" },
          { title: "Usage metering", detail: "Atomic per-message deduction; auto-refunded if the AI call fails" },
        ],
        decisions: [
          "Stale and out-of-order webhook events are checked against plan state so an old event can never downgrade a newer plan.",
          "Each message is deducted from the allowance in a single database update, so concurrent requests can't overspend it.",
          "Cancellations made directly in the Stripe dashboard stay in sync with the app.",
        ],
      },
    ],
    repo: "https://github.com/arslanrajpot/restaurant-reviews",
    repoTree: `BE/
├── ai_assistants/   LangChain RAG agent over restaurant reviews
├── restaurants/     model · repository · routers · schema · services
├── subscription/    Stripe lifecycle — model · repository · routers
├── users/           authentication & profiles
├── faq/             guided question library
├── rag_embeddings/  embedding + Pinecone indexing
├── alembic/         versioned schema migrations
├── scheduler.py     subscription-expiry background jobs
└── app.py           FastAPI entrypoint
FE/src/
├── app/             Next.js 15 App Router pages
├── service/         API client
├── hooks/           data & auth hooks
└── shared/          shared UI components`,
    gallery: [],
    sources: [{ label: "Repository", href: "https://github.com/arslanrajpot/restaurant-reviews" }],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Only categories that at least one project actually belongs to. */
export function getActiveCategories(list: Project[] = projects): Category[] {
  return CATEGORIES.filter((category) =>
    list.some((project) => project.categories.includes(category)),
  );
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
