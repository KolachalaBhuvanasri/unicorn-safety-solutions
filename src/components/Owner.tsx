import { motion } from "framer-motion";
import founder from "@/assets/founder.jpg.asset.json";
import { Quote } from "lucide-react";

export function Owner() {
  return (
    <section className="relative bg-ink text-white py-24 sm:py-32 overflow-hidden">
      <div className="hazard-stripe absolute inset-x-0 top-0 h-1.5" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 blur-2xl rounded-full" />
              <img
                src={founder.url}
                alt="K. Jaganmohan Reddy — Founder, JM Enterprises"
                className="relative w-full max-w-md mx-auto rounded-lg border-4 border-accent shadow-hard grayscale-[10%]"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent px-4 py-2 font-display text-ink text-lg shadow-hard">
                Est. 2001
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Founder's Message</div>
            <Quote className="mt-4 h-10 w-10 text-accent" />
            <blockquote className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
              "Every product we ship is a promise — that someone's father, mother, or child
              will get home safely. That's the standard we build to."
            </blockquote>
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="font-display text-2xl">K. Jaganmohan Reddy</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-accent">Founder & Managing Director</div>
              <p className="mt-4 text-white/70 max-w-2xl">
                With over two decades of experience in industrial and road safety manufacturing,
                Jaganmohan Reddy leads JM Enterprises with a singular vision — to make Indian
                roads and workplaces safer, one quality product at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
