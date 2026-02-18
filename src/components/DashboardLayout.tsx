'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Search,
    Plus,
    HelpCircle,
    Bell,
    Settings,
    LayoutDashboard,
    Calendar,
    Users,
    Target,
    ClipboardList,
    CreditCard,
    FileText,
    BarChart3,
    ChevronDown,
    Menu,
    X,
} from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: Target, label: 'CRM', href: '/crm' },
    { icon: ClipboardList, label: 'Products', href: '/products' },
    { icon: CreditCard, label: 'Plans', href: '/plans' },
    { icon: FileText, label: 'Accounting', href: '/accounting' },
    { icon: BarChart3, label: 'Reports', href: '/reports' },
];

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50">
         
            <nav className="fixed top-0 left-0 right-0 h-14 bg-[#1a1a2e] z-50 flex items-center px-4">
               
                <button
                    className="lg:hidden text-white mr-4"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

             
                <div className="flex items-center gap-2 mr-8">
                    <span className="text-cyan-400 font-bold text-xl">B</span>
                    <span className="text-white font-bold text-lg hidden sm:inline">IGDAY</span>
                </div>

               
                <div className="flex-1 max-w-md mx-auto hidden sm:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-9 pl-10 pr-16 rounded-md bg-[#2a2a3e] text-white placeholder-gray-400 text-sm border-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 bg-[#1a1a2e] px-1.5 py-0.5 rounded">
                            Ctrl + K
                        </span>
                    </div>
                </div>

             
                <div className="flex items-center gap-2 ml-auto">
                    <button className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                        <Plus className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white">
                        <HelpCircle className="h-5 w-5" />
                    </button>
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white">
                        <Settings className="h-5 w-5" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium ml-2">
                        K
                    </div>
                </div>
            </nav>

           
            <aside
                className={`fixed top-14 left-0 bottom-0 w-56 bg-[#1e1e36] z-40 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-medium">
                            KR
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <span className="text-white text-sm font-medium truncate">Kate Russell</span>
                                <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                            </div>
                            <span className="text-gray-400 text-xs">Employee ID: 7942</span>
                        </div>
                    </div>
                </div>

                
                <nav className="p-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${isActive
                                    ? 'bg-primary text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-56 pt-14 min-h-screen">
                {children}
            </main>
        </div>
    );
}
