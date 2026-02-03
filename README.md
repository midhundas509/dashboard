# Product Listing Dashboard

A clean, usable product listing module built with Next.js (App Router), featuring list/card views, search, filtering, and pagination.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **shadcn/ui** components
- **React Hook Form** + **Zod** for form validation
- **Fake Store API** as data source

## Features

- **Product Display**: View products in either list (table) or card (grid) format
- **Search**: Case-insensitive search by product title with debounced input
- **Filtering**: Filter products by category (derived from API data)
- **Pagination**: Client-side pagination (8 items per page)
- **Add Product**: Modal form with validation to add new products to local state
- **Empty States**: User-friendly messaging when no products match filters
- **Loading States**: Visual feedback during data fetching

## Key Decisions

1. **Client-side Pagination**: All filtering, searching, and pagination happens in the browser after initial data fetch. This keeps the implementation simple and reduces API calls.

2. **Local State for Products**: New products are added to local state only (no backend persistence). They appear immediately in the list and persist until page refresh.

3. **Debounced Search**: Search input is debounced (300ms) using a simple `useEffect` pattern to reduce unnecessary re-renders.

4. **Derived State**: Categories are extracted from product data. Filtered and paginated products are computed using `useMemo` to avoid redundant calculations.

5. **Minimal Dependencies**: Only essential packages are used (shadcn/ui for components, Hook Form + Zod for validation).

## Component Structure

```
src/
├── app/
│   ├── products/
│   │   ├── page.tsx              # Main products page with state management
│   │   └── components/
│   │       ├── ProductList.tsx   # Handles list/card view rendering
│   │       ├── ProductCard.tsx   # Individual product card
│   │       ├── SearchInput.tsx   # Search input with icon
│   │       ├── CategoryFilter.tsx# Category dropdown filter
│   │       ├── Pagination.tsx    # Page navigation controls
│   │       ├── ViewToggle.tsx    # List/Card view toggle
│   │       └── AddProductDialog.tsx # Modal form for adding products
│   └── page.tsx                  # Redirects to /products
├── components/
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── utils.ts                  # Utility functions
└── types/
    └── product.ts                # TypeScript type definitions
```

## Assumptions

- Fake Store API is available and returns consistent data structure
- Internal dashboard usage (no authentication required)
- Products added locally are temporary (no persistence needed)

## Improvements with More Time

- Server-side pagination for larger datasets
- Data caching with React Query or SWR
- Error boundaries for graceful error handling
- Unit and integration tests
- Keyboard navigation for accessibility
- Skeleton loading states
- Product detail view
- Edit/Delete product functionality
