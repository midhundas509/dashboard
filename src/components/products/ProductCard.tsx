import Image from 'next/image';
import type { Product } from '@/types/product';
import { getCategoryColor } from '@/lib/categoryColors';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const statusColor = getCategoryColor(product.category);

    return (
        <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header with name and status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">
                        {product.title.charAt(0).toUpperCase()}
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
            <div className="flex items-center mt-4 pt-3 border-t">
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
            </div>
        </div>
    );
}
