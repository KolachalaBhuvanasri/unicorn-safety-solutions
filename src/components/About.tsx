import { motion } from "framer-motion";
import { CheckCircle2, Factory, Truck, Award, Building2, ShieldCheck } from "lucide-react";

const points = [
  { icon: Factory, title: "Bulk Manufacturing", text: "In-house production at IDA Jeedimetla with capacity for large volume orders." },
  { icon: ShieldCheck, title: "Premium Quality", text: "Every batch tested for durability, reflectivity and compliance." },
  { icon: Building2, title: "Government Supply", text: "Approved supplier for municipal, highway and public sector projects." },
  { icon: Truck, title: "Pan India Delivery", text: "Reliable logistics network covering all major cities and industrial zones." },
  { icon: Award, title: "Industrial Solutions", text: "Complete PPE and site safety kits customised per industry requirement." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Who we are</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">
              Engineered for<br />the road ahead.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              JM Enterprises — under the trusted <b className="text-foreground">UNICORN</b> brand — has
              spent over two decades manufacturing safety products that protect roads,
              workers and infrastructure across India.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat label="Founded" value="2012" />
              <Stat label="Factory" value="Jeedimetla" />
              <Stat label="Categories" value="50+" />
              <Stat label="SKUs" value="500+" />
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:border-accent transition"
              >
                <p.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-accent/5 group-hover:bg-accent/20 transition" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* mission / vision */}
        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          {[
            { t: "Mission", d: "To deliver world-class safety products that safeguard every road, worker and workplace across India." },
            { t: "Vision", d: "To become India's most trusted brand in road, traffic and industrial safety equipment." },
            { t: "Values", d: "Safety. Quality. Trust. Every product carries our commitment to protect what matters." },
          ].map((x) => (
            <div key={x.t} className="border-l-4 border-accent bg-secondary p-8">
              <div className="font-display text-2xl">{x.t}</div>
              <p className="mt-3 text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl">{value}</div>
    </div>
  );
}
