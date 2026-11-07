"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Node = { id: string; x: number; y: number; w: number; h: number; label: string; sub: string };
type Edge = { from: string; to: string; d: string };
type Layout = { width: number; height: number; nodes: Node[]; edges: Edge[]; font: [number, number] };

/** Wide layout for tablet/desktop. */
const WIDE: Layout = {
  width: 720,
  height: 470,
  font: [14, 10.5],
  nodes: [
    { id: "clients", x: 20, y: 196, w: 136, h: 68, label: "Web & mobile", sub: "CLIENT APPS" },
    { id: "gateway", x: 210, y: 196, w: 140, h: 68, label: "API layer", sub: "FASTAPI · DJANGO" },
    { id: "identity", x: 210, y: 52, w: 140, h: 68, label: "Identity", sub: "JWT · OAUTH 2.0" },
    { id: "agents", x: 404, y: 196, w: 148, h: 68, label: "Agent graph", sub: "LANGGRAPH" },
    { id: "vectors", x: 404, y: 52, w: 148, h: 68, label: "Vector store", sub: "PINECONE · FAISS" },
    { id: "llm", x: 588, y: 124, w: 112, h: 68, label: "LLMs", sub: "GEMINI · LLAMA" },
    { id: "workers", x: 210, y: 348, w: 140, h: 68, label: "Workers", sub: "CELERY · REDIS" },
    { id: "data", x: 404, y: 348, w: 148, h: 68, label: "Data", sub: "POSTGRESQL" },
    { id: "integrations", x: 588, y: 348, w: 112, h: 68, label: "Integrations", sub: "STRIPE · TWILIO" },
  ],
  edges: [
    { from: "clients", to: "gateway", d: "M156 230 H210" },
    { from: "gateway", to: "identity", d: "M280 196 V120" },
    { from: "gateway", to: "agents", d: "M350 230 H404" },
    { from: "agents", to: "vectors", d: "M478 196 V120" },
    { from: "agents", to: "llm", d: "M552 230 H570 V158 H588" },
    { from: "vectors", to: "llm", d: "M552 86 H570 V158 H588" },
    { from: "gateway", to: "workers", d: "M280 264 V348" },
    { from: "agents", to: "data", d: "M478 264 V348" },
    { from: "workers", to: "data", d: "M350 382 H404" },
    { from: "data", to: "integrations", d: "M552 382 H588" },
  ],
};

/** Compact layout for phones — fewer nodes, larger type. */
const COMPACT: Layout = {
  width: 360,
  height: 372,
  font: [15, 10.5],
  nodes: [
    { id: "clients", x: 8, y: 12, w: 156, h: 72, label: "Web & mobile", sub: "CLIENT APPS" },
    { id: "gateway", x: 196, y: 12, w: 156, h: 72, label: "API layer", sub: "FASTAPI · DJANGO" },
    { id: "vectors", x: 8, y: 150, w: 156, h: 72, label: "Vector store", sub: "PINECONE · FAISS" },
    { id: "agents", x: 196, y: 150, w: 156, h: 72, label: "Agent graph", sub: "LANGGRAPH" },
    { id: "llm", x: 8, y: 288, w: 156, h: 72, label: "LLMs", sub: "GEMINI · LLAMA" },
    { id: "data", x: 196, y: 288, w: 156, h: 72, label: "Data", sub: "POSTGRESQL" },
  ],
  edges: [
    { from: "clients", to: "gateway", d: "M164 48 H196" },
    { from: "gateway", to: "agents", d: "M274 84 V150" },
    { from: "agents", to: "vectors", d: "M196 186 H164" },
    { from: "vectors", to: "llm", d: "M86 222 V288" },
    { from: "agents", to: "data", d: "M274 222 V288" },
  ],
};

/** A request's path through the system, used for the ambient highlight. */
const FLOW = ["clients", "gateway", "agents", "vectors", "llm", "data"];

