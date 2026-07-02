import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { createProduct, getCategories } from "@/lib/db";
import { ImageUpload } from "@/components/ImageUpload";
import type { Product, Category } from "@/lib/supabase";

export const Route = createFileRoute("/admin/products/add")({
  component: AddProductPage,
});

function AddProductPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (formData: any) => {
    setIsSaving(true);
    try {
      await createProduct(formData);
      navigate({ to: "/admin/products" });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate({ to: "/admin/products" })}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          </div>
        </div>
      </div>

      <ProductFormContent
        mode="add"
        onSave={handleSave}
        isSaving={isSaving}
        onCancel={() => navigate({ to: "/admin/products" })}
      />
    </div>
  );
}

export interface ProductFormContentProps {
  mode: "add" | "edit";
  product?: Product | null;
  onSave: (data: any) => void;
  isSaving: boolean;
  onCancel: () => void;
}

export function ProductFormContent({
  mode,
  product,
  onSave,
  isSaving,
  onCancel,
}: ProductFormContentProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    code: product?.code || "",
    category_id: product?.category_id || "",
    short_description: product?.short_description || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    offer_price: product?.offer_price?.toString() || "",
    material: product?.material || "",
    dimensions: product?.dimensions || "",
    weight: product?.weight || "",
    warranty: product?.warranty || "",
    stock: product?.stock?.toString() || "0",
    status: product?.status || "in_stock",
    featured: product?.featured || false,
    best_seller: product?.best_seller || false,
    features:
      product?.features?.map((f: any) => (typeof f === "string" ? f : f.feature)) ||
      [""],
    specifications:
      product?.specifications?.map((s: any) => ({
        title: typeof s === "object" ? s.title : "",
        value: typeof s === "object" ? s.value : "",
      })) || [{ title: "", value: "" }],
    images:
      product?.images?.map((i: any) => (typeof i === "string" ? i : i.image_url)) ||
      [],
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      offer_price: formData.offer_price ? parseFloat(formData.offer_price) : null,
      stock: parseInt(formData.stock) || 0,
      features: formData.features.filter((f) => f.trim()),
      specifications: formData.specifications.filter((s) => s.title && s.value),
    };

    onSave(submitData);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { title: "", value: "" }],
    });
  };

  const removeSpecification = (index: number) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Code
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="JSB-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Offer Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.offer_price}
                onChange={(e) =>
                  setFormData({ ...formData, offer_price: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Featured Product</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.best_seller}
                onChange={(e) =>
                  setFormData({ ...formData, best_seller: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Best Seller</span>
            </label>
          </div>
        </motion.div>

        {/* Descriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Descriptions</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                value={formData.short_description}
                onChange={(e) =>
                  setFormData({ ...formData, short_description: e.target.value })
                }
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="Brief description for product card"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="Detailed product description"
              />
            </div>
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Product Details</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) =>
                  setFormData({ ...formData, material: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="e.g., Rubber, PVC"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dimensions
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) =>
                  setFormData({ ...formData, dimensions: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="e.g., 500mm x 300mm x 50mm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="e.g., 8 kg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Warranty
              </label>
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) =>
                  setFormData({ ...formData, warranty: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                placeholder="e.g., 1 Year"
              />
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Features</h2>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Feature
            </button>
          </div>

          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...formData.features];
                    newFeatures[index] = e.target.value;
                    setFormData({ ...formData, features: newFeatures });
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                  placeholder="e.g., Weather resistant"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2.5 hover:bg-red-50 rounded-lg text-red-600 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Specifications</h2>
            <button
              type="button"
              onClick={addSpecification}
              className="flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Specification
            </button>
          </div>

          <div className="space-y-3">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="grid gap-2 md:grid-cols-2">
                <input
                  type="text"
                  value={spec.title}
                  onChange={(e) => {
                    const newSpecs = [...formData.specifications];
                    newSpecs[index].title = e.target.value;
                    setFormData({ ...formData, specifications: newSpecs });
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                  placeholder="Title (e.g., Height)"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => {
                      const newSpecs = [...formData.specifications];
                      newSpecs[index].value = e.target.value;
                      setFormData({ ...formData, specifications: newSpecs });
                    }}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:border-accent focus:outline-none"
                    placeholder="Value (e.g., 50mm)"
                  />
                  {formData.specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="p-2.5 hover:bg-red-50 rounded-lg text-red-600 transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <ImageUpload
            uploadedImages={formData.images}
            onImageUpload={(urls) => setFormData({ ...formData, images: urls })}
            onImageRemove={(url) =>
              setFormData({
                ...formData,
                images: formData.images.filter((img) => img !== url),
              })
            }
            maxImages={10}
          />
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              `${mode === "add" ? "Add Product" : "Update Product"}`
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-semibold transition"
          >
            Cancel
          </button>
        </motion.div>
      </div>
    </form>
  );
}
