# Product Catalog Dashboard

A responsive product listing module built with Next.js 16, featuring dual view modes, search, filtering, pagination, and form validation.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** components
- **React Hook Form** + **Zod** for form validation
- **Fake Store API** for product data

## Features

| Feature | Description |
|---------|-------------|
| **Dual Views** | Toggle between list (table) and card (grid) layouts |
| **Search** | Debounced (300ms) case-insensitive search by title |
| **Filtering** | Filter by category (dynamically derived from data) |
| **Pagination** | Client-side, 8 items per page |
| **Add Product** | Modal form with Zod validation |
| **Responsive** | Mobile-first design with breakpoint-based layouts |

## Project Structure

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

## Key Decisions

1. **Client-side pagination** - Suitable for small datasets (20 products)
2. **useState + useMemo** - Simple state management, no external libraries
3. **React Hook Form + Zod** - Type-safe form handling with validation
4. **shadcn/ui** - Accessible, customizable, Tailwind-native components