function pathLength(d: string) {
  // Paths are orthogonal (M/H/V only), so length is the sum of the segment deltas.
  let x = 0;
  let y = 0;
  let total = 0;
  for (const [, cmd, a, b] of d.matchAll(/([MHV])\s*(-?[\d.]+)(?:\s+(-?[\d.]+))?/g)) {
    const value = Number(a);
    if (cmd === "M") {
      x = value;
      y = Number(b);
    } else if (cmd === "H") {
      total += Math.abs(value - x);
      x = value;
    } else {
      total += Math.abs(value - y);
      y = value;
    }
  }
  return total;
}

function Diagram({ layout, active, setHover }: {
  layout: Layout;
  active: string | null;
  setHover: (id: string | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [label, sub] = layout.font;
  const isLit = (edge: Edge) => active !== null && (edge.from === active || edge.to === active);

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Diagram of a typical AI-enabled product: client apps connect through an API layer to identity, an agent graph, vector search, language models, background workers, data storage and third-party integrations."
    >
      {layout.edges.map((edge) => (
        <path
          key={`${edge.from}-${edge.to}`}
          d={edge.d}
          fill="none"
          strokeWidth={1.25}
          className={isLit(edge) ? "stroke-lime/80" : "stroke-white/15"}
          style={{ transition: "stroke 400ms" }}
        />
      ))}

      {!reduceMotion &&
        layout.edges.map((edge, i) => {
          const duration = Math.max(0.9, pathLength(edge.d) / 70);
          return (
            <circle key={`pulse-${edge.from}-${edge.to}`} r={2.6} className="fill-lime">
              <animateMotion
                dur={`${duration}s`}
                begin={`${(i * 0.37) % 2.2}s`}
                repeatCount="indefinite"
                path={edge.d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          );
        })}

      {layout.nodes.map((node) => {
        const lit = node.id === active;
        return (
          <g
            key={node.id}
            onPointerEnter={() => setHover(node.id)}
            onPointerLeave={() => setHover(null)}
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              className={lit ? "fill-graphite stroke-lime" : "fill-charcoal stroke-white/15"}
              strokeWidth={1}
              style={{ transition: "stroke 400ms, fill 400ms" }}
            />
            <rect
              x={node.x}
              y={node.y}
              width={3}
              height={node.h}
              className={lit ? "fill-lime" : "fill-white/10"}
              style={{ transition: "fill 400ms" }}
            />
            <text
              x={node.x + 16}
              y={node.y + node.h / 2 - 4}
              fontSize={label}
              className="fill-paper font-display"
              style={{ letterSpacing: "-0.01em" }}
            >
              {node.label}
            </text>
            <text
              x={node.x + 16}
              y={node.y + node.h / 2 + 15}
              fontSize={sub}
              className={lit ? "fill-lime font-mono" : "fill-mute font-mono"}
              style={{ letterSpacing: "0.06em", transition: "fill 400ms" }}
            >
              {node.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Hero visual: an architecture map of the kind of systems we build, with
 * signals travelling between modules. Hovering a module traces its links.
 */
export function SystemVisual() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % FLOW.length), 1600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = hover ?? (reduceMotion ? null : FLOW[step]);

  return (
    <figure className="relative border border-white/10 bg-charcoal/60">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      {/* Corner ticks, as on an engineering drawing */}
      {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
        (pos) => (
          <span key={pos} aria-hidden="true" className={`absolute size-3 border-lime ${pos}`} />
        ),
      )}
      <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-mute sm:px-5">
        <span>Fig. 01 — Anatomy of an AI-enabled product</span>
        <span aria-hidden="true" className="hidden sm:inline">
          {active ? `→ ${active}` : "system map"}
        </span>
      </div>
      <div className="relative p-3 sm:p-5">
        <div className="hidden sm:block">
          <Diagram layout={WIDE} active={active} setHover={setHover} />
        </div>
        <div className="sm:hidden">
          <Diagram layout={COMPACT} active={active} setHover={setHover} />
        </div>
      </div>
    </figure>
  );
}
