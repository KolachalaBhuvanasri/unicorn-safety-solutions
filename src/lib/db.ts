import { supabase as typedClient, type Product, type Category, type ProductImage, type ProductFeature, type ProductSpecification } from "./supabase";
const supabase = typedClient as any;


/**
 * Category Operations
 */

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}

export async function createCategory(name: string, slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name, slug }])
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    return null;
  }

  return data;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    return false;
  }

  return true;
}

/**
 * Product Operations
 */

export async function getProducts(options?: {
  categoryId?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  status?: string;
}): Promise<{ products: Product[]; total: number }> {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      images:product_images(*),
      features:product_features(*),
      specifications:product_specifications(*)
    `,
      { count: "exact" }
    );

  if (options?.categoryId) {
    query = query.eq("category_id", options.categoryId);
  }

  if (options?.featured) {
    query = query.eq("featured", true);
  }

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.search) {
    const search = options.search.toLowerCase();
    query = query.or(
      `name.ilike.%${search}%,code.ilike.%${search}%,short_description.ilike.%${search}%`
    );
  }

  query = query.order("created_at", { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, (options.offset || 0) + (options.limit || 10) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }

  return { products: data || [], total: count || 0 };
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      images:product_images(*, order_by: display_order),
      features:product_features(*),
      specifications:product_specifications(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      images:product_images(*, order_by: display_order),
      features:product_features(*),
      specifications:product_specifications(*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export async function createProduct(product: Partial<Product> & {
  name: string;
  category_id: string;
  features?: string[];
  specifications?: Array<{ title: string; value: string }>;
  images?: string[];
}): Promise<Product | null> {
  const slug = product.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: product.name,
        slug,
        code: product.code || null,
        category_id: product.category_id,
        short_description: product.short_description || null,
        description: product.description || null,
        price: product.price || null,
        offer_price: product.offer_price || null,
        material: product.material || null,
        dimensions: product.dimensions || null,
        weight: product.weight || null,
        warranty: product.warranty || null,
        stock: product.stock || 0,
        status: product.status || "in_stock",
        featured: product.featured || false,
        best_seller: product.best_seller || false,
        main_image: product.main_image || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    return null;
  }

  const productId = data.id;

  // Add features
  if (product.features && product.features.length > 0) {
    const features = product.features.map((f) => ({
      product_id: productId,
      feature: f,
    }));
    const { error: featuresError } = await supabase.from("product_features").insert(features);
    if (featuresError) console.error("Error adding features:", featuresError);
  }

  // Add specifications
  if (product.specifications && product.specifications.length > 0) {
    const specs = product.specifications.map((s) => ({
      product_id: productId,
      title: s.title,
      value: s.value,
    }));
    const { error: specsError } = await supabase.from("product_specifications").insert(specs);
    if (specsError) console.error("Error adding specifications:", specsError);
  }

  // Add images
  if (product.images && product.images.length > 0) {
    const images = product.images.map((url, index) => ({
      product_id: productId,
      image_url: url,
      display_order: index,
    }));
    const { error: imagesError } = await supabase.from("product_images").insert(images);
    if (imagesError) console.error("Error adding images:", imagesError);

    // Set main image
    if (product.images.length > 0) {
      await supabase
        .from("products")
        .update({ main_image: product.images[0] })
        .eq("id", productId);
    }
  }

  return getProductById(productId);
}

export async function updateProduct(
  id: string,
  updates: Partial<Product> & {
    features?: string[];
    specifications?: Array<{ title: string; value: string }>;
    images?: string[];
  }
): Promise<Product | null> {
  const { error } = await supabase.from("products").update(updates).eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    return null;
  }

  // Update features
  if (updates.features) {
    await supabase.from("product_features").delete().eq("product_id", id);
    const features = updates.features.map((f) => ({
      product_id: id,
      feature: f,
    }));
    if (features.length > 0) {
      const { error: featuresError } = await supabase.from("product_features").insert(features);
      if (featuresError) console.error("Error updating features:", featuresError);
    }
  }

  // Update specifications
  if (updates.specifications) {
    await supabase.from("product_specifications").delete().eq("product_id", id);
    const specs = updates.specifications.map((s) => ({
      product_id: id,
      title: s.title,
      value: s.value,
    }));
    if (specs.length > 0) {
      const { error: specsError } = await supabase.from("product_specifications").insert(specs);
      if (specsError) console.error("Error updating specifications:", specsError);
    }
  }

  // Update images
  if (updates.images) {
    await supabase.from("product_images").delete().eq("product_id", id);
    const images = updates.images.map((url, index) => ({
      product_id: id,
      image_url: url,
      display_order: index,
    }));
    if (images.length > 0) {
      const { error: imagesError } = await supabase.from("product_images").insert(images);
      if (imagesError) console.error("Error updating images:", imagesError);
    }

    // Update main image
    if (updates.images.length > 0) {
      await supabase.from("products").update({ main_image: updates.images[0] }).eq("id", id);
    }
  }

  return getProductById(id);
}

export async function deleteProduct(id: string): Promise<boolean> {
  // Get product to find images for deletion
  const product = await getProductById(id);

  // Delete from storage
  if (product?.images) {
    for (const image of product.images) {
      const path = image.image_url.split("/").pop();
      if (path) {
        await supabase.storage.from("products").remove([path]);
      }
    }
  }

  // Delete product (cascade will handle related records)
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }

  return true;
}

export async function duplicateProduct(id: string): Promise<Product | null> {
  const product = await getProductById(id);
  if (!product) return null;

  const newProduct = { ...product };
  delete (newProduct as any).id;
  delete (newProduct as any).created_at;
  delete (newProduct as any).updated_at;

  const slug = `${product.slug}-copy-${Date.now()}`;
  newProduct.slug = slug;
  newProduct.name = `${product.name} (Copy)`;

  return createProduct(newProduct as any);
}

/**
 * Statistics
 */

export async function getProductStats(): Promise<{
  total: number;
  featured: number;
  bestSellers: number;
  inStock: number;
  outOfStock: number;
}> {
  const { count: total } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: featured } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("featured", true);

  const { count: bestSellers } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("best_seller", true);

  const { count: inStock } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_stock");

  const { count: outOfStock } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("status", "out_of_stock");

  return {
    total: total || 0,
    featured: featured || 0,
    bestSellers: bestSellers || 0,
    inStock: inStock || 0,
    outOfStock: outOfStock || 0,
  };
}

export async function getRecentlyAddedProducts(limit: number = 5): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*),
      images:product_images(*, order_by: display_order)
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent products:", error);
    return [];
  }

  return data || [];
}
