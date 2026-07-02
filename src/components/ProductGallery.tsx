import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Grid3x3,
  List,
  X,
} from "lucide-react";
import { ProductCard } from "./ProductCard";
import {
  filterProducts,
  sortProducts,
  categories,
  products,
} from "@/lib/products";
import type { Product } from "@/lib/products";

type SortOption = "name-asc" | "name-desc" | "featured" | "latest";
type ViewMode = "grid" | "list";

interface ProductGalleryProps {
  initialCategory?: string;
  showFilters?: boolean;
  itemsPerPage?: number;
}

export function ProductGallery({
  initialCategory,
  showFilters = true,
  itemsPerPage = 12,
}: ProductGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory
  );
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showFeatured, setShowFeatured] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    featured: true,
  });

  const filteredProducts = useMemo(() => {
    let result = filterProducts(
      selectedCategory,
      showFeatured ? true : undefined,
      searchQuery || undefined
    );
    return sortProducts(result, sortBy);
  }, [selectedCategory, showFeatured, searchQuery, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const categoryCount = (categoryId: string) => {
    return products.filter((p) => p.category === categoryId).length;
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId || undefined);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
    setSortBy("latest");
    setShowFeatured(false);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || showFeatured || sortBy !== "latest";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-2">
              Product Gallery
            </h2>
            <p className="text-muted-foreground">
              Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
              products
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition ${
                viewMode === "grid"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition ${
                viewMode === "list"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="lg:col-span-1">
            {/* Search Box */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                Search Products
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6 border-b border-border pb-6">
              <button
                onClick={() =>
                  setExpandedFilters((prev) => ({
                    ...prev,
                    category: !prev.category,
                  }))
                }
                className="flex w-full items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    expandedFilters.category ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedFilters.category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 cursor-pointer text-sm mb-2">
                      <input
                        type="checkbox"
                        checked={!selectedCategory}
                        onChange={() => handleCategoryChange(null)}
                        className="rounded border border-border"
                      />
                      <span>All Products</span>
                    </label>
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 cursor-pointer text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.id}
                          onChange={() =>
                            handleCategoryChange(
                              selectedCategory === cat.id ? null : cat.id
                            )
                          }
                          className="rounded border border-border"
                        />
                        <span className="flex-1">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({categoryCount(cat.id)})
                        </span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Featured Filter */}
            <div className="mb-6 border-b border-border pb-6">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={showFeatured}
                  onChange={(e) => {
                    setShowFeatured(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border border-border"
                />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Featured Products Only
                </span>
              </label>
            </div>

            {/* Sorting */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  handleSortChange(e.target.value as SortOption)
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
              >
                <option value="latest">Latest</option>
                <option value="name-asc">Name: A - Z</option>
                <option value="name-desc">Name: Z - A</option>
                <option value="featured">Featured First</option>
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full bg-secondary text-ink font-semibold py-2 px-3 rounded-lg hover:bg-secondary/80 transition text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {paginatedProducts.length > 0 ? (
            <>
              {/* Grid View */}
              {viewMode === "grid" && (
                <motion.div
                  layout
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        delay={idx * 0.05}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <motion.div layout className="space-y-4 mb-8">
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex gap-4 rounded-lg border border-border bg-background p-4 hover:border-accent transition"
                      >
                        <div className="w-32 h-32 bg-secondary/50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                            {product.category.replace(/-/g, " ")}
                          </div>
                          <h3 className="font-display text-lg font-bold mb-1">
                            {product.name}
                          </h3>
                          {product.code && (
                            <div className="text-xs text-accent font-mono mb-2">
                              Code: {product.code}
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground mb-3">
                            {product.shortDescription}
                          </p>
                          {product.price ? (
                            <div className="text-lg font-bold text-accent mb-3">
                              ₹{product.price.toLocaleString()}
                            </div>
                          ) : (
                            <div className="text-sm font-semibold text-muted-foreground mb-3">
                              Price on Request
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg border transition ${
                          currentPage === page
                            ? "bg-accent text-accent-foreground border-accent"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                No products found
              </p>
              <button
                onClick={clearFilters}
                className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
