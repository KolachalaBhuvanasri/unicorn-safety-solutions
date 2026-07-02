import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { useState } from "react";
import { Search } from "lucide-react";
import speed from "@/assets/speed-humps.png.asset.json";
import cones from "@/assets/cones-barriers.png.asset.json";
import tapes from "@/assets/reflective-tapes.png.asset.json";
import ppe from "@/assets/ppe-gear.png.asset.json";
import traffic from "@/assets/traffic-safety.png.asset.json";
import equip from "@/assets/safety-equipment.png.asset.json";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Road, Traffic & Industrial Safety | JM Enterprises" },
      { name: "description", content: "Explore our complete catalog: speed humps, cones, barriers, reflective tapes, studs, PPE, safety equipment and more." },
    ],
  }),
  component: ProductsPage,
});

const products = [
  { cat: "Speed Humps", img: speed.url, items: ["JSB-001", "JSB-002", "JSB-003", "JSB-004", "PVC JSB-005", "ECO JSB-006", "Wheel Chocks", "Corner Guards", "Wall Protectors"] },
  { cat: "Cones & Barriers", img: cones.url, items: ["Safety Cones", "PVC Spring Poles", "PVC Barriers", "PVC Link Chains", "Water Barriers"] },
  { cat: "Reflective Tapes & Studs", img: tapes.url, items: ["3M Reflective Tapes", "Raised Pavement Markers", "Solar Studs", "Reflective Studs", "Cable Protectors"] },
  { cat: "PPE & Reflective Wear", img: ppe.url, items: ["Reflective Jackets", "Gloves", "Reflective Caps", "Safety Helmet", "Safety Goggles", "Protective Shoes"] },
  { cat: "Traffic & Parking Systems", img: traffic.url, items: ["Median Markers", "LED Batons", "Convex Mirrors", "Queue Controllers", "Wheel Clamp Locks"] },
  { cat: "Safety Equipment", img: equip.url, items: ["Speed Gun", "Metal Detector", "Tree Guards", "PVC Caps", "Full Body Harness"] },
];

function ProductsPage() {
  const [q, setQ] = useState("");
  const filtered = products
    .map((p) => ({ ...p, items: p.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) }))
    .filter((p) => !q || p.cat.toLowerCase().includes(q.toLowerCase()) || p.items.length);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-ink text-white py-20">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-2" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Complete Catalog</div>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl">Every product,<br/>one place.</h1>
            <div className="mt-8 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, categories, SKUs..."
                className="w-full rounded-md border border-white/20 bg-white/10 pl-12 pr-4 py-4 text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            {filtered.map((p) => (
              <div key={p.cat}>
                <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                  <h2 className="font-display text-3xl sm:text-4xl">{p.cat}</h2>
                  <div className="text-sm text-muted-foreground">{p.items.length} products</div>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                  <div className="rounded-xl bg-secondary aspect-square flex items-center justify-center p-6">
                    <img src={p.img} alt={p.cat} className="max-h-full max-w-full object-contain" />
                  </div>
                  {p.items.map((it) => (
                    <div key={it} className="group rounded-xl border border-border p-6 hover:border-accent hover:shadow-hard transition">
                      <div className="font-display text-lg">{it}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.cat}</div>
                      <div className="mt-6 flex gap-2">
                        <Link to="/contact" className="text-xs font-bold uppercase tracking-wider text-accent">Request Quote →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
