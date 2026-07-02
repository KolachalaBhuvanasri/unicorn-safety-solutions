import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Share2,
  Heart,
  ShoppingCart,
  Check,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ProductCard } from "@/components/ProductCard";
import {
  getProductById,
  getCategoryById,
  getRelatedProducts,
} from "@/lib/products";
import { Skeleton } from "@/components/ui/skeleton";

const NotFoundView = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The product you're looking for doesn't exist.
      </p>
      <Link
        to="/products"
        className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90"
      >
        Back to Products
      </Link>
    </div>
  </div>
);

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailPage,
  notFoundComponent: NotFoundView,
});


function ProductDetailPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const product = getProductById(id);
  const category = product ? getCategoryById(product.category) : null;
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "features" | "specifications" | "applications"
  >("features");

  if (!product) {
    return <NotFoundView />;
  }


  const handleWhatsappClick = () => {
    const message = `Hi, I'm interested in ${product.name} (${product.code || product.id}). Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div className="bg-secondary/50 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/products"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Products
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                to="/products"
                className="text-muted-foreground hover:text-foreground transition"
              >
                {category?.name}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-semibold">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={() => router.history.back()}
              className="mb-8 flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="rounded-xl bg-secondary/50 aspect-square flex items-center justify-center overflow-hidden border border-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="eager"
                    className="w-full h-full object-contain p-6"
                  />
                </div>

                {/* Featured Badge */}
                {product.featured && (
                  <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg w-fit">
                    <Check className="h-4 w-4" />
                    <span className="font-semibold">Featured Product</span>
                  </div>
                )}
              </motion.div>

              {/* Details Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {/* Category */}
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {category?.name}
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                  {product.name}
                </h1>

                {/* Product Code */}
                {product.code && (
                  <div className="text-lg font-mono text-accent font-bold mb-4">
                    {product.code}
                  </div>
                )}

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border">
                  {product.price ? (
                    <div className="flex items-baseline gap-2">
                      <div className="text-4xl font-bold text-accent">
                        ₹{product.price.toLocaleString()}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Excluding GST
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-muted-foreground">
                      Price on Request
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid gap-3 mb-8 sm:grid-cols-2">
                  <button
                    onClick={handleWhatsappClick}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Inquiry
                  </button>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold py-3 px-4 rounded-lg hover:opacity-90 transition"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Request Quote
                  </Link>
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="flex items-center justify-center gap-2 bg-secondary text-ink font-bold py-3 px-4 rounded-lg hover:bg-secondary/80 transition border border-border"
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={isFavorited ? "currentColor" : "none"}
                    />
                    {isFavorited ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 bg-secondary text-ink font-bold py-3 px-4 rounded-lg hover:bg-secondary/80 transition border border-border"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>

                {/* Additional Info */}
                <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Pan-India Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        We deliver to all corners of India. Contact us for bulk orders and corporate pricing.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tabs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 border-t border-border pt-12"
            >
              {/* Tab Navigation */}
              <div className="flex gap-4 mb-8 border-b border-border">
                {(
                  ["features", "specifications", "applications"] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-semibold capitalize transition border-b-2 ${
                      activeTab === tab
                        ? "border-accent text-accent"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === "features" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
                      >
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "specifications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="overflow-x-auto"
                  >
                    <table className="w-full text-sm">
                      <tbody>
                        {product.specifications.map((spec, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-border ${
                              idx % 2 === 0 ? "bg-secondary/20" : ""
                            }`}
                          >
                            <td className="py-3 px-4 font-semibold">
                              {spec.key}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {activeTab === "applications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-2 sm:grid-cols-2"
                  >
                    {product.applications.map((app, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border"
                      >
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 border-t border-border pt-12"
              >
                <h2 className="font-display text-3xl sm:text-4xl mb-8">
                  Related Products
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-ink to-ink/80 rounded-xl p-8 sm:p-12 text-white text-center"
            >
              <h2 className="font-display text-3xl sm:text-4xl mb-4">
                Ready to order?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Contact our sales team for pricing, bulk orders, and custom solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsappClick}
                  className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </button>
                <Link
                  to="/contact"
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Send Inquiry
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
