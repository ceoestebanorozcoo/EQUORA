'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import CodeInput from '@/components/ui/CodeInput';
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoCheckmark,
  IoCheckmarkCircle,
  IoRefreshOutline,
  IoArrowBackOutline,
} from 'react-icons/io5';

type Action = 'email' | 'password';
type Step = 'choose' | 'request' | 'verify' | 'new';

const STEPS: Step[] = ['choose', 'request', 'verify', 'new'];
const STEP_LABELS = ['Opción', 'Código', 'Verificar', 'Actualizar'];

function StepIndicator({ step }: { step: Step }) {
  const visibleSteps = STEPS.slice(1);
  const visibleLabels = STEP_LABELS.slice(1);
  const currentIndex = STEPS.indexOf(step) - 1;

  if (step === 'choose') return null;

  return (
    <div className="flex items-center gap-1">
      {visibleSteps.map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${
            i < currentIndex
              ? 'bg-equora-amber/20 text-equora-amber'
              : i === currentIndex
                ? 'bg-equora-amber text-white'
                : 'bg-gray-100 text-gray-400'
          }`}>
            {i < currentIndex
              ? <IoCheckmark size={10} />
              : <span className="font-body text-[10px] font-medium">{i + 1}</span>
            }
          </div>
          <span className={`font-body text-[10px] tracking-wide ${
            i === currentIndex ? 'text-equora-dark font-medium' : 'text-gray-400'
          }`}>{visibleLabels[i]}</span>
          {i < visibleSteps.length - 1 && <div className="w-4 h-px bg-gray-200 mx-1" />}
        </div>
      ))}
    </div>
  );
}

export default function AccountSettings() {
  const [step, setStep] = useState<Step>('choose');
  const [action, setAction] = useState<Action | null>(null);
  const [code, setCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const reset = () => {
    setStep('choose');
    setAction(null);
    setCode('');
    setNewEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const handleChoose = (a: Action) => {
    setAction(a);
    setStep('request');
    setError('');
  };

  const handleSendCode = async () => {
    setError('');
    setLoading(true);
    try {
      const endpoint = action === 'email' ? '/auth/change-email' : '/auth/change-password';
      await api.post(endpoint);
      setStep('verify');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error enviando código';
      setError(msg);
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
      const type = action === 'email' ? 'change-email' : 'change-password';
      await api.post('/auth/verify-pin', { code, type });
      setStep('new');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Código incorrecto o expirado';
      setError(msg);
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) { setError('Ingresa el nuevo email'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-change', { code, type: 'change-email', newEmail });
      setSuccess('Email actualizado. Serás redirigida al login.');
      setTimeout(() => { window.location.href = '/dashboard/login'; }, 2000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error actualizando email';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Las contraseñas no coinciden'); return; }
    if (newPassword.length < 8) { setError('Mínimo 8 caracteres'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-change', { code, type: 'change-password', newPassword });
      setSuccess('Contraseña actualizada. Serás redirigida al login.');
      setTimeout(() => { window.location.href = '/dashboard/login'; }, 2000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error actualizando contraseña';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <IoCheckmarkCircle size={32} className="text-green-500" />
        </div>
        <p className="font-body text-sm text-green-700 font-medium">{success}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E0D0BE]">
        <div>
          <p className="font-display text-xs text-equora-amber tracking-widest uppercase mb-0.5">Seguridad</p>
          <h3 className="font-display text-lg tracking-wider text-equora-dark">
            {step === 'choose' && 'MI CUENTA'}
            {step === 'request' && (action === 'email' ? 'CAMBIAR EMAIL' : 'CAMBIAR CONTRASEÑA')}
            {step === 'verify' && 'VERIFICAR IDENTIDAD'}
            {step === 'new' && (action === 'email' ? 'NUEVO EMAIL' : 'NUEVA CONTRASEÑA')}
          </h3>
        </div>
        {step !== 'choose' && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 font-body text-xs text-gray-400 hover:text-equora-amber transition-colors cursor-pointer"
          >
            <IoArrowBackOutline size={14} />
            Volver
          </button>
        )}
      </div>

      <StepIndicator step={step} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
          {error}
        </div>
      )}

      {/* STEP: choose */}
      {step === 'choose' && (
        <div className="space-y-3">
          <p className="font-body text-sm text-gray-400">¿Qué deseas actualizar?</p>
          <button
            onClick={() => handleChoose('email')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-[#E0D0BE] bg-white hover:border-equora-amber/50 hover:bg-equora-amber/5 transition-all duration-200 cursor-pointer text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-equora-amber/10 flex items-center justify-center shrink-0 group-hover:bg-equora-amber/20 transition-colors">
              <IoMailOutline size={20} className="text-equora-amber" />
            </div>
            <div>
              <p className="font-display text-sm tracking-wider text-equora-dark">CAMBIAR EMAIL</p>
              <p className="font-body text-xs text-gray-400 mt-0.5">Actualiza tu dirección de correo electrónico</p>
            </div>
          </button>
          <button
            onClick={() => handleChoose('password')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-[#E0D0BE] bg-white hover:border-equora-amber/50 hover:bg-equora-amber/5 transition-all duration-200 cursor-pointer text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-equora-amber/10 flex items-center justify-center shrink-0 group-hover:bg-equora-amber/20 transition-colors">
              <IoLockClosedOutline size={20} className="text-equora-amber" />
            </div>
            <div>
              <p className="font-display text-sm tracking-wider text-equora-dark">CAMBIAR CONTRASEÑA</p>
              <p className="font-body text-xs text-gray-400 mt-0.5">Actualiza tu contraseña de acceso</p>
            </div>
          </button>
        </div>
      )}

      {/* STEP: request */}
      {step === 'request' && (
        <div className="space-y-4">
          <p className="font-body text-sm text-gray-400 leading-relaxed">
            Te enviaremos un código de verificación a tu correo actual para confirmar tu identidad.
          </p>
          <Button onClick={handleSendCode} loading={loading} className="w-full">
            Enviar código de verificación
          </Button>
        </div>
      )}

      {/* STEP: verify */}
      {step === 'verify' && (
        <form onSubmit={handleVerifyCode} className="space-y-5">
          <p className="font-body text-sm text-gray-400 leading-relaxed">
            Ingresa el código de 6 dígitos enviado a tu correo. Válido por{' '}
            <strong className="text-equora-dark font-medium">5 minutos</strong>.
          </p>
          <CodeInput value={code} onChange={setCode} disabled={loading} />
          <Button type="submit" loading={loading} className="w-full">
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

      {/* STEP: new email */}
      {step === 'new' && action === 'email' && (
        <form onSubmit={handleUpdateEmail} className="space-y-4">
          <p className="font-body text-sm text-gray-400">Código verificado. Ingresa tu nuevo email.</p>
          <div>
            <label htmlFor="new-email" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
              Nuevo email
            </label>
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
              placeholder="nuevo@correo.com"
              required
            />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Actualizar email
          </Button>
        </form>
      )}

      {/* STEP: new password */}
      {step === 'new' && action === 'password' && (
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <p className="font-body text-sm text-gray-400">Código verificado. Ingresa tu nueva contraseña.</p>
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
              Confirmar contraseña
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
