import { motion } from "framer-motion";
import { Tag, ShieldCheck, FileText, Boxes, Wrench, Truck, Users, IndianRupee } from "lucide-react";

const items = [
  { icon: Tag, title: "Factory Direct Pricing" },
  { icon: ShieldCheck, title: "Premium Quality" },
  { icon: FileText, title: "GST Billing" },
  { icon: Boxes, title: "Bulk Orders" },
  { icon: Wrench, title: "Custom Manufacturing" },
  { icon: Truck, title: "Fast Delivery" },
  { icon: Users, title: "Trusted Supplier" },
  { icon: IndianRupee, title: "Competitive Pricing" },
];


export function WhyUs() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Why choose us</div>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">
            Eight reasons India's builders<br/>call us first.
          </h2>
        </div>


        <div className="mt-16 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative bg-background p-6 sm:p-8 hover:bg-ink hover:text-white transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-ink transition">
                <it.icon className="h-6 w-6" />
              </div>
              <div className="mt-6 font-display text-lg leading-tight">{it.title}</div>
              <div className="mt-4 font-mono text-xs text-muted-foreground group-hover:text-white/50">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
