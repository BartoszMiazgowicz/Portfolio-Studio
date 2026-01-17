import { Navbar, Footer, ClientWrapper } from "@/components/layout";
import {
  Hero,
  Philosophy,
  Projects,
  Process,
  About,
  FinalCTA,
  HorizontalGallery,
} from "@/components/sections";
import { TextMarquee, TextMarqueeReverse } from "@/components/ui";

export default function Home() {
  return (
    <ClientWrapper>
      <main className="min-h-screen bg-black-rich">
        <Navbar />
        <Hero />
        <Philosophy />

        {/* Marquee Band - Editorial luxury feel */}
        <TextMarquee />

        <section id="work">
          <Projects />
        </section>

        {/* Horizontal Scroll Gallery - WOW factor */}
        <HorizontalGallery />

        {/* Second marquee - reverse direction for visual interest */}
        <TextMarqueeReverse />

        <section id="process">
          <Process />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <FinalCTA />
        </section>
        <Footer />
      </main>
    </ClientWrapper>
  );
}
