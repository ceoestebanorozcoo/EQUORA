'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import CodeInput from '@/components/ui/CodeInput';

type Step = 'request' | 'verify' | 'new';

export default function ChangeEmailForm() {
  const [step, setStep] = useState<Step>('request');
  const [code, setCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/change-email');
      setStep('verify');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error enviando código';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) { setError('Ingresa el código completo'); return; }
    setError('');
    setStep('new');
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) { setError('Ingresa el nuevo email'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-change', { code, type: 'change-email', newEmail });
      setSuccess('Email actualizado. Serás redirigido al login.');
      setTimeout(() => { window.location.href = '/dashboard/login'; }, 2000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Código inválido o expirado';
      setError(msg);
      setStep('verify');
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-body" role="status">
        {success}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl tracking-wider text-equora-dark">CAMBIAR EMAIL</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
          {error}
        </div>
      )}

      {step === 'request' && (
        <div className="space-y-4">
          <p className="font-body text-sm text-[#6B7280]">
            Te enviaremos un código de verificación a tu correo actual para confirmar tu identidad antes de cambiar el email.
          </p>
          <Button onClick={handleSendCode} loading={loading} className="w-full">
            Enviar código de verificación
          </Button>
        </div>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <p className="font-body text-sm text-[#6B7280]">
            Ingresa el código de 6 dígitos enviado a tu correo actual. Válido por <strong>5 minutos</strong>.
          </p>
          <CodeInput value={code} onChange={setCode} disabled={loading} />
          <Button type="submit" className="w-full">
            Confirmar código
          </Button>
          <button
            type="button"
            onClick={() => { setStep('request'); setCode(''); setError(''); }}
            className="w-full text-sm text-[#6B7280] hover:text-equora-amber transition-colors cursor-pointer font-body"
          >
            Reenviar código
          </button>
        </form>
      )}

      {step === 'new' && (
        <form onSubmit={handleUpdateEmail} className="space-y-4">
          <div>
            <label htmlFor="new-email" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
              Nuevo email
            </label>
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
              placeholder="nuevo@correo.com"
              required
            />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Actualizar email
          </Button>
        </form>
      )}
    </div>
  );
}
