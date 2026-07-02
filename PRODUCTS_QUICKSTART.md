# Quick Start Guide - Product System

## 🚀 Getting Started

Your dynamic product catalog system is now ready! Here's how to use it:

## What's New?

### Components Created
- ✅ **ProductCard.tsx** - Individual product card with image, details, and actions
- ✅ **ProductGallery.tsx** - Full gallery with filtering, sorting, and pagination
- ✅ **product.$id.tsx** - Detailed product page with specifications and related items

### Data Files
- ✅ **products.json** - Complete product catalog with 35+ products
- ✅ **lib/products.ts** - Utility functions for product operations
- ✅ **lib/product-admin.ts** - Admin tools for product management

### Pages
- ✅ **/products** - Browse all products with filters
- ✅ **/product/:id** - Detailed view of individual products

---

## 📋 Product Data Structure

Each product contains:

```json
{
  "id": "jsb-001",                    // Unique ID (used in URL)
  "code": "JSB-001",                  // SKU/Product code
  "name": "JSB-001 Speed Hump",       // Product name
  "category": "speed-humps",           // Category ID
  "price": 5000,                      // Price in ₹ (null = "Price on Request")
  "featured": true,                   // Show as featured
  "image": "/products/jsb-001.jpg",   // Image path
  "description": "Premium rubber...", // Long description
  "shortDescription": "Durable...",   // Card description
  "specifications": [                 // Product specs (table)
    { "key": "Material", "value": "Rubber" }
  ],
  "features": [                       // Features (bullet list)
    "Weather resistant"
  ],
  "applications": [                   // Use cases (grid)
    "Parking lots"
  ]
}
```

---

## 🛠️ Adding New Products

### Step 1: Prepare Your Image
- Place image in `/public/products/`
- Filename: Use product ID (e.g., `jsb-001.jpg`)
- Format: JPG, PNG, or WebP
- Size: 500×500px recommended

### Step 2: Add to products.json

Open `src/data/products.json` and add to the `products` array:

```json
{
  "id": "new-product-id",
  "code": "NP-001",
  "name": "New Product Name",
  "category": "speed-humps",
  "price": 5000,
  "featured": false,
  "image": "/products/new-product-id.jpg",
  "description": "Full description of your product",
  "shortDescription": "Brief one-line description",
  "specifications": [
    { "key": "Material", "value": "Rubber" },
    { "key": "Height", "value": "50mm" },
    { "key": "Weight", "value": "8 kg" }
  ],
  "features": [
    "Weather resistant",
    "UV stable",
    "Reflective strips included"
  ],
  "applications": [
    "Residential areas",
    "Parking lots",
    "School zones"
  ]
}
```

### Step 3: Save & Deploy

Changes are live immediately! No rebuild needed.

---

## 🎨 Features

### Product Gallery (`/products`)
- ✅ Grid (3 columns) or List view toggle
- ✅ Search by product name, code, or description
- ✅ Filter by category
- ✅ Filter featured products only
- ✅ Sort: Latest, A-Z, Z-A, Featured
- ✅ Pagination (12 items per page)
- ✅ Responsive design (1-4 columns)

### Product Details (`/product/:id`)
- ✅ Large product image
- ✅ Full product information
- ✅ Features tab (bullet list)
- ✅ Specifications tab (table)
- ✅ Applications tab (grid)
- ✅ Related products (4 suggestions)
- ✅ Breadcrumb navigation
- ✅ WhatsApp, Quote, Share buttons

### Integrations
- ✅ WhatsApp Inquiry buttons (pre-filled messages)
- ✅ Request Quote forms link to contact page
- ✅ Share functionality (native or manual)
- ✅ Favorite/Save products (client-side)

---

## 📊 Product Categories

The system includes 7 categories:

1. **Speed Humps** - Speed humps & parking products
2. **PVC Speed Humps** - Advanced PVC options
3. **PVC Category** - General PVC products
4. **Reflective Garments & Accessories** - PPE & wearables
5. **Raised Pavement Marker / Road Studs** - Road markings
6. **Other Category** - Miscellaneous items
7. **Safety Equipment** - Professional equipment

---

## 🔧 Customization

