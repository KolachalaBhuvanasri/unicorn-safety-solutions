import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Owner } from "@/components/Owner";
import { WhyUs } from "@/components/WhyUs";
import { Products } from "@/components/Products";
import { Industries } from "@/components/Industries";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JM Enterprises · UNICORN — Road Safety Starts With Quality" },
      { name: "description", content: "Manufacturer of speed humps, cones, reflective tapes, PPE and industrial safety equipment. Factory direct pricing. Pan-India delivery. Government approved supplier." },
      { property: "og:title", content: "JM Enterprises · UNICORN — Road Safety Starts With Quality" },
      { property: "og:description", content: "Leading manufacturer & supplier of road, traffic, parking and industrial safety products since 2001." },
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
        <Owner />
        <WhyUs />
        <Products />
        <Industries />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
