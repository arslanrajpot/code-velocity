import { techIcons, type TechIconKey } from "./tech-icons";

/**
 * Maps a technology's display name to its brand icon. Technologies without an
 * icon in simple-icons (e.g. AWS, OpenAI, Twilio) render as a monogram instead
 * of an improvised logo.
 */
const ICON_BY_NAME: Record<string, TechIconKey> = {
  Python: "python",
  Django: "django",
  "Django REST Framework": "django",
  FastAPI: "fastapi",
  Flask: "flask",
  React: "react",
  ReactJS: "react",
  "React 18": "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  HTML5: "html5",
  CSS3: "css",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Redis: "redis",
  SQLite: "sqlite",
  Docker: "docker",
  Kubernetes: "kubernetes",
  LangChain: "langchain",
  "Google Gemini": "gemini",
  Gemini: "gemini",
  "HuggingFace embeddings": "huggingface",
  "Hugging Face": "huggingface",
  Stripe: "stripe",
  Celery: "celery",
  GraphQL: "graphql",
  JWT: "jwt",
  Pydantic: "pydantic",
  Git: "git",
  Postman: "postman",
  Jira: "jira",
};

export function getTechIcon(name: string) {
  const key = ICON_BY_NAME[name];
  return key ? techIcons[key] : undefined;
}
