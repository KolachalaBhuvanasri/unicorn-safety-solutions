import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  { q: "Do you provide installation services?", a: "Yes, we offer installation guidance and can arrange on-site installation for bulk orders across most cities." },
  { q: "What is the warranty on your products?", a: "Warranty varies by product — reflective tapes typically 3–7 years outdoor, PPE 1 year, speed humps 5 years. Details on each product page." },
  { q: "How fast is delivery?", a: "In-stock items dispatch within 24–48 hours. Custom manufacturing takes 7–14 days depending on volume." },
  { q: "Can I customise products with my logo or colours?", a: "Yes. We offer custom manufacturing for bulk orders including printing, colours, dimensions and packaging." },
  { q: "What's the minimum order quantity?", a: "Minimum Order Quantity (MOQ): 10,000 Units." },
  { q: "Do you provide GST invoices?", a: "Yes, all orders come with proper GST billing. GSTIN provided on request." },
  { q: "Do you support government and PSU tenders?", a: "Absolutely — we're an approved supplier for multiple government projects and can provide all tender documentation." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">FAQ</div>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">Answers,<br/>up front.</h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="font-display text-xl">{f.q}</span>
                {open === i ? <Minus className="h-5 w-5 shrink-0 text-accent" /> : <Plus className="h-5 w-5 shrink-0 text-accent" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground text-lg">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