### Change Grid Columns
Edit `src/components/ProductGallery.tsx`:
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {/* Change lg:grid-cols-4 to your preference */}
</div>
```

### Change Items Per Page
In `src/routes/products.tsx`:
```tsx
<ProductGallery itemsPerPage={24} /> {/* Change from 12 */}
```

### Modify Colors
Update Tailwind classes:
- `text-accent` = Yellow
- `bg-ink` = Black
- `bg-secondary` = Light gray

### Add New Categories

Edit `src/data/products.json`, add to `categories` array:
```json
{
  "id": "new-cat",
  "name": "New Category",
  "slug": "new-cat",
  "description": "Description here"
}
```

---

## 💡 Tips & Best Practices

### Product Images
- Use consistent dimensions (square recommended)
- Compress images for faster loading
- Use descriptive filenames
- Keep images in `/public/products/`

### Product Descriptions
- Short description: 1-2 sentences (for cards)
- Full description: 2-3 sentences (for detail page)
- Include key benefits and materials
- Use simple, clear language

### Pricing
- Show actual price if available
- Use `null` for "Price on Request"
- Always in ₹ (Indian Rupees)
- Include GST note

### SEO
- Use descriptive product names
- Include relevant keywords
- Write clear descriptions
- Use proper categories

---

## 🐛 Troubleshooting

### Product Not Showing?
1. Check product ID in `products.json`
2. Verify image exists in `/public/products/`
3. Ensure category ID matches a valid category
4. Check JSON syntax (must be valid)

### Image Not Loading?
1. Verify file path: `/products/filename.jpg`
2. Check file exists and is readable
3. Verify file extension (.jpg, .png, .webp)
4. Try clearing browser cache

### Filters Not Working?
1. Check category IDs match exactly
2. Verify JSON structure is valid
3. Clear browser cache
4. Check browser console for errors

---

## 🚀 URLs & Routes

```
/products                  → Product gallery & listing
/product/:id              → Individual product detail page

Examples:
/product/jsb-001          → JSB-001 Speed Hump details
/product/safety-helmet    → Safety Helmet details
/product/led-batons       → LED Batons details
```

---

## 📱 Responsive Design

- **Mobile** (< 768px): 1 column grid
- **Tablet** (768-1024px): 2 column grid
- **Desktop** (> 1024px): 3-4 column grid
- **Filters**: Collapse on mobile, sidebar on desktop

---

## ⚡ Performance

Optimizations included:
- Lazy loading for images
- Skeleton loaders while loading
- Pagination to limit DOM
- Memoized filtering/sorting
- Smooth Framer Motion animations

---

## 📞 WhatsApp Integration

Click WhatsApp button to send:
```
Hi, I'm interested in [PRODUCT_NAME] ([CODE]). Can you provide more details?
```

Customize message in `ProductCard.tsx`:
```tsx
const message = `Custom message here`;
```

---

## 📚 Documentation

Full documentation available in `PRODUCT_SYSTEM.md`:
- Architecture overview
- Component APIs
- Utility functions
- Admin tools
- Troubleshooting

---

## ✨ What's Included

- **35+ Pre-loaded Products** - All categories covered
- **7 Product Categories** - Organized by type
- **Premium UI Design** - Industrial aesthetic
- **Full Responsiveness** - Works on all devices
- **Search & Filter** - Find products easily
- **Advanced Features** - Lazy loading, pagination, sorting
- **SEO Optimized** - Meta tags, breadcrumbs, structured data
- **Admin Tools** - Utilities for product management

---

## 🎯 Next Steps

1. **Upload Images** → Place product images in `/public/products/`
2. **Update Products** → Edit `src/data/products.json` with your data
3. **Test Gallery** → Visit `/products` page
4. **Add Prices** → Update product prices in JSON
5. **Customize** → Modify colors, categories, or UI to match brand

---

## 🤝 Support

For detailed information:
- See `PRODUCT_SYSTEM.md` for full documentation
- Check `src/lib/products.ts` for utility functions
- Review `src/components/ProductCard.tsx` for component API
- Check `src/data/products.json` for data structure

---

**Your product catalog is ready to go! 🎉**
