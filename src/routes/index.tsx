import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { Products } from "@/components/Products";
import { Industries } from "@/components/Industries";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JM Enterprises · UNICORN — Your Safety, Our Commitment" },
      { name: "description", content: "Manufacturer of speed humps, cones, reflective tapes, PPE and industrial safety equipment. Factory direct pricing. Pan-India delivery. Government approved supplier." },
      { property: "og:title", content: "JM Enterprises · UNICORN — Your Safety, Our Commitment" },
      { property: "og:description", content: "Leading manufacturer & supplier of road, traffic, parking and industrial safety products since 2012." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Certifications />
        <About />
        <WhyUs />
        <Products />
        <Industries />
        <Testimonials />
        <FAQ />
        <MapSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

