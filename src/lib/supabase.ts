import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// Database Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  feature: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  title: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  code: string;
  category_id: string;
  short_description: string;
  description: string;
  price: number | null;
  offer_price: number | null;
  material: string | null;
  dimensions: string | null;
  weight: string | null;
  warranty: string | null;
  stock: number;
  status: "in_stock" | "out_of_stock" | "coming_soon";
  featured: boolean;
  best_seller: boolean;
  main_image: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  images?: ProductImage[];
  features?: ProductFeature[];
  specifications?: ProductSpecification[];
}
