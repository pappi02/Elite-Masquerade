"use client";

import { Button } from "@/components/ui/button";
import { Filigree } from "@/components/ui/ornaments";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="velvet flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow">A small mishap</p>
      <h1 className="mt-2 font-display text-3xl text-ivory">Something slipped behind the curtain</h1>
      <Filigree className="mt-6" />
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
