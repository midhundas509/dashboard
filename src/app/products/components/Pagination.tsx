'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
    itemsPerPageOptions: number[];
}

export function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, itemsPerPageOptions }: PaginationProps) {
    if (totalPages <= 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
            <span className="hidden sm:inline text-muted-foreground">Items per page:</span>
            <select
                className="h-8 px-2 border rounded-md bg-white text-sm"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
                {itemsPerPageOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>

            <span className="text-muted-foreground">
                {currentPage} of {totalPages}
            </span>

            <div className="flex items-center border rounded-md overflow-hidden">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="w-px h-4 bg-gray-200" />
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
