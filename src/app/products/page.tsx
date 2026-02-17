'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Product, ViewMode } from '@/types/product';
import { SearchInput } from '@/components/SearchInput';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ViewToggle } from '@/components/ViewToggle';
import { Pagination } from '@/components/Pagination';
import { ProductList } from '@/components/products/ProductList';
import { AddProductDialog } from '@/components/products/AddProductDialog';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 12, 20];

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, selectedCategory, itemsPerPage]);

    // Derive categories from products
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        return uniqueCategories.sort();
    }, [products]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());
            const matchesCategory =
                selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, debouncedSearch, selectedCategory]);

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleAddProduct = (product: Product) => {
        setProducts((prev) => [product, ...prev]);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Loading products...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="bg-gray-50 min-h-[calc(100vh-3.5rem)]">
                {/* Header */}
                <header className="bg-white border-b">
                    <div className="px-4 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div>
                                <div className="text-xs text-muted-foreground mb-1">
                                    Dashboard &gt; Products
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                                        📦
                                    </div>
                                    <h1 className="text-xl font-bold">Product Catalog</h1>
                                </div>
                            </div>
                            <AddProductDialog categories={categories} onAddProduct={handleAddProduct} />
                        </div>
                    </div>
                </header>

                {/* View Toggle Tabs */}
                <div className="bg-white border-b">
                    <div className="px-4 sm:px-6">
                        <ViewToggle view={viewMode} onChange={setViewMode} />
                    </div>
                </div>

                {/* Main Content */}
                <main className="px-4 sm:px-6 py-4 sm:py-6">
                    {/* Toolbar */}
                    <div className="bg-white rounded-lg border p-4 mb-4">
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                                <CategoryFilter
                                    categories={categories}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                />
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                itemsPerPage={itemsPerPage}
                                onItemsPerPageChange={setItemsPerPage}
                                itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
                            />
                        </div>
                    </div>

                    {/* Product List */}
                    <ProductList products={paginatedProducts} viewMode={viewMode} />
                </main>
            </div>
        </DashboardLayout>
    );
}
