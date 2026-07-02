# Product CMS Setup Guide

## 🚀 Quick Start

### Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for project to initialize
3. Go to **Project Settings** → **API**
4. Copy your:
   - `Project URL` (VITE_SUPABASE_URL)
   - `anon public` key (VITE_SUPABASE_ANON_KEY)

### Step 2: Create Environment File

Create `.env.local` in the project root:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Step 3: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire SQL from `SUPABASE_SCHEMA.sql`
4. Paste into the SQL editor
5. Click **Run**

This creates:
- `categories` table
- `products` table
- `product_images` table
- `product_features` table
- `product_specifications` table
- All necessary indexes and policies

### Step 4: Enable Storage Bucket

1. Go to **Storage** in Supabase
2. Click **Create a new bucket**
3. Name it: `products`
4. Make it **Public**
5. Click **Create bucket**

### Step 5: Set Row Level Security

In Supabase SQL Editor, run the security policies from `SUPABASE_SCHEMA.sql` (included in the schema file)

---

## 📱 Access the Admin Panel

Once set up, visit:

```
http://localhost:8080/admin/products
```

This gives you access to:
- 📊 Product Dashboard
- ➕ Add New Products
- ✏️ Edit Products
- 🗑️ Delete Products
- 📸 Image Management
- 🏷️ Category Management

---

## 📝 Adding Products

### Via Admin Panel

1. Click **Add Product** button
2. Fill in product details
3. Upload images (drag & drop or click)
4. Set category, price, stock
5. Add features and specifications
6. Click **Save Product**

The product appears immediately on your website!

### Database Direct

You can also add products directly via Supabase SQL:

```sql
INSERT INTO products (
  name, slug, code, category_id, short_description, 
  description, price, stock, status, featured
) VALUES (
  'Product Name',
  'product-name',
  'PROD-001',
  'category-id',
  'Short description',
  'Full description',
  5000,
  10,
  'in_stock',
  false
);
```

---

## 🖼️ Image Upload

- **Drag & Drop** images onto the upload area
- **Supports**: JPEG, PNG, WebP
- **Max size**: 10MB each
- **Limit**: 10 images per product
- **Auto compression**: Images are compressed before upload
- **Storage**: Supabase Storage (permanent)

Images are automatically:
- Compressed for web
- Uploaded to Supabase Storage
- Linked to product database
- Made publicly accessible

---

## 🏷️ Categories

Pre-configured categories:

1. Speed Humps
2. PVC Speed Humps
3. PVC Category
4. Reflective Garments
5. Raised Pavement Marker
6. Other Category
7. Safety Equipment

### Add More Categories

1. Go to Admin Dashboard
2. Click **Categories**
3. Click **Add Category**
4. Enter name and slug
5. Click **Save**

---

## 🔗 Product URLs

After adding a product, it's automatically available at:

```
/product/[product-id]
/product/[product-slug]
```

Example:
- `/product/jsb-001-speed-hump`
- `/product/my-new-product`

---

## 🗂️ Database Structure

### Categories
- `id` - UUID
- `name` - Product category name
- `slug` - URL-friendly slug
- `created_at` - Timestamp

### Products
- `id` - UUID
- `name` - Product name
- `slug` - URL slug
- `code` - SKU/Product code
- `category_id` - FK to categories
- `short_description` - Card description
- `description` - Full description
- `price` - Price in ₹
- `offer_price` - Discounted price
- `material` - Material info
- `dimensions` - Product dimensions
- `weight` - Product weight
- `warranty` - Warranty info
- `stock` - Stock quantity
- `status` - in_stock / out_of_stock / coming_soon
- `featured` - Featured flag
- `best_seller` - Best seller flag
- `main_image` - Primary image URL
- `created_at` - Created timestamp
- `updated_at` - Updated timestamp

### Product Images
- `id` - UUID
- `product_id` - FK to products
- `image_url` - Image URL (Supabase Storage)
- `display_order` - Order in gallery
- `created_at` - Timestamp

### Product Features
- `id` - UUID
- `product_id` - FK to products
- `feature` - Feature text

### Product Specifications
- `id` - UUID
- `product_id` - FK to products
- `title` - Spec title (Material, Height, etc)
- `value` - Spec value

---

## 🔐 Security

### Row Level Security (RLS)

- ✅ **Public Read**: Anyone can read products
- ✅ **Admin Write**: Admin can create/edit/delete
- ✅ **No Authentication**: Direct access (internal only)

To add authentication later:
1. Create auth policies in Supabase
2. Add user_id to products table
3. Update RLS policies

---

## 📊 Features

✅ **Dashboard**
- Product statistics
- Recently added products
- Quick stats cards

✅ **Product Management**
- Search & filter
- Sort by name/date/price
- Pagination
- Batch operations

✅ **Image Management**
- Drag & drop upload
- Multiple images
- Auto compression
- Image preview
- Reorder images

✅ **Product Editor**
- Dynamic features list
- Dynamic specifications
- Rich text descriptions
- Stock management
- Featured/Best seller flags

✅ **Frontend Integration**
- Automatic product pages
- Gallery with zoom
- Related products
- Search/filter
- Category listing

---

## 🚀 Deployment

### Vercel

1. Push code to GitHub
2. Connect Vercel project
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

Products automatically fetch from Supabase!

### Cloudflare Pages

1. Push code to GitHub
2. Connect Cloudflare Pages
3. Build settings: `npm run build`
4. Add environment variables
5. Deploy

---

## 📝 SQL Cheatsheet

### Get all products with category
```sql
SELECT p.*, c.name as category
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC;
```

### Get featured products
```sql
SELECT * FROM products WHERE featured = true;
```

### Get product with all details
```sql
SELECT 
  p.*,
  c.name as category,
  json_agg(DISTINCT jsonb_build_object('url', pi.image_url, 'order', pi.display_order)) as images,
  json_agg(DISTINCT jsonb_build_object('feature', pf.feature)) as features,
  json_agg(DISTINCT jsonb_build_object('title', ps.title, 'value', ps.value)) as specs
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_features pf ON p.id = pf.product_id
LEFT JOIN product_specifications ps ON p.id = ps.product_id
WHERE p.id = 'product-id'
GROUP BY p.id, c.id;
```

---

## 🐛 Troubleshooting

### Products not loading?
- Check Supabase URL and key in `.env.local`
- Verify database tables exist
- Check RLS policies are enabled
- Look at browser console for errors

### Images not uploading?
- Check storage bucket is public
- Verify file size < 10MB
- Check file type is JPEG/PNG/WebP
- Look at Supabase logs

### Admin page shows 404?
- Route should be `/admin/products`
- Check route is configured
- Verify all components are imported

### Slow product loading?
- Add database indexes (done in schema)
- Use pagination
- Check Supabase network tab
- Consider caching

---

## 📞 Support

- Supabase Docs: https://supabase.com/docs
- Database Guide: Read SUPABASE_SCHEMA.sql
- Component Docs: Check component files
- Troubleshooting: Check browser console and Supabase logs

---

## ✨ Next Steps

1. ✅ Set up Supabase
2. ✅ Create database
3. ✅ Enable storage
4. ✅ Access `/admin/products`
5. ✅ Add first product
6. ✅ View product page
7. ✅ Customize product form (optional)
8. ✅ Deploy to production

**Your CMS is ready! 🎉**
