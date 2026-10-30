"use client";

import Link from "next/link";
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ConciergeAction } from "@/lib/concierge/tools";
import { cn } from "@/lib/utils";
import { bag } from "@/components/bag/bag-store";
import { Diamond, Filigree, MaskGlyph } from "@/components/ui/ornaments";

type Msg = { role: "user" | "assistant"; content: string; actions?: ConciergeAction[] };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Good evening. I'm the house concierge. I can tell you what's on, help you choose a package, and reserve your place for the night. How may I help?",
};

const STARTERS = [
  "What's on this weekend?",
  "Which package suits four of us?",
  "What do I wear to Cowboy night?",
  "Tell me about membership",
];

type Ctx = { open: (prompt?: string) => void };
const ConciergeContext = createContext<Ctx>({ open: () => {} });
export const useConcierge = () => use(ConciergeContext);

/** Renders **bold** and line breaks from the concierge's plain-text replies. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i} className={cn(i > 0 && "mt-2.5")}>
          {para.split("\n").map((line, j) => (
            <span key={j} className={cn(j > 0 && "block", /^\s*[-•]\s/.test(line) && "block pl-3 -indent-3")}>
              {line
                .replace(/^\s*[-•]\s/, "· ")
                .split(/(\*\*[^*]+\*\*)/g)
                .map((part, k) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={k} className="font-semibold text-gold-bright">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    part
                  ),
                )}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

function ActionButton({ action, onDone }: { action: ConciergeAction; onDone: () => void }) {
  const [added, setAdded] = useState(false);
  const cls =
    "inline-flex min-h-9 items-center gap-2 border px-3.5 py-2 text-left font-display text-[0.62rem] uppercase tracking-[0.18em] transition-colors";
  if (action.type === "link") {
    return (
      <Link href={action.href} onClick={onDone} className={cn(cls, "border-gold/40 text-gold-bright hover:bg-gold/10")}>
        {action.label} <span aria-hidden>→</span>
      </Link>
    );
  }
  if (added) {
    return (
      <Link href="/checkout" onClick={onDone} className={cn(cls, "border-gold bg-gold text-onyx hover:brightness-110")}>
        Added · Go to checkout <span aria-hidden>→</span>
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        bag.addTicket(action.night, action.tier, action.qty);
        setAdded(true);
      }}
      className={cn(cls, "border-gold/60 bg-gold/10 text-gold-bright hover:bg-gold/20")}
    >
      <Diamond /> {action.label}
    </button>
  );
}

function Panel({
  onClose,
  seed,
  messages,
  setMessages,
}: {
  onClose: () => void;
  seed?: string;
  messages: Msg[];
  setMessages: React.Dispatch<React.SetStateAction<Msg[]>>;
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sentSeed = useRef(false);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      const next: Msg[] = [...messages, { role: "user", content }];
      setMessages(next);
      setInput("");
      setBusy(true);
      try {
        const res = await fetch("/api/concierge", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
        });
        const data = (await res.json()) as { reply?: string; actions?: ConciergeAction[] };
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply ?? "Forgive me, could you say that again?", actions: data.actions },
        ]);
      } catch {
        setMessages((m) => [...m, { role: "assistant", content: "The line dropped for a moment. Please try again." }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, messages, setMessages],
  );

  useEffect(() => {
    if (seed && !sentSeed.current) {
      sentSeed.current = true;
      void send(seed);
    }
    inputRef.current?.focus({ preventScroll: true });
  }, [seed, send]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
            <MaskGlyph className="h-3.5 w-7" />
          </span>
          <div>
            <p className="font-display text-sm tracking-[0.16em] text-ivory">The Concierge</p>
            <p className="flex items-center gap-1.5 text-[0.65rem] text-parchment">
              <span className="size-1.5 rounded-full bg-emerald-400/80" /> At your service, day and night
            </p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="flex size-9 items-center justify-center text-parchment hover:text-gold-bright" aria-label="Close concierge">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
            <div
              className={cn(
                "max-w-[88%] px-4 py-3 text-[0.92rem] leading-relaxed",
                m.role === "user"
                  ? "rounded-2xl rounded-br-sm bg-crimson/70 text-ivory"
                  : "rounded-2xl rounded-bl-sm border border-gold/15 bg-smoke font-serif text-[1.02rem] text-ivory",
              )}
            >
              <RichText text={m.content} />
            </div>
            {m.actions && m.actions.length > 0 && (
              <div className="mt-2 flex max-w-[92%] flex-wrap gap-2">
                {m.actions.map((a, j) => (
                  <ActionButton key={j} action={a} onDone={onClose} />
                ))}
              </div>
            )}
          </div>
        ))}
        {busy && (
          <div className="flex items-center gap-1.5 px-1 text-gold" aria-label="Concierge is typing">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-1.5 animate-twinkle rounded-full bg-gold" style={{ animationDelay: `${i * 0.18}s`, animationDuration: "1.1s" }} />
            ))}
          </div>
        )}
        {messages.length === 1 && !busy && (
          <div className="pt-2">
            <Filigree className="h-4 w-48" />
            <div className="mt-3 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-gold/25 px-3.5 py-1.5 text-[0.78rem] text-parchment transition-colors hover:border-gold/60 hover:text-ivory"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="border-t border-gold/15 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-end gap-2 rounded-2xl border border-gold/20 bg-smoke px-3 py-2 focus-within:border-gold/50">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 1500))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Ask the concierge…"
            aria-label="Message the concierge"
            className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-base text-ivory placeholder:text-muted focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-onyx transition-opacity disabled:opacity-30"
            aria-label="Send"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-[0.62rem] text-muted">Never share card or M-Pesa PINs in chat. Payment happens securely at checkout.</p>
      </form>
    </div>
  );
}

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; seed?: string }>({ open: false });
  // The conversation lives here so closing the panel doesn't lose it.
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const open = useCallback((prompt?: string) => setState({ open: true, seed: prompt }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false, seed: undefined })), []);
  const ctx = useMemo(() => ({ open }), [open]);

  return (
    <ConciergeContext value={ctx}>
      {children}

      <button
        type="button"
        onClick={() => open()}
        className={cn(
          "group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-12 items-center gap-2.5 rounded-full border border-gold/50 bg-onyx/90 pl-3 pr-5 shadow-[0_10px_40px_-10px_rgb(201_161_74/0.5)] backdrop-blur transition-[transform,opacity] duration-300 hover:border-gold-bright sm:right-6 [[data-menu=open]_&]:hidden",
          state.open && "pointer-events-none translate-y-4 opacity-0",
        )}
        aria-label="Speak to the concierge"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-b from-gold-bright to-gold-deep">
          <MaskGlyph className="h-3 w-6 text-onyx" />
        </span>
        <span className="font-display text-[0.62rem] uppercase tracking-[0.22em] text-gold-bright">Concierge</span>
      </button>

      <AnimatePresence>
        {state.open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-onyx/60 backdrop-blur-[2px]"
              onClick={close}
              aria-hidden
            />
            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Concierge chat"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="velvet fixed inset-y-0 right-0 z-[61] w-full border-l border-gold/20 sm:w-[420px]"
            >
              <Panel onClose={close} seed={state.seed} messages={messages} setMessages={setMessages} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </ConciergeContext>
  );
}

/** A button that opens the concierge, optionally with a question already asked. */
export function ConciergeButton({ prompt, children, className }: { prompt?: string; children: React.ReactNode; className?: string }) {
  const { open } = useConcierge();
  return (
    <button type="button" onClick={() => open(prompt)} className={className}>
      {children}
    </button>
  );
}
