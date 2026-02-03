'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
}

// Generate a status badge color based on category
function getStatusColor(category: string) {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
        "men's clothing": { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300' },
        "women's clothing": { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-300' },
        "jewelery": { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
        "electronics": { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
    };
    return colors[category] || { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' };
}

export function ProductCard({ product }: ProductCardProps) {
    const statusColor = getStatusColor(product.category);

    return (
        <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header with name and status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">
                        G
                    </div>
                    <span className="font-medium text-sm">{product.title.split(' ').slice(0, 2).join(' ')}</span>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm">
                <div className="flex">
                    <span className="text-muted-foreground w-24">Price</span>
                    <span className="text-primary font-medium">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex">
                    <span className="text-muted-foreground w-24">Category</span>
                    <span className="truncate">{product.category}</span>
                </div>
                <div className="flex">
                    <span className="text-muted-foreground w-24">Description</span>
                    <span className="truncate text-muted-foreground">{product.description.slice(0, 30)}...</span>
                </div>
            </div>

            {/* Footer with image */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="24px"
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">Product</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
