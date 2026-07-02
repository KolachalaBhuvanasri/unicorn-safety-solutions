# Product System Documentation

## Overview

The product system is a comprehensive, dynamic solution for managing and displaying products with filtering, sorting, searching, and detailed product pages. It's built with React, TypeScript, and Framer Motion for smooth animations.

## Architecture

### File Structure

```
src/
├── data/
│   └── products.json          # Product catalog data
├── lib/
│   ├── products.ts            # Product utilities and helpers
│   └── product-admin.ts       # Admin utilities for product management
├── components/
│   ├── ProductCard.tsx        # Individual product card component
│   └── ProductGallery.tsx     # Gallery with filters and sorting
└── routes/
    ├── products.tsx           # Products listing page
    └── product.$id.tsx        # Individual product detail page
```

## Data Structure

### Product Object

Each product in `products.json` contains:

```json
{
  "id": "unique-identifier",
  "code": "JSB-001",
  "name": "Product Name",
  "category": "speed-humps",
  "price": 5000,
  "featured": true,
  "image": "/products/product-name.jpg",
  "description": "Full product description",
  "shortDescription": "Short description for cards",
  "specifications": [
    { "key": "Material", "value": "Rubber" },
    { "key": "Height", "value": "50mm" }
  ],
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "applications": [
    "Application 1",
    "Application 2"
  ]
}
```

### Fields

- **id**: Unique identifier (used in URL)
- **code**: Product SKU/model number
- **name**: Display name
- **category**: Category ID (from categories array)
- **price**: Price in ₹ (null = "Price on Request")
- **featured**: Boolean flag for featured products
- **image**: Path to product image
- **description**: Long description
- **shortDescription**: Short description for cards
- **specifications**: Array of key-value pairs
- **features**: Array of feature strings
- **applications**: Array of use case strings

## Features

### 1. Product Gallery (`ProductGallery.tsx`)

The main product browsing interface with:

- **Grid & List Views**: Toggle between grid (3 columns) and list views
- **Filtering**:
  - Category filter with count display
  - Featured products filter
  - Search box with real-time filtering
  - Price range filtering (ready to extend)
  
- **Sorting**:
  - Latest (default)
  - Name A-Z
  - Name Z-A
  - Featured First

- **Pagination**: 12 products per page (configurable)
- **Responsive Design**: 1 column mobile, 2 columns tablet, 3-4 columns desktop

### 2. Product Card (`ProductCard.tsx`)

Individual product card with:

- Product image with lazy loading
- Featured badge
- Category tag
- Product name and code
- Short description
- Price display (or "Price on Request")
- Favorite button (heart icon)
- Quick action buttons:
  - View Details (opens product page)
  - WhatsApp Inquiry (direct message)
  - Request Quote (contact form)
- Hover animations and overlay effects

### 3. Product Detail Page (`product.$id.tsx`)

Comprehensive product page with:

- Breadcrumb navigation
- Large product image
- Full product details
- Price and stock information
- Action buttons (WhatsApp, Request Quote, Save, Share)
- Three info tabs:
  - Features (bulleted list)
  - Specifications (table format)
  - Applications (grid format)
- Related products section
- CTA section for ordering

### 4. Products Listing (`products.tsx`)

Main products page featuring:

- Hero section with description
- Integrated ProductGallery
- Call-to-action sections
- WhatsApp integration

## Utility Functions (`lib/products.ts`)

### Core Functions

```typescript
// Get single product by ID
getProductById(id: string): Product | undefined

// Get products by category
getProductsByCategory(categoryId: string): Product[]

// Get category by ID or slug
getCategoryById(id: string): Category | undefined
getCategoryBySlug(slug: string): Category | undefined

// Search products
searchProducts(query: string): Product[]

// Filter products with multiple criteria
filterProducts(
  categoryId?: string,
  featured?: boolean,
  searchQuery?: string
): Product[]

// Sort products
sortProducts(
  items: Product[],
  sortBy: "name-asc" | "name-desc" | "featured" | "latest"
): Product[]

// Get related products
getRelatedProducts(productId: string, limit: number): Product[]

// Get featured or latest products
getFeaturedProducts(limit: number): Product[]
getLatestProducts(limit: number): Product[]

// Get multiple products by IDs
getProductsByIds(ids: string[]): Product[]
```

## Admin Utilities (`lib/product-admin.ts`)

Helper functions for managing products:

```typescript
// Discover images from public folder
discoverProductImages(): Promise<string[]>

// Generate product from image
generateProductFromImage(imagePath: string): Partial<Product>

// Validate product data
validateProduct(product: Product): { isValid: boolean; errors: string[] }

// Export/Import products
exportProductsToCSV(products: Product[]): string
exportProductsToJSON(products: Product[]): string
importProductsFromJSON(jsonString: string): { success: boolean; products?: Product[] }

// Get product statistics
getProductStats(products: Product[]): ProductStats

// Advanced search
advancedSearch(products: Product[], filters: SearchFilters): Product[]

// Generate product codes
generateProductCode(categoryId: string, index: number): string

// Batch operations
batchUpdateProducts(products: Product[], updates: Partial<Product>, filter: Function): Product[]

// Find duplicates
findDuplicates(products: Product[]): DuplicateInfo[]
```

