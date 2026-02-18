export type CategoryColor = { bg: string; text: string; border: string };

const CATEGORY_COLORS: Record<string, CategoryColor> = {
    "men's clothing": { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300' },
    "women's clothing": { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-300' },
    "jewelery": { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
    "electronics": { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
};

const DEFAULT_COLOR: CategoryColor = { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' };

export function getCategoryColor(category: string): CategoryColor {
    return CATEGORY_COLORS[category] || DEFAULT_COLOR;
}
