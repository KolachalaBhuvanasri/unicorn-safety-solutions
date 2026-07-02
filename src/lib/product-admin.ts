/**
 * Product Management Utilities
 * 
 * This file contains helper functions for managing the product catalog,
 * including image discovery, product updates, and data validation.
 */

import type { Product, Category } from "./products";

/**
 * Discover images from public/products folder
 * This function would be used to auto-discover new product images
 * and generate product entries
 */
export async function discoverProductImages(): Promise<string[]> {
  try {
    const response = await fetch("/api/products/images");
    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Failed to discover product images:", error);
    return [];
  }
}

/**
 * Generate product object from image filename
 */
export function generateProductFromImage(
  imagePath: string,
  categoryId?: string
): Partial<Product> {
  const filename = imagePath.split("/").pop() || "";
  const name = filename.replace(/\.[^.]+$/, "").replace(/-/g, " ");

  return {
    id: filename.replace(/\.[^.]+$/, "").toLowerCase(),
    name: name.charAt(0).toUpperCase() + name.slice(1),
    image: imagePath,
    category: categoryId || "other",
    featured: false,
    price: null,
    shortDescription: `${name} - Safety equipment for professional use`,
    description: `High-quality ${name.toLowerCase()} designed for safety and durability.`,
    specifications: [],
    features: [
      "Durable construction",
      "Weather resistant",
      "Professional grade",
    ],
    applications: ["General use", "Industrial applications"],
  };
}

/**
 * Validate product object
 */
export function validateProduct(product: Product): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!product.id) errors.push("Product ID is required");
  if (!product.name) errors.push("Product name is required");
  if (!product.category) errors.push("Product category is required");
  if (!product.image) errors.push("Product image path is required");
  if (!product.description) errors.push("Product description is required");

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Export products to CSV format
 */
export function exportProductsToCSV(products: Product[]): string {
  const headers = [
    "ID",
    "Name",
    "Code",
    "Category",
    "Price",
    "Featured",
    "Description",
  ];
  const rows = products.map((p) => [
    p.id,
    p.name,
    p.code || "",
    p.category,
    p.price || "On Request",
    p.featured ? "Yes" : "No",
    p.description,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
}

/**
 * Export products to JSON format
 */
export function exportProductsToJSON(products: Product[]): string {
  return JSON.stringify({ products }, null, 2);
}

/**
 * Import products from JSON
 */
export function importProductsFromJSON(jsonString: string): {
  success: boolean;
  products?: Product[];
  error?: string;
} {
  try {
    const data = JSON.parse(jsonString);
    const products = Array.isArray(data) ? data : data.products || [];

    return {
      success: true,
      products: products as Product[],
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to parse JSON: ${error}`,
    };
  }
}

/**
 * Calculate product statistics
 */
export function getProductStats(products: Product[]): {
  total: number;
  featured: number;
  priced: number;
  unpriced: number;
  byCategory: Record<string, number>;
} {
  const stats = {
    total: products.length,
    featured: products.filter((p) => p.featured).length,
    priced: products.filter((p) => p.price).length,
    unpriced: products.filter((p) => !p.price).length,
    byCategory: {} as Record<string, number>,
  };

  products.forEach((p) => {
    stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;
  });

  return stats;
}

/**
 * Search products with advanced filters
 */
export function advancedSearch(
  products: Product[],
  filters: {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }
): Product[] {
  let results = [...products];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.code?.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    results = results.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.price && p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.price && p.price <= filters.maxPrice!);
  }

  if (filters.featured !== undefined) {
    results = results.filter((p) => p.featured === filters.featured);
  }

  return results;
}

/**
 * Generate product code suggestions
 */
export function generateProductCode(categoryId: string, index: number): string {
  const categoryPrefix = categoryId.substring(0, 3).toUpperCase();
  return `${categoryPrefix}-${String(index + 1).padStart(3, "0")}`;
}

/**
 * Batch update products
 */
export function batchUpdateProducts(
  products: Product[],
  updates: Partial<Product>,
  filter: (p: Product) => boolean
): Product[] {
  return products.map((p) => (filter(p) ? { ...p, ...updates } : p));
}

/**
 * Check for duplicate products
 */
export function findDuplicates(
  products: Product[]
): { id: string; name: string; duplicates: string[] }[] {
  const nameMap = new Map<string, string[]>();

  products.forEach((p) => {
    const key = p.name.toLowerCase();
    if (!nameMap.has(key)) {
      nameMap.set(key, []);
    }
    nameMap.get(key)?.push(p.id);
  });

  return Array.from(nameMap.entries())
    .filter(([_, ids]) => ids.length > 1)
    .map(([name, ids]) => ({
      id: ids[0],
      name,
      duplicates: ids.slice(1),
    }));
}
