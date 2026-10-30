"use client";

import { useEffect, useRef } from "react";
import { videos, type VideoKey } from "@/lib/videos";
import { cn, seeded } from "@/lib/utils";
import { MaskGlyph } from "@/components/ui/ornaments";

/** Plays while on screen, pauses when off screen or when the page is left. */
function useAutoplay(ref: React.RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
    };
  }, [ref, enabled]);
}

/** Gold dust specks drawn at fixed positions so server and client agree. */
function Dust({ seed, count = 14 }: { seed: number; count?: number }) {
  const rnd = seeded(seed);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + rnd() * 3;
        return (
          <span
            key={i}
            aria-hidden
            className="absolute animate-twinkle rounded-full bg-gold-bright shadow-[0_0_8px_2px_rgb(240_212_138/0.5)]"
            style={{
              left: `${rnd() * 100}%`,
              top: `${rnd() * 100}%`,
              width: size,
              height: size,
              animationDelay: `${(rnd() * 3.4).toFixed(2)}s`,
              animationDuration: `${(2.6 + rnd() * 2.4).toFixed(2)}s`,
            }}
          />
        );
      })}
    </>
  );
}

/**
 * A video slot. Shows the real clip once `src` is set in lib/videos.ts;
 * until then it shows a slow, candle-lit placeholder so layouts look finished.
 */
export function VideoSlot({
  name,
  className,
  label = true,
  priority = false,
}: {
  name: VideoKey;
  className?: string;
  /** Show the film title on the placeholder. */
  label?: boolean;
  priority?: boolean;
}) {
  const video = videos[name];
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplay(ref, Boolean(video.src));
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 7);

  if (video.src) {
    return (
      <div className={cn("relative overflow-hidden bg-lacquer", className)}>
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "none"}
          aria-label={video.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  const flip = seed % 2 === 0;
  return (
    <div className={cn("velvet grain relative isolate overflow-hidden", className)} role="img" aria-label={video.title}>
      <div aria-hidden className="absolute inset-[-20%] animate-drift" style={{ animationDelay: `-${seed % 12}s` }}>
        <div
          className="absolute size-[70%] rounded-full opacity-60"
          style={{
            left: flip ? "5%" : "35%",
            top: "10%",
            background: "radial-gradient(circle, rgb(142 15 29 / .7), transparent 65%)",
          }}
        />
        <div
          className="absolute size-[55%] rounded-full opacity-50"
          style={{
            left: flip ? "45%" : "8%",
            top: "40%",
            background: "radial-gradient(circle, rgb(201 161 74 / .35), transparent 65%)",
          }}
        />
      </div>
      <Dust seed={seed} />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(7_6_5/0.85))]" />
      {label && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 pb-3 text-[0.6rem] uppercase tracking-[0.28em] text-parchment/70">
          <MaskGlyph className="h-3 w-6 opacity-70" />
          <span className="truncate">{video.title}</span>
        </div>
      )}
    </div>
  );
}
