/**
 * Technologies demonstrated in the founder's shipped work and the projects on
 * this site. Do not add tools that haven't been used in real work.
 */
export const expertise = [
  {
    group: "AI & Machine Learning",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector Search",
      "OpenAI",
      "Google Gemini",
      "LLaMA",
      "Groq",
      "Pinecone",
      "FAISS",
      "Hugging Face",
    ],
  },
  {
    group: "Backend Engineering",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Flask",
      "GraphQL",
      "WebSockets",
      "Celery",
      "Pydantic",
    ],
  },
  {
    group: "Frontend Development",
    items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    group: "Databases & Caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    group: "Cloud & Deployment",
    items: ["AWS", "AWS EKS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    group: "Integrations & Security",
    items: ["Stripe", "Plaid", "Twilio", "JWT", "OAuth 2.0", "RBAC"],
  },
] as const;
