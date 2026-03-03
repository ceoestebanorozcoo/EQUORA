'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { login } from '@/lib/api';

export default function DashboardLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ email, password });
            router.push('/dashboard');
        } catch {
            setError('Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cocoa flex items-center justify-center p-6">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8D1A7' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <Image
                            src="/logo.png"
                            alt="Equora"
                            fill
                            className="object-contain brightness-0 invert opacity-80"
                            priority
                        />
                    </div>
                    <h1 className="font-display text-2xl text-golden tracking-[0.3em]">
                        EQUORA
                    </h1>
                    <p className="text-golden/40 text-xs tracking-[0.3em] uppercase mt-2 font-light">
                        Panel de Administración
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-cocoa-light/50 backdrop-blur-sm border border-golden/10 rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error */}
                        {error && (
                            <div className="px-4 py-3 bg-wine/20 border border-wine/30 rounded-sm text-wine/90 text-sm text-center font-light">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-[10px] tracking-[0.3em] uppercase text-golden/50 mb-2 font-light">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                  w-full px-4 py-3
                  bg-cocoa/60 border border-golden/15
                  rounded-sm text-sm text-golden
                  placeholder:text-golden/20 placeholder:font-light
                  focus:outline-none focus:border-golden/40 focus:ring-1 focus:ring-golden/10
                  transition-all duration-300
                "
                                placeholder="admin@equora.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[10px] tracking-[0.3em] uppercase text-golden/50 mb-2 font-light">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                  w-full px-4 py-3
                  bg-cocoa/60 border border-golden/15
                  rounded-sm text-sm text-golden
                  placeholder:text-golden/20 placeholder:font-light
                  focus:outline-none focus:border-golden/40 focus:ring-1 focus:ring-golden/10
                  transition-all duration-300
                "
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                w-full py-3.5
                bg-golden/10 border border-golden/30
                text-golden text-xs tracking-[0.3em] uppercase font-light
                rounded-sm
                hover:bg-golden/20 hover:border-golden/50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-500
              "
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-golden/20 text-xs mt-8 font-light tracking-wider">
                    © {new Date().getFullYear()} Equora · Acceso exclusivo
                </p>
            </div>
        </div>
    );
}
