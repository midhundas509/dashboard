'use client';

import { LayoutGrid } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface CategoryFilterProps {
    categories: string[];
    value: string;
    onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-2">
            <button className="h-9 w-9 flex items-center justify-center border rounded-md hover:bg-gray-50 bg-white">
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </button>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full sm:w-40 h-9 bg-white border-gray-200">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
