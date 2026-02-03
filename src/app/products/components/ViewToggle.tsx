'use client';

import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ViewMode } from '@/types/product';

interface ViewToggleProps {
    view: ViewMode;
    onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('list')}
                className="rounded-none px-3"
            >
                <List className="h-4 w-4 mr-2" />
                List View
            </Button>
            <Button
                variant={view === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onChange('card')}
                className="rounded-none px-3"
            >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Card View
            </Button>
        </div>
    );
}
