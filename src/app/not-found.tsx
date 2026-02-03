'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-gray-50">
                <div className="text-center px-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                        <FileQuestion className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or is currently under development.
                    </p>
                    <Link href="/products">
                        <Button className="gap-2">
                            Go to Products
                        </Button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
