'use client';

import type { ViewMode } from '@/types/product';

interface ViewToggleProps {
    view: ViewMode;
    onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-6">
            <button
                onClick={() => onChange('list')}
                className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${view === 'list'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
            >
                <span className="text-green-600">☰</span>
                List View
            </button>
            <button
                onClick={() => onChange('card')}
                className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${view === 'card'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
            >
                <span className="text-red-500">⊞</span>
                Card View
            </button>
        </div>
    );
}
