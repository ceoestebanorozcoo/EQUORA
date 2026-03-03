'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getMe } from '@/lib/api';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === '/dashboard/login') {
            setChecking(false);
            setAuthenticated(true);
            return;
        }

        const checkAuth = async () => {
            try {
                await getMe();
                setAuthenticated(true);
            } catch {
                router.push('/dashboard/login');
            } finally {
                setChecking(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (checking) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-golden/30 border-t-golden rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-olive/50 text-xs tracking-[0.3em] uppercase font-light">
                        Verificando acceso...
                    </p>
                </div>
            </div>
        );
    }

    if (!authenticated) return null;

    return <>{children}</>;
}
