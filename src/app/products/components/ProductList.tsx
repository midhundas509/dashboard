'use client';

import Image from 'next/image';
import type { Product, ViewMode } from '@/types/product';
import { ProductCard } from './ProductCard';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PackageX } from 'lucide-react';

interface ProductListProps {
    products: Product[];
    viewMode: ViewMode;
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
                <PackageX className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-sm">
                We couldn&apos;t find any products matching your search criteria. Try adjusting your filters or search term.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    }

    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="w-16">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-32">Category</TableHead>
                        <TableHead className="w-24 text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-muted/30">
                            <TableCell>
                                <div className="relative h-12 w-12 rounded-md overflow-hidden bg-white border">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-1"
                                        sizes="48px"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-medium line-clamp-2">{product.title}</span>
                            </TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    {product.category}
                                </span>
                            </TableCell>
                            <TableCell className="text-right font-bold">
                                ${product.price.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
