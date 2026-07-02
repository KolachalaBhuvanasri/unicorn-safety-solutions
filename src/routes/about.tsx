import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { About } from "@/components/About";
import { Owner } from "@/components/Owner";
import { Certifications } from "@/components/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JM Enterprises — 23 Years of Safety Manufacturing" },
      { name: "description", content: "Founded in 2001, JM Enterprises manufactures road safety, traffic safety, PPE and industrial safety products under the UNICORN brand." },
    ],
  }),
  component: () => (
    <>
      <Navbar />
      <main>
        <section className="bg-ink text-white py-20">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-2" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">About Us</div>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl">Two decades.<br/>One mission.</h1>
          </div>
        </section>
        <About />
        <Owner />
        <Certifications />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  ),
});
