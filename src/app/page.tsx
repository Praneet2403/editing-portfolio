import { About } from "@/components/About";
import { Band } from "@/components/Band";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MobileCta } from "@/components/MobileCta";
import { Pricing } from "@/components/Pricing";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Hero />
      <About />
      <Band />
      <Work />
      <Pricing />
      <Contact />
      <MobileCta />
    </main>
  );
}
