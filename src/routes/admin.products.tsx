import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  Copy,
  Search,
  Filter,
  Star,
  Package,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { getProductStats, getRecentlyAddedProducts, deleteProduct } from "@/lib/db";
import type { Product } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import ProductAdminTable from "@/components/admin/ProductAdminTable";

export const Route = createFileRoute("/admin/products")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    bestSellers: 0,
    inStock: 0,
    outOfStock: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const [statsData, recentData] = await Promise.all([
        getProductStats(),
        getRecentlyAddedProducts(5),
      ]);
      setStats(statsData);
      setRecentProducts(recentData);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const success = await deleteProduct(id);
      if (success) {
        // Refresh stats
        loadStats();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const statCards = [
    {
      icon: Package,
      label: "Total Products",
      value: stats.total,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Star,
      label: "Featured",
      value: stats.featured,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "Best Sellers",
      value: stats.bestSellers,
      color: "from-green-500 to-green-600",
    },
    {
      icon: Package,
      label: "In Stock",
      value: stats.inStock,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your product catalog</p>
            </div>
            <Link
              to="/admin/products/add"
              className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <AnimatePresence>
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition"
                >
                  {isLoadingStats ? (
                    <>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-16" />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{card.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-1">
                            {card.value}
                          </p>
                        </div>
                        <div className={`bg-gradient-to-br ${card.color} p-3 rounded-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recently Added</h2>
            <Link
              to="/admin/products"
              className="text-accent hover:text-accent/80 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>

          {isLoadingStats ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    {product.main_image ? (
                      <img
                        src={product.main_image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">{product.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{product.price ? product.price.toLocaleString() : "On Request"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(product.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No products yet</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ProductAdminTable onStatsUpdate={loadStats} />
        </motion.div>
      </div>
    </div>
  );
}
