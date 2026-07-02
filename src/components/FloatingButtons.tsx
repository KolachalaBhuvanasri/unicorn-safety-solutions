import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href="https://wa.me/919640496150" target="_blank" rel="noreferrer" className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow hover:scale-110 transition">
        <MessageCircle className="h-6 w-6" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink px-3 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition">WhatsApp</span>
      </a>
      <a href="tel:9640496150" className="group flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-glow hover:scale-110 transition">
        <Phone className="h-6 w-6" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink px-3 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition">Call</span>
      </a>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lg hover:scale-110 transition"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
