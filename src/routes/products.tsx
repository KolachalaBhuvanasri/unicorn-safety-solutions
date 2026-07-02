import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ProductGallery } from "@/components/ProductGallery";
import { motion } from "framer-motion";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Road, Traffic & Industrial Safety | JM Enterprises" },
      { name: "description", content: "Explore our complete catalog: speed humps, cones, barriers, reflective tapes, studs, PPE, safety equipment and more." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="bg-ink text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-2" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
              Complete Catalog
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
              Every product,
              <br />
              one place.
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mb-0">
              Discover our complete range of road safety, traffic control, industrial PPE, and
              specialized equipment. Everything you need for workplace and traffic safety.
            </p>
          </motion.div>
        </section>

        {/* Products Gallery */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductGallery showFilters={true} itemsPerPage={12} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-secondary border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team can help you find the right solution or provide custom options for your
              specific requirements. Contact us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/?text=Hi%2C%20I%20need%20help%20finding%20a%20product"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition"
              >
                Chat with us on WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-block bg-accent text-accent-foreground font-bold py-3 px-8 rounded-lg hover:opacity-90 transition"
              >
                Send Inquiry
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
