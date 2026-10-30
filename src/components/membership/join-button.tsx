"use client";

import { useRouter } from "next/navigation";
import { bag } from "@/components/bag/bag-store";
import { Arrow, Button } from "@/components/ui/button";

export function JoinButton({ slug, name, featured }: { slug: string; name: string; featured?: boolean }) {
  const router = useRouter();
  return (
    <Button
      variant={featured ? "gold" : "outline"}
      className="w-full"
      onClick={() => {
        bag.setMembership(slug);
        router.push("/checkout");
      }}
    >
      Join as {name.replace(/^The /, "")} <Arrow />
    </Button>
  );
}
