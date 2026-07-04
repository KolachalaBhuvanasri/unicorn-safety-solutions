import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Globe, Share2, MessageCircle } from "lucide-react";
import logo from "@/assets/jm-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="hazard-stripe h-2" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="JM Enterprises" className="h-12 w-12 rounded-full ring-2 ring-accent" />
            <div>
              <div className="font-display text-xl">JM ENTERPRISES</div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">Brand · Unicorn</div>
            </div>
          </div>
          <p className="mt-6 text-white/70 max-w-sm">
            Manufacturer & supplier of road safety, traffic safety, parking safety and
            industrial PPE equipment since 2012.
          </p>
          <div className="mt-6 flex gap-2">
            {[Globe, Share2, MessageCircle].map((I, i) => (
              <a key={i} href="#" className="rounded-full border border-white/20 p-2.5 hover:bg-accent hover:text-ink hover:border-accent transition">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="font-display text-sm uppercase tracking-widest text-accent">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/products" className="hover:text-accent">Products</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="font-display text-sm uppercase tracking-widest text-accent">Categories</div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Speed Humps & Parking</li>
            <li>Cones & Barriers</li>
            <li>Reflective Tapes & Studs</li>
            <li>PPE & Reflective Wear</li>
            <li>Traffic & Parking Systems</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="font-display text-sm uppercase tracking-widest text-accent">Contact</div>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent mt-0.5" /> +91 96404 96150</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-accent mt-0.5" /> enterprisesjm2001@gmail.com</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" /> H.No.6-7-49/2, Bansilalpet, Secunderabad – 500003</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} JM Enterprises · Brand UNICORN. All rights reserved.</div>
          <div>Designed for safety. Built for trust.</div>
        </div>
      </div>
    </footer>
  );
}
