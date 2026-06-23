import { HeroSection } from "@/components/sections/HeroSection";
import { SpiritSection } from "@/components/sections/SpiritSection";
import { IncentivesSection } from "@/components/sections/IncentivesSection";
import { ExpectationsSection } from "@/components/sections/ExpectationsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <SpiritSection />
      <IncentivesSection />
      <ExpectationsSection />
      <FAQSection />
      <SponsorsSection />
      <ContactSection />
      <FinalCtaSection />
    </main>
  );
}
