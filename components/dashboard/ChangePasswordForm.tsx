'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import CodeInput from '@/components/ui/CodeInput';
import { IoLockClosedOutline, IoCheckmark, IoCheckmarkCircle, IoRefreshOutline } from 'react-icons/io5';

type Step = 'request' | 'verify' | 'new';

const STEPS: Step[] = ['request', 'verify', 'new'];
const STEP_LABELS = ['Solicitar', 'Verificar', 'Actualizar'];

export default function ChangePasswordForm() {
  const [step, setStep] = useState<Step>('request');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const stepIndex = STEPS.indexOf(step);

  const handleSendCode = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/change-password');
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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Las contraseñas no coinciden'); return; }
    if (newPassword.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-change', { code, type: 'change-password', newPassword });
      setSuccess('Contraseña actualizada. Serás redirigido al login.');
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
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
          <IoCheckmarkCircle size={28} className="text-green-500" />
        </div>
        <p className="font-body text-sm text-green-700 font-medium">{success}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3.5 pb-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-equora-amber/10 flex items-center justify-center shrink-0 mt-0.5">
          <IoLockClosedOutline size={18} className="text-equora-amber" />
        </div>
        <div>
          <p className="font-body text-[10px] text-equora-amber tracking-widest uppercase mb-0.5">Seguridad</p>
          <h3 className="font-display text-lg tracking-wider text-equora-dark">CAMBIAR CONTRASEÑA</h3>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${
              i < stepIndex
                ? 'bg-equora-amber/20 text-equora-amber'
                : i === stepIndex
                  ? 'bg-equora-amber text-white'
                  : 'bg-gray-100 text-gray-400'
            }`}>
              {i < stepIndex
                ? <IoCheckmark size={10} />
                : <span className="font-body text-[10px] font-medium">{i + 1}</span>
              }
            </div>
            <span className={`font-body text-[10px] tracking-wide ${
              i === stepIndex ? 'text-equora-dark font-medium' : 'text-gray-400'
            }`}>{STEP_LABELS[i]}</span>
            {i < STEPS.length - 1 && <div className="w-4 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
          {error}
        </div>
      )}

      {step === 'request' && (
        <div className="space-y-4">
          <p className="font-body text-sm text-gray-400 leading-relaxed">
            Te enviaremos un código de verificación a tu correo para confirmar tu identidad antes de cambiar la contraseña.
          </p>
          <Button onClick={handleSendCode} loading={loading} className="w-full">
            Enviar código de verificación
          </Button>
        </div>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerifyCode} className="space-y-5">
          <p className="font-body text-sm text-gray-400 leading-relaxed">
            Ingresa el código de 6 dígitos enviado a tu correo. Válido por{' '}
            <strong className="text-equora-dark font-medium">5 minutos</strong>.
          </p>
          <CodeInput value={code} onChange={setCode} disabled={loading} />
          <Button type="submit" className="w-full">
            Confirmar código
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <button
              type="button"
              onClick={() => { setStep('request'); setCode(''); setError(''); }}
              className="flex items-center gap-1.5 font-body text-xs text-gray-400 hover:text-equora-amber transition-colors cursor-pointer shrink-0 group"
            >
              <IoRefreshOutline size={12} className="transition-transform group-hover:rotate-180 duration-300" />
              Reenviar código
            </button>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
        </form>
      )}

      {step === 'new' && (
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label htmlFor="new-pw" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
              Nueva contraseña
            </label>
            <input
              id="new-pw"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-pw" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
              Confirmar nueva contraseña
            </label>
            <input
              id="confirm-pw"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
              placeholder="Repite la contraseña"
              required
            />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Actualizar contraseña
          </Button>
        </form>
      )}
    </div>
  );
}
