import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "@/lib/db";
import type { Category } from "@/lib/supabase";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const finalSlug =
        slug.trim() ||
        name
          .trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

      await createCategory(name.trim(), finalSlug);
      setName("");
      setSlug("");
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? This will also remove products in the category.")) return;
    try {
      await deleteCategory(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Category Management</h1>
          <button onClick={() => navigate({ to: "/admin/products" })} className="text-accent hover:underline">Back to products</button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <form onSubmit={handleAdd} className="md:col-span-2 bg-white p-4 rounded-lg border">
            <div className="grid gap-3 md:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" className="border rounded px-3 py-2" required />
              <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug (optional)" className="border rounded px-3 py-2" />
            </div>
            <div className="mt-3">
              <button type="submit" className="bg-accent text-accent-foreground px-4 py-2 rounded">Add Category</button>
            </div>
          </form>

          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Total categories: <strong>{categories.length}</strong></p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold mb-4">Categories</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.slug}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate({ to: `/admin/products?category=${c.id}` })} className="text-sm text-accent">View products</button>
                    <button onClick={() => handleDelete(c.id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
