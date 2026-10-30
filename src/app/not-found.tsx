import { ButtonLink } from "@/components/ui/button";
import { Filigree, MaskGlyph } from "@/components/ui/ornaments";

export default function NotFound() {
  return (
    <main className="velvet grain relative flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <MaskGlyph className="h-10 w-20" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-2 font-display text-[clamp(1.8rem,7vw,3rem)] text-ivory">This room is private</h1>
      <p className="mt-3 max-w-md font-serif text-lg text-parchment">The page you&apos;re looking for doesn&apos;t exist, or it&apos;s behind a mask.</p>
      <Filigree className="mt-6" />
      <ButtonLink href="/" className="mt-8">
        Back to the house
      </ButtonLink>
    </main>
  );
}
