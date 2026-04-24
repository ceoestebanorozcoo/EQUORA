'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getMe } from '@/lib/api';
import api from '@/lib/axios';

const INACTIVITY_LIMIT = 3 * 60 * 60 * 1000; // 3 hours in ms

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const logout = useCallback(async () => {
        try { await api.post('/auth/logout'); } catch { /* ignore */ }
        router.push('/dashboard/login');
    }, [router]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(logout, INACTIVITY_LIMIT);
    }, [logout]);

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

    // Start inactivity timer once authenticated and not on login page
    useEffect(() => {
        if (!authenticated || pathname === '/dashboard/login') return;

        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
        events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
        resetTimer();

        return () => {
            events.forEach((e) => window.removeEventListener(e, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [authenticated, pathname, resetTimer]);

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
