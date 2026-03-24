'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/axios';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { IoPencilOutline, IoTrashOutline, IoAdd, IoCheckmark, IoClose } from 'react-icons/io5';
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl tracking-wider text-equora-dark">TESTIMONIOS</h2>
          <p className="font-body text-sm text-[#6B7280] mt-1">
            {testimonials.length} testimonio{testimonials.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={openNew} size="sm">
          <IoAdd size={16} className="mr-1" aria-hidden="true" />
          Nuevo testimonio
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-editorial italic text-xl text-[#6B7280]">No hay testimonios aún</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className={`bg-white rounded-2xl border p-5 flex gap-4 items-start transition-opacity ${
                t.active ? 'border-gray-100' : 'border-gray-100 opacity-50'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-body font-semibold text-equora-dark text-sm">{t.name}</p>
                  <span className="font-body text-xs text-[#6B7280]">{t.role}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-equora-amber text-equora-amber" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <p className="font-body text-sm text-[#6B7280] leading-relaxed line-clamp-2">{t.text}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleActive(t)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-colors cursor-pointer ${
                    t.active
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-[#6B7280] hover:bg-gray-50'
                  }`}
                  aria-label={t.active ? 'Desactivar' : 'Activar'}
                >
                  {t.active ? <IoCheckmark size={14} /> : <IoClose size={14} />}
                  {t.active ? 'Activo' : 'Inactivo'}
                </button>
                <button
                  onClick={() => openEdit(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[#6B7280] hover:text-equora-amber hover:bg-equora-amber/8 rounded-lg transition-colors cursor-pointer font-body text-xs font-medium"
                  aria-label={`Editar testimonio de ${t.name}`}
                >
                  <IoPencilOutline size={14} aria-hidden="true" />
                  Editar
                </button>
                <button
                  onClick={() => setDeleteId(t._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-body text-xs font-medium"
                  aria-label={`Eliminar testimonio de ${t.name}`}
                >
                  <IoTrashOutline size={14} aria-hidden="true" />
                  Eliminar
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
