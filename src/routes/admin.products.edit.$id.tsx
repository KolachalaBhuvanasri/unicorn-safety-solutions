import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getProductById, updateProduct } from "@/lib/db";
import type { Product } from "@/lib/supabase";
import { ProductFormContent } from "./admin.products.add";

export const Route = createFileRoute("/admin/products/edit/$id")({
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = useParams({ from: "/admin/products/edit/$id" });
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData: any) => {
    setIsSaving(true);
    try {
      await updateProduct(id, formData);
      navigate({ to: "/admin/products" });
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate({ to: "/admin/products" })}
            className="text-accent hover:underline"
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          </div>
        </div>
      </div>

      <ProductFormContent
        mode="edit"
        product={product}
        onSave={handleSave}
        isSaving={isSaving}
        onCancel={() => navigate({ to: "/admin/products" })}
      />
    </div>
  );
}
