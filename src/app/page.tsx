import { BoutiqueTeaser } from "@/components/home/boutique-teaser";
import { ConciergeCta } from "@/components/home/concierge-cta";
import { ExperienceIndex } from "@/components/home/experience-index";
import { Hero } from "@/components/home/hero";
import { HouseAndGames, Manifesto, MembershipBand, Packages, ThemeMarquee } from "@/components/home/sections";
import { CalendarStrip, ThisWeekend } from "@/components/events/night-feature";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeMarquee />
      <Manifesto />
      <ThisWeekend />
      <ExperienceIndex />
      <Packages />
      <CalendarStrip />
      <ConciergeCta />
      <BoutiqueTeaser />
      <MembershipBand />
      <HouseAndGames />
    </main>
  );
}
