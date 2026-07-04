import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact JM Enterprises — Get a Quote Today" },
      { name: "description", content: "Get in touch for road safety and industrial safety product quotes. Factory in Jeedimetla, office in Secunderabad. Call +91 96404 96150." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-ink text-white py-20 relative">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-2" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Contact</div>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl">Let's build<br/>safer.</h1>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl">Reach us directly</h2>
              <div className="mt-8 space-y-6">
                <Info icon={Phone} title="Phone" lines={["+91 96404 96150"]} href="tel:9640496150" />
                <Info icon={Mail} title="Email" lines={["enterprisesjm2001@gmail.com"]} href="mailto:enterprisesjm2001@gmail.com" />
                <Info icon={MapPin} title="Factory" lines={["Phase III, Plot No. 30/A, IDA Jeedimetla,", "Quthbullapur, Medchal"]} />
                <Info icon={MapPin} title="Office" lines={["H.No.6-7-49/2, Bansilalpet,", "Secunderabad – 500003"]} />
                <Info icon={Clock} title="Business Hours" lines={["Mon–Sat: 9:30 AM – 7:00 PM", "Sunday: Closed"]} />
              </div>

            </div>


            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl border border-border bg-secondary p-8"
            >
              <h2 className="font-display text-3xl">Request a quote</h2>
              <p className="mt-2 text-muted-foreground text-sm">Tell us what you need. We reply within one working day.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
                <Field label="Phone" name="phone" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="mt-4">
                <Field label="Product / Category" name="product" />
              </div>
              <div className="mt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea name="message" rows={5} className="mt-1 w-full rounded-md border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none" />
              </div>

              <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-bold text-accent-foreground shadow-glow hover:brightness-110 transition">
                <Send className="h-4 w-4" /> Send inquiry
              </button>

              {sent && <div className="mt-4 rounded-md border border-accent bg-accent/10 p-3 text-sm">Thanks — we'll be in touch shortly.</div>}
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

function Info({ icon: Icon, title, lines, href }: any) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap href={href} className="flex gap-4 group">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-ink transition">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-display text-lg">{title}</div>
        {lines.map((l: string) => <div key={l} className="text-muted-foreground">{l}</div>)}
      </div>
    </Wrap>
  );
}

function Field({ label, name, type = "text", required }: any) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="mt-1 w-full rounded-md border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none" />
    </div>
  );
}
