'use client';

import type { Product, ViewMode } from '@/types/product';
import { ProductCard } from '@/components/products/ProductCard';
import { getCategoryColor } from '@/lib/categoryColors';
import { PackageX } from 'lucide-react';

interface ProductListProps {
    products: Product[];
    viewMode: ViewMode;
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="rounded-full bg-muted p-4 mb-4">
                <PackageX className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-sm">
                Try adjusting your filters or search term.
            </p>
        </div>
    );
}

export function ProductList({ products, viewMode }: ProductListProps) {
    if (products.length === 0) {
        return <EmptyState />;
    }

    if (viewMode === 'card') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    }

    // Mobile: Use cards for list view too
    return (
        <>
            {/* Desktop Table - hidden on mobile */}
            <div className="hidden md:block bg-white rounded-lg border overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    <div className="col-span-1">
                        <input type="checkbox" className="rounded" />
                    </div>
                    <div className="col-span-3">Name</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-3">Description</div>
                    <div className="col-span-1">Price</div>
                    <div className="col-span-2">Status</div>
                </div>
                <div className="divide-y">
                    {products.map((product) => {
                        const statusColor = getCategoryColor(product.category);
                        return (
                            <div key={product.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-gray-50 text-sm">
                                <div className="col-span-1">
                                    <input type="checkbox" className="rounded" />
                                </div>
                                <div className="col-span-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold shrink-0">
                                        {product.title.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="truncate font-medium">{product.title.split(' ').slice(0, 3).join(' ')}</span>
                                </div>
                                <div className="col-span-2 truncate">{product.category}</div>
                                <div className="col-span-3 truncate text-muted-foreground">{product.description.slice(0, 50)}...</div>
                                <div className="col-span-1 font-medium">${product.price.toFixed(2)}</div>
                                <div className="col-span-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                                        {product.category.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile List - shown only on mobile */}
            <div className="md:hidden space-y-3">
                {products.map((product) => {
                    const statusColor = getCategoryColor(product.category);
                    return (
                        <div key={product.id} className="bg-white rounded-lg border p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold">
                                        {product.title.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-sm">{product.title.split(' ').slice(0, 3).join(' ')}</span>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                                    {product.category.split(' ')[0]}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{product.category}</span>
                                <span className="font-medium">${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
