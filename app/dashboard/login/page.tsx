'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import CodeInput from '@/components/ui/CodeInput';

type Step = 'login' | 'forgot-email' | 'forgot-code' | 'forgot-new-pw';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Credenciales inválidas';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess('Si el email existe, recibirás un código de 6 dígitos.');
      setStep('forgot-code');
    } catch {
      setError('Error enviando el código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) { setError('Ingresa el código completo'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-reset-code', { email, code });
      setStep('forgot-new-pw');
      setSuccess('');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Código inválido';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Las contraseñas no coinciden'); return; }
    if (newPassword.length < 8) { setError('Mínimo 8 caracteres'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, code, newPassword });
      setSuccess('¡Contraseña actualizada! Ahora puedes iniciar sesión.');
      setStep('login');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-equora-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <a href="/" className="group flex items-center gap-3 mb-3 w-fit transition-transform duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-full bg-equora-amber/10 border border-equora-amber/25 overflow-hidden flex items-center justify-center shrink-0 group-hover:border-equora-amber/50 transition-colors duration-300">
              <img src="/logo.svg" alt="EQUORA" className="w-full h-full object-contain p-2" />
            </div>
            <h1 className="font-display text-4xl tracking-[6px] text-[#F9F7F4] group-hover:text-equora-amber transition-colors duration-300">
              EQUORA
            </h1>
          </a>
          <p className="font-editorial italic text-[#F9F7F4]/40 text-sm">Panel de administración</p>
        </div>

        {/* Card */}
        <div className="bg-[#1E2A3A] rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 bg-red-900/30 border border-red-800 text-red-300 rounded-xl px-4 py-3 text-sm font-body" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 bg-green-900/30 border border-green-800 text-green-300 rounded-xl px-4 py-3 text-sm font-body" role="status">
              {success}
            </div>
          )}

          {/* LOGIN */}
          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <h2 className="font-display text-xl tracking-wider text-[#F9F7F4] mb-6">INICIAR SESIÓN</h2>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-[#F9F7F4]/60 mb-1.5 font-body">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-equora-navy border border-white/10 rounded-xl font-body text-sm text-[#F9F7F4] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-equora-amber/40 focus:border-equora-amber"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-[#F9F7F4]/60 mb-1.5 font-body">Contraseña</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-equora-navy border border-white/10 rounded-xl font-body text-sm text-[#F9F7F4] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-equora-amber/40 focus:border-equora-amber"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" loading={loading} className="w-full mt-2">Ingresar</Button>
              <button
                type="button"
                onClick={() => { setStep('forgot-email'); setError(''); setSuccess(''); }}
                className="w-full text-sm text-[#F9F7F4]/40 hover:text-equora-amber transition-colors cursor-pointer font-body mt-2"
              >
                ¿Olvidé mi contraseña?
              </button>
            </form>
          )}

          {/* FORGOT - EMAIL */}
          {step === 'forgot-email' && (
            <form onSubmit={handleForgotEmail} className="space-y-5">
              <h2 className="font-display text-xl tracking-wider text-[#F9F7F4] mb-2">RECUPERAR ACCESO</h2>
              <p className="font-body text-sm text-[#F9F7F4]/40 mb-4">Recibirás un código de 6 dígitos en tu email.</p>
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-[#F9F7F4]/60 mb-1.5 font-body">Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-equora-navy border border-white/10 rounded-xl font-body text-sm text-[#F9F7F4] focus:outline-none focus:ring-2 focus:ring-equora-amber/40 focus:border-equora-amber"
                  required
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">Enviar código</Button>
              <button type="button" onClick={() => { setStep('login'); setError(''); }} className="w-full text-sm text-[#F9F7F4]/40 hover:text-equora-amber transition-colors cursor-pointer font-body">← Volver al login</button>
            </form>
          )}

          {/* FORGOT - CODE */}
          {step === 'forgot-code' && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <h2 className="font-display text-xl tracking-wider text-[#F9F7F4] mb-2">INGRESAR CÓDIGO</h2>
              <p className="font-body text-sm text-[#F9F7F4]/40">Código válido por 15 minutos.</p>
              <CodeInput value={code} onChange={setCode} disabled={loading} />
              <Button type="submit" loading={loading} className="w-full">Verificar código</Button>
              <button type="button" onClick={() => { setStep('forgot-email'); setCode(''); setError(''); }} className="w-full text-sm text-[#F9F7F4]/40 hover:text-equora-amber transition-colors cursor-pointer font-body">← Reenviar código</button>
            </form>
          )}

          {/* FORGOT - NEW PW */}
          {step === 'forgot-new-pw' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <h2 className="font-display text-xl tracking-wider text-[#F9F7F4] mb-2">NUEVA CONTRASEÑA</h2>
              <div>
                <label htmlFor="new-pw" className="block text-sm font-medium text-[#F9F7F4]/60 mb-1.5 font-body">Nueva contraseña</label>
                <input id="new-pw" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={8} className="w-full px-4 py-3 bg-equora-navy border border-white/10 rounded-xl font-body text-sm text-[#F9F7F4] focus:outline-none focus:ring-2 focus:ring-equora-amber/40 focus:border-equora-amber" required />
              </div>
              <div>
                <label htmlFor="confirm-pw" className="block text-sm font-medium text-[#F9F7F4]/60 mb-1.5 font-body">Confirmar contraseña</label>
                <input id="confirm-pw" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} className="w-full px-4 py-3 bg-equora-navy border border-white/10 rounded-xl font-body text-sm text-[#F9F7F4] focus:outline-none focus:ring-2 focus:ring-equora-amber/40 focus:border-equora-amber" required />
              </div>
              <Button type="submit" loading={loading} className="w-full">Guardar nueva contraseña</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