## Adding New Products

### Method 1: Direct JSON Edit

1. Open `src/data/products.json`
2. Add new product object to the `products` array
3. Ensure all required fields are filled
4. Use existing product as template

Example:
```json
{
  "id": "new-product",
  "code": "NP-001",
  "name": "New Product",
  "category": "speed-humps",
  "price": 5000,
  "featured": false,
  "image": "/products/new-product.jpg",
  "description": "Description here",
  "shortDescription": "Short description",
  "specifications": [...],
  "features": [...],
  "applications": [...]
}
```

### Method 2: Adding Categories

1. Open `src/data/products.json`
2. Add to the `categories` array:
```json
{
  "id": "new-category",
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description"
}
```

## Image Management

### Adding Product Images

1. Place images in `public/products/` folder
2. Use filename as product ID (auto-mapping)
3. Supported formats: JPG, PNG, WebP
4. Recommended size: 500x500px or larger
5. Ensure image is optimized for web

### Image Naming Convention

```
/public/products/
├── jsb-001.jpg
├── jsb-002.jpg
├── eco-jsb-005.jpg
├── safety-cones.jpg
└── ...
```

## Customization

### Change Grid Columns

In `ProductGallery.tsx`:
```tsx
<motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Change lg:grid-cols-3 to desired number */}
</motion.div>
```

### Change Items Per Page

```tsx
<ProductGallery itemsPerPage={24} /> {/* Change from 12 */}
```

### Modify Sorting Options

In `ProductGallery.tsx`, update the select dropdown options:
```tsx
<select>
  <option value="custom">Custom Sort</option>
  {/* Add more options */}
</select>
```

### Customize Colors

Uses Tailwind CSS classes:
- `text-accent`: Yellow accent color
- `bg-ink`: Black background
- `bg-secondary`: Light gray background
- Modify in your theme configuration

## Performance Optimizations

### Implemented

- ✅ Lazy loading for product images
- ✅ Skeleton loaders while loading
- ✅ Pagination to limit DOM elements
- ✅ Memoized filtering and sorting
- ✅ Animated transitions

### To Implement

- [ ] Image optimization service
- [ ] Caching for product data
- [ ] Server-side pagination API
- [ ] Image CDN integration
- [ ] Product search indexing

## SEO

### Product Pages

- Dynamic title based on product name
- Meta descriptions for categories
- Open Graph tags for social sharing
- Breadcrumb schema markup
- Structured data for products

### URLs

- `/products` - Products listing
- `/product/:id` - Product detail page
- Slug-based URLs for better SEO

## Filtering & Search

### Search Capabilities

The search function finds products by:
- Product name
- Short description
- Product code (SKU)
- Category

### Filter Combinations

Filters work together:
- Category + Search
- Featured + Category
- Category + Sort
- All combinations

## WhatsApp Integration

### Quick Messaging

Product cards and pages include WhatsApp buttons that:
1. Pre-fill message with product info
2. Link to WhatsApp with default message
3. Open WhatsApp Web or app

### Message Template

```
Hi, I'm interested in {PRODUCT_NAME} ({PRODUCT_CODE})
```

## Categories

Current categories in the system:

1. **Speed Humps** - Speed humps and parking products
2. **PVC Speed Humps** - Advanced PVC options
3. **PVC Category** - General PVC products
4. **Reflective Garments & Accessories** - PPE and wearables
5. **Raised Pavement Marker / Road Studs** - Road markings
6. **Other Category** - Miscellaneous products
7. **Safety Equipment** - Professional equipment

## Troubleshooting

### Product Not Showing

1. Check product ID in URL
2. Verify image path exists
3. Ensure category ID is valid
4. Validate JSON syntax in products.json

### Images Not Loading

1. Verify file exists in `/public/products/`
2. Check image file permissions
3. Use correct file extension
4. Ensure image path in product.json is correct

### Filters Not Working

1. Clear browser cache
2. Check category IDs match
3. Verify JSON data structure
4. Check browser console for errors

## Future Enhancements

- [ ] Admin dashboard for product management
- [ ] Bulk product import from CSV/Excel
- [ ] Image upload and auto-optimization
- [ ] Advanced price range filtering
- [ ] Product variants and SKU management
- [ ] Inventory tracking
- [ ] Customer reviews and ratings
- [ ] Product comparison tool
- [ ] Wishlist functionality
- [ ] Export cart to quote PDF

## Support

For issues or questions about the product system, refer to:
- Component files in `src/components/`
- Utility functions in `src/lib/products.ts`
- Data structure in `src/data/products.json`
