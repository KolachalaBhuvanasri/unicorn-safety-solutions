import { motion } from "framer-motion";
import speed from "@/assets/speed-humps.png.asset.json";
import cones from "@/assets/cones-barriers.png.asset.json";
import tapes from "@/assets/reflective-tapes.png.asset.json";
import ppe from "@/assets/ppe-gear.png.asset.json";
import traffic from "@/assets/traffic-safety.png.asset.json";
import equip from "@/assets/safety-equipment.png.asset.json";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const cats = [
  { title: "Speed Humps & Parking", count: "12+ SKUs", img: speed.url, tag: "01" },
  { title: "Cones & Barriers", count: "20+ SKUs", img: cones.url, tag: "02" },
  { title: "Reflective Tapes & Studs", count: "18+ SKUs", img: tapes.url, tag: "03" },
  { title: "PPE & Reflective Wear", count: "40+ SKUs", img: ppe.url, tag: "04" },
  { title: "Traffic & Parking Systems", count: "15+ SKUs", img: traffic.url, tag: "05" },
  { title: "Safety Equipment", count: "10+ SKUs", img: equip.url, tag: "06" },
];

export function Products() {
  return (
    <section id="products" className="py-24 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Product Catalog</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-none">Built to protect.<br/>Made to last.</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 font-bold text-white hover:bg-accent hover:text-ink transition">
            View all categories <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl bg-background border border-border hover:border-accent transition"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-4">
                <img src={c.img} alt={c.title} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-accent">{c.tag}</div>
                    <h3 className="mt-1 font-display text-xl">{c.title}</h3>
                    <div className="mt-1 text-sm text-muted-foreground">{c.count}</div>
                  </div>
                  <div className="rounded-full bg-secondary p-2 group-hover:bg-accent transition">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
