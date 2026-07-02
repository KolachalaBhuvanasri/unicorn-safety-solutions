import { motion } from "framer-motion";
import { ArrowRight, Download, MessageCircle, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import cones from "@/assets/cones-barriers.png.asset.json";
import speed from "@/assets/speed-humps.png.asset.json";
import tapes from "@/assets/reflective-tapes.png.asset.json";
import ppe from "@/assets/ppe-gear.png.asset.json";

const floatingItems = [
  { src: cones.url, className: "top-10 left-[6%] w-40 md:w-56", delay: 0 },
  { src: speed.url, className: "top-20 right-[8%] w-44 md:w-64", delay: 0.4 },
  { src: tapes.url, className: "bottom-16 left-[10%] w-36 md:w-52", delay: 0.8 },
  { src: ppe.url, className: "bottom-8 right-[6%] w-32 md:w-48", delay: 1.2 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* hazard stripe top */}
      <div className="hazard-stripe absolute inset-x-0 top-0 h-2" />

      {/* grid backdrop */}
      <div className="grid-noise absolute inset-0 opacity-[0.08]" />

      {/* floating product images */}
      {floatingItems.map((it, i) => (
        <motion.img
          key={i}
          src={it.src}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute opacity-15 md:opacity-25 mix-blend-screen ${it.className}`}
          initial={{ y: 0 }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6 + i, delay: it.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <Zap className="h-3.5 w-3.5" /> Trusted since 2001 · Brand UNICORN
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-7xl lg:text-[8rem]">
            ROAD SAFETY
            <br />
            <span className="text-accent">STARTS WITH</span>
            <br />
            <span className="text-stroke">QUALITY.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-white/70 sm:text-xl">
            Leading manufacturer & supplier of Road Safety, Traffic Safety, Parking Safety
            and Industrial PPE equipment — engineered in India, delivered pan-India.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-4 font-bold text-accent-foreground shadow-glow hover:brightness-110 transition">
              Get Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-4 font-bold text-white hover:bg-white/10 transition">
              Explore Products
            </Link>
            <a href="#downloads" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-4 font-bold text-white hover:bg-white/10 transition">
              <Download className="h-4 w-4" /> Catalogue
            </a>
            <a href="https://wa.me/919640496150" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-4 font-bold text-white hover:brightness-110 transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              ["23+", "Years"],
              ["500+", "Products"],
              ["1000+", "Clients"],
              ["Pan India", "Delivery"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-accent sm:text-5xl">{n}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/60">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hazard-stripe h-2" />
    </section>
  );
}
