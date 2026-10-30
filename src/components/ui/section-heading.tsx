import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className="font-display text-[clamp(1.7rem,6vw,2.75rem)] leading-[1.08] tracking-[0.02em] text-ivory">{title}</Tag>
      {intro && <div className="mt-4 font-serif text-[1.08rem] leading-relaxed text-parchment sm:text-[1.2rem]">{intro}</div>}
    </div>
  );
}
