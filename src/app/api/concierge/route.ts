import Anthropic from "@anthropic-ai/sdk";
import { CONCIERGE_SYSTEM } from "@/lib/concierge/prompt";
import { runTool, tools, type ConciergeAction } from "@/lib/concierge/tools";

export const maxDuration = 60;

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 30;
const MAX_CHARS = 1500;
const MAX_TOOL_ROUNDS = 6;

type ChatTurn = { role: "user" | "assistant"; content: string };

/** Very small per-IP limiter: 20 messages per 5 minutes per server instance. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 5 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 20;
}

function parseBody(body: unknown): ChatTurn[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_TURNS);
  const turns: ChatTurn[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) turns.push({ role, content: text });
  }
  // The conversation must start and end with the guest.
  while (turns[0]?.role === "assistant") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

const offline = (reply: string) => Response.json({ reply, actions: [] });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return offline("You're quicker than our champagne service. Give me a moment, then ask again.");
  }

  const turns = parseBody(await req.json().catch(() => null));
  if (!turns) return Response.json({ error: "Bad request" }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return offline(
      "The concierge is resting tonight. You can still browse the calendar and reserve directly from any event page.",
    );
  }

  const client = new Anthropic();
  const now = Date.now();
  const messages: Anthropic.Beta.BetaMessageParam[] = turns.map((t) => ({ role: t.role, content: t.content }));
  const actions: ConciergeAction[] = [];

  try {
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const res = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 16000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: "low" },
        system: [{ type: "text", text: CONCIERGE_SYSTEM, cache_control: { type: "ephemeral" } }],
        tools,
        messages,
      });

      if (res.stop_reason === "refusal") {
        return offline("That's not something I can help with. Is there a night or a package I can tell you about?");
      }

      if (res.stop_reason === "tool_use") {
        messages.push({ role: "assistant", content: res.content });
        const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
        for (const block of res.content) {
          if (block.type !== "tool_use") continue;
          const input = block.input && typeof block.input === "object" ? (block.input as Record<string, unknown>) : {};
          const { result, action } = runTool(block.name, input, now);
          if (action) actions.push(action);
          const failed = typeof result === "object" && result !== null && "error" in result;
          results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(result), is_error: failed || undefined });
        }
        messages.push({ role: "user", content: results });
        continue;
      }

      const reply = res.content
        .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n\n")
        .trim();
      return Response.json({ reply: reply || "How else may I help?", actions: dedupe(actions) });
    }
    return Response.json({ reply: "Let me hand you to the calendar. Everything is there.", actions: [{ type: "link", href: "/events", label: "Open the calendar" }] });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return offline("The house is busy right now. Please try again in a minute.");
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Concierge API error", error.status, error.message);
    } else {
      console.error("Concierge error", error);
    }
    return offline("I lost my train of thought for a moment. Please ask again.");
  }
}

/** Keep only the last action of each kind and target, so repeated tool calls don't stack buttons. */
function dedupe(list: ConciergeAction[]) {
  const map = new Map<string, ConciergeAction>();
  for (const a of list) map.set(a.type === "link" ? `l:${a.href}` : `t:${a.night}:${a.tier}`, a);
  return [...map.values()].slice(-3);
}
