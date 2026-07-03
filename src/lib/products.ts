import productsData from "@/data/products.json";
import speedHumpsImg from "@/assets/speed-humps.png.asset.json";
import conesBarriersImg from "@/assets/cones-barriers.png.asset.json";
import reflectiveTapesImg from "@/assets/reflective-tapes.png.asset.json";
import ppeGearImg from "@/assets/ppe-gear.png.asset.json";
import safetyEquipmentImg from "@/assets/safety-equipment.png.asset.json";
import trafficSafetyImg from "@/assets/traffic-safety.png.asset.json";

// Eagerly import every individual product image pointer
const productImageModules = import.meta.glob<{ url: string }>(
  "@/assets/products/*.jpg.asset.json",
  { eager: true, import: "default" }
);
const PRODUCT_IMAGE: Record<string, string> = {};
for (const [path, mod] of Object.entries(productImageModules)) {
  const match = path.match(/([^/]+)\.jpg\.asset\.json$/);
  if (match) PRODUCT_IMAGE[match[1]] = mod.url;
}

const CATEGORY_IMAGE: Record<string, string> = {
  "speed-humps": speedHumpsImg.url,
  "pvc-speed-humps": speedHumpsImg.url,
  "pvc-category": conesBarriersImg.url,
  "reflective-garments": ppeGearImg.url,
  "road-studs": reflectiveTapesImg.url,
  "safety-equipment": safetyEquipmentImg.url,
  "other": trafficSafetyImg.url,
};



export interface Product {
  id: string;
  code?: string;
  name: string;
  category: string;
  price: number | null;
  featured: boolean;
  image: string;
  description: string;
  shortDescription: string;
  specifications: Array<{ key: string; value: string }>;
  features: string[];
  applications: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const products: Product[] = (productsData.products as Product[]).map((p) => ({
  ...p,
  image: PRODUCT_IMAGE[p.id] ?? (p.image && !p.image.startsWith("/products/") ? p.image : (CATEGORY_IMAGE[p.category] ?? trafficSafetyImg.url)),
}));

export const categories: Category[] = productsData.categories as Category[];


export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.code?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function filterProducts(
  categoryId?: string,
  featured?: boolean,
  searchQuery?: string
): Product[] {
  let filtered = [...products];

  if (categoryId) {
    filtered = filtered.filter((p) => p.category === categoryId);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((p) => p.featured === featured);
  }

  if (searchQuery) {
    filtered = searchProducts(searchQuery);
  }

  return filtered;
}

export function sortProducts(
  items: Product[],
  sortBy: "name-asc" | "name-desc" | "featured" | "latest" = "latest"
): Product[] {
  const sorted = [...items];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
      return sorted.sort((a, b) => (b.featured ? 1 : -1) - (a.featured ? 1 : -1));
    case "latest":
      return sorted.reverse();
    default:
      return sorted;
  }
}

export function getRelatedProducts(
  productId: string,
  limit: number = 4
): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  const related = products
    .filter(
      (p) => p.category === product.category && p.id !== productId
    )
    .slice(0, limit);

  return related.length >= limit
    ? related
    : [...related, ...products.filter((p) => p.id !== productId).slice(0, limit - related.length)];
}

export function getFeaturedProducts(limit: number = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getLatestProducts(limit: number = 6): Product[] {
  return products.slice(-limit).reverse();
}

export function getProductsByIds(ids: string[]): Product[] {
  return products.filter((p) => ids.includes(p.id));
}
