import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, Eye, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
  delay?: number;
}

export function ProductCard({ product, isLoading = false, delay = 0 }: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const handleWhatsappClick = () => {
    const message = `Hi, I'm interested in ${product.name} (${product.code || product.id})`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl overflow-hidden border border-border bg-background"
      >
        <Skeleton className="w-full aspect-square" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group rounded-xl overflow-hidden border border-border bg-background hover:border-accent hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary/50 overflow-hidden flex items-center justify-center">
        {/* Placeholder while loading */}
        {isImageLoading && !isImageError && (
          <Skeleton className="w-full h-full" />
        )}

        {/* Image */}
        {!isImageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            onError={() => {
              setIsImageLoading(false);
              setIsImageError(true);
            }}
            className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="text-sm">Image not available</div>
              <div className="text-xs mt-1">{product.code || product.id}</div>
            </div>
          </div>
        )}

        {/* Badge */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 left-3 bg-white/80 hover:bg-white text-ink p-2 rounded-full transition opacity-0 group-hover:opacity-100"
          aria-label="Add to favorites"
        >
          <Heart
            className="h-4 w-4"
            fill={isFavorited ? "currentColor" : "none"}
          />
        </button>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="bg-accent text-accent-foreground p-3 rounded-full hover:bg-accent/90 transition transform scale-0 group-hover:scale-100"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button
            onClick={handleWhatsappClick}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition transform scale-0 group-hover:scale-100"
            title="WhatsApp Inquiry"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Tag */}
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {product.category.replace(/-/g, " ")}
        </div>

        {/* Product Name */}
        <h3 className="font-display text-lg font-bold line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Product Code */}
        {product.code && (
          <div className="text-xs text-accent font-mono mb-2">
            Code: {product.code}
          </div>
        )}

        {/* Short Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mb-4">
          {product.price ? (
            <div className="text-xl font-bold text-accent">
              ₹{product.price.toLocaleString()}
            </div>
          ) : (
            <div className="text-sm font-semibold text-muted-foreground">
              Price on Request
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            to={`/product/${product.id}`}
            className="w-full bg-ink text-white font-semibold py-2 px-3 rounded-md hover:bg-ink/90 transition text-center text-sm"
          >
            View Details
          </Link>
          <button
            onClick={handleWhatsappClick}
            className="w-full bg-green-500 text-white font-semibold py-2 px-3 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <Link
            to="/contact"
            className="w-full bg-secondary text-ink font-semibold py-2 px-3 rounded-md hover:bg-secondary/80 transition text-center text-sm border border-border"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
