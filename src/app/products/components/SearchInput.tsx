'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-9 w-full sm:w-64 h-9 bg-white border-gray-200"
                />
            </div>
            <button className="h-9 w-9 flex items-center justify-center border rounded-md hover:bg-gray-50">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
        </div>
    );
}
