'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { IoCreateOutline, IoTrashOutline, IoAdd } from 'react-icons/io5';
import { Star } from 'lucide-react';

interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  active: boolean;
}

const emptyForm = { name: '', role: 'Cliente', text: '', rating: 5 };

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ITestimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = useCallback(() => {
    setLoading(true);
    api.get('/testimonials').then((res) => {
      setTestimonials(res.data.data || []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (t: ITestimonial) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, text: t.text, rating: t.rating });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.text.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/testimonials/${editing._id}`, form);
      } else {
        await api.post('/testimonials', form);
      }
      setFormOpen(false);
      fetchAll();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/testimonials/${deleteId}`);
      fetchAll();
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleActive = async (t: ITestimonial) => {
    await api.put(`/testimonials/${t._id}`, { active: !t.active });
    fetchAll();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
        <div>
          <p className="font-body text-[10px] text-equora-amber tracking-widest uppercase mb-0.5">Gestión</p>
          <h2 className="font-display text-xl sm:text-2xl tracking-wider text-equora-dark">TESTIMONIOS</h2>
          {!loading && (
            <p className="font-body text-xs text-gray-400 mt-0.5">
              {testimonials.length} testimonio{testimonials.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <Button onClick={openNew} size="sm" className="shrink-0">
          <IoAdd size={15} className="mr-1" aria-hidden="true" />
          <span className="hidden sm:inline">Nuevo testimonio</span>
          <span className="sm:hidden">Nuevo</span>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <IoChatbubbleEllipses size={20} className="text-gray-300" />
          </div>
          <p className="font-body text-sm text-gray-400">No hay testimonios aún</p>
          <p className="font-body text-xs text-gray-300 mt-1">Crea el primero con el botón de arriba</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md ${
                t.active ? 'border-gray-100' : 'border-gray-100 opacity-60'
              }`}
            >
              {/* Top: name + stars */}
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-body font-semibold text-equora-dark text-sm">{t.name}</p>
                  <span className="font-body text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{t.role}</span>
                </div>
                <div className="flex gap-0.5 mt-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < t.rating ? 'fill-equora-amber text-equora-amber' : 'text-gray-200'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="px-5 pb-4">
                <p className="font-editorial italic text-sm text-gray-500 leading-relaxed line-clamp-2">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-end gap-1.5 px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
                <button
                  onClick={() => openEdit(t)}
                  className="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 hover:bg-equora-amber/10 hover:border-equora-amber/30 text-gray-400 hover:text-equora-amber rounded-lg transition-colors cursor-pointer shadow-sm"
                  aria-label={`Editar testimonio de ${t.name}`}
                >
                  <IoCreateOutline size={14} aria-hidden="true" />
                </button>
                <button
                  onClick={() => setDeleteId(t._id)}
                  className="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                  aria-label={`Eliminar testimonio de ${t.name}`}
                >
                  <IoTrashOutline size={13} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Editar testimonio' : 'Nuevo testimonio'}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block font-body text-sm font-medium text-equora-dark mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ej: Andrés M."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm text-equora-dark focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-equora-dark mb-1.5">
              Rol / Cargo
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Ej: Cliente"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm text-equora-dark focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-equora-dark mb-1.5">
              Testimonio *
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              rows={4}
              placeholder="Escribe el testimonio del cliente..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm text-equora-dark focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition resize-none"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-equora-dark mb-1.5">
              Calificación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="cursor-pointer"
                  aria-label={`${n} estrella${n !== 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      n <= form.rating ? 'fill-equora-amber text-equora-amber' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setFormOpen(false)} className="flex-1 border border-gray-200">
              Cancelar
            </Button>
            <Button onClick={handleSave} loading={saving} className="flex-1">
              {editing ? 'Guardar cambios' : 'Crear testimonio'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación" size="sm">
        <p className="font-body text-[#6B7280] mb-6">¿Estás seguro de que deseas eliminar este testimonio? Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200">
            Cancelar
          </Button>
          <Button onClick={handleDelete} loading={deleting} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
