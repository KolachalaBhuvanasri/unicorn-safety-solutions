import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/jm-logo.png.asset.json";

const nav = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Industries", to: "/#industries" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo.url} alt="JM Enterprises" className="h-11 w-11 rounded-full ring-2 ring-accent" />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-lg tracking-wide">JM ENTERPRISES</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Brand · Unicorn</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-accent transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:9640496150" className="flex items-center gap-2 text-sm font-semibold">
            <Phone className="h-4 w-4 text-accent" /> 96404 96150
          </a>
          <Link to="/contact" className="rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-glow hover:brightness-110 transition">
            Get Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden shrink-0 rounded-md border border-border p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col p-4 gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-4 py-3 font-semibold hover:bg-secondary">
                  {n.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-accent px-4 py-3 text-center font-bold text-accent-foreground">
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
