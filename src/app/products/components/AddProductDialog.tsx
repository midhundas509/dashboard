'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Product } from '@/types/product';

const productSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
    price: z.string().min(1, 'Price is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Price must be a positive number',
    }),
    category: z.string().min(1, 'Category is required'),
    image: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductDialogProps {
    categories: string[];
    onAddProduct: (product: Product) => void;
}

export function AddProductDialog({ categories, onAddProduct }: AddProductDialogProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: '',
            price: '',
            category: '',
            image: '',
        },
    });

    const onSubmit = (data: ProductFormData) => {
        const newProduct: Product = {
            id: Date.now(),
            title: data.title,
            price: Number(data.price),
            category: data.category,
            description: '',
            image: data.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        };

        onAddProduct(newProduct);
        form.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                    <Plus className="h-4 w-4" />
                    New Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden" showCloseButton={false}>
                <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-semibold">Create Product</DialogTitle>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                        {/* First Row - Dropdowns */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 border-gray-200">
                                                    <SelectValue placeholder="Choose Category *" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="Enter Price *"
                                                className="h-10 border-gray-200"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Second Row - Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Product Title *"
                                            className="h-10 border-gray-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Third Row - Image URL */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Image URL (optional)"
                                            className="h-10 border-gray-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.reset();
                                }}
                                className="px-6"
                            >
                                Clear
                            </Button>
                            <Button type="submit" className="px-6 bg-primary">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
