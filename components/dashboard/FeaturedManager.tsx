'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import {
  IoStar, IoStarOutline, IoSave, IoCheckmarkCircle,
  IoArrowBack, IoSearch, IoGrid, IoPricetag,
} from 'react-icons/io5';

const MAX_PRODUCTS = 12;
const MAX_CATEGORIES = 4;

type View = 'choice' | 'products' | 'categories';

// ─── Mini card shared ───────────────────────────────────────────────
function MiniCard({
  image, title, subtitle, isSelected, onClick,
}: {
  image?: string; title: string; subtitle: string;
  isSelected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-left group ${
        isSelected
          ? 'border-equora-amber bg-equora-amber/5 hover:bg-red-50 hover:border-red-200'
          : 'border-gray-100 bg-white hover:border-equora-amber hover:bg-equora-amber/5'
      }`}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-equora-ivory">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" sizes="56px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-xs text-equora-amber/40">EQ</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm tracking-wide text-equora-dark truncate">{title}</p>
        <p className="font-body text-xs text-equora-amber font-medium mt-0.5">{subtitle}</p>
      </div>
      <div className="shrink-0 transition-colors">
        {isSelected ? (
          <IoStar size={18} className="text-equora-amber group-hover:text-red-400 transition-colors" />
        ) : (
          <IoStarOutline size={18} className="text-gray-300 group-hover:text-equora-amber transition-colors" />
        )}
      </div>
    </button>
  );
}

// ─── Selection Panel (shared for products & categories) ─────────────
function SelectionPanel<T extends { _id: string }>({
  label, max, selected, available, onAdd, onRemove, onBack, onSave,
  saving, saved, renderTitle, renderSubtitle, renderImage,
}: {
  label: string; max: number;
  selected: T[]; available: T[];
  onAdd: (item: T) => void; onRemove: (item: T) => void;
  onBack: () => void; onSave: () => void;
  saving: boolean; saved: boolean;
  renderTitle: (item: T) => string;
  renderSubtitle: (item: T) => string;
  renderImage: (item: T) => string | undefined;
}) {
  const [search, setSearch] = useState('');

  const filteredAvailable = useMemo(
    () => available.filter((i) => renderTitle(i).toLowerCase().includes(search.toLowerCase())),
    [available, search]
  );
  const filteredSelected = useMemo(
    () => selected.filter((i) => renderTitle(i).toLowerCase().includes(search.toLowerCase())),
    [selected, search]
  );

  return (
    <div>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between gap-3 mb-5">
        {/* Back button + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-500 hover:border-equora-amber hover:text-equora-amber transition-all duration-200 cursor-pointer shrink-0 shadow-sm"
            aria-label="Volver"
          >
            <IoArrowBack size={16} />
          </button>
          <div className="min-w-0">
            <p className="font-body text-[10px] text-gray-400 tracking-widest uppercase leading-none mb-0.5">Destacados</p>
            <p className="font-display text-sm sm:text-base md:text-lg tracking-wide sm:tracking-wider text-equora-dark leading-tight">{label.toUpperCase()}</p>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={onSave}
          disabled={saving}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-body text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 ${
            saved
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-equora-amber text-white hover:bg-[#8a5224] shadow-sm hover:shadow-md'
          }`}
        >
          {saved ? <IoCheckmarkCircle size={15} /> : <IoSave size={15} />}
          <span className="hidden sm:inline">{saved ? '¡Guardado!' : saving ? 'Guardando...' : 'Guardar cambios'}</span>
          <span className="sm:hidden">{saved ? 'Listo' : saving ? '...' : 'Guardar'}</span>
        </button>
      </div>

      {/* ── Stats + Search bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 p-3.5 bg-white rounded-2xl border border-gray-100">
        {/* Search — LEFT */}
        <div className="relative sm:w-52">
          <IoSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-100 bg-[#F9F7F4] font-body text-sm text-equora-dark placeholder:text-gray-300 focus:outline-none focus:border-equora-amber focus:bg-white transition-all"
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-gray-100" />

        {/* Progress — RIGHT */}
        <div className="flex items-center gap-3 flex-1">
          <div className="text-center shrink-0">
            <p className="font-display text-lg tracking-wider text-equora-dark leading-none">{selected.length}</p>
            <p className="font-body text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">Selec.</p>
          </div>
          <div className="h-6 w-px bg-gray-100 shrink-0" />
          <div className="text-center shrink-0">
            <p className="font-display text-lg tracking-wider text-gray-300 leading-none">{max}</p>
            <p className="font-body text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">Máx.</p>
          </div>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-equora-amber rounded-full transition-all duration-500"
              style={{ width: `${Math.min((selected.length / max) * 100, 100)}%` }}
            />
          </div>
          {selected.length >= max && (
            <span className="font-body text-[10px] text-equora-amber font-medium tracking-wider uppercase shrink-0">Completo</span>
          )}
        </div>
      </div>

      {/* ── Two panels ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Available */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <p className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider">Disponibles</p>
            </div>
            <span className="font-body text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{filteredAvailable.length}</span>
          </div>
          <div className="p-2.5 space-y-1.5 max-h-56 sm:max-h-72 md:max-h-96 lg:max-h-120 overflow-y-auto">
            {filteredAvailable.length === 0 ? (
              <p className="text-center py-10 font-body text-xs text-gray-300">
                {search ? 'Sin resultados' : 'Todos están destacados'}
              </p>
            ) : (
              filteredAvailable.map((item) => (
                <MiniCard
                  key={item._id}
                  image={renderImage(item)}
                  title={renderTitle(item)}
                  subtitle={renderSubtitle(item)}
                  isSelected={false}
                  onClick={() => selected.length < max && onAdd(item)}
                />
              ))
            )}
          </div>
        </div>

        {/* Selected */}
        <div className="bg-white rounded-2xl border border-equora-amber/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-equora-amber/10 bg-equora-amber/3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-equora-amber" />
              <p className="font-body text-xs font-semibold text-equora-dark uppercase tracking-wider">Destacados</p>
            </div>
            <span className="font-body text-xs text-equora-amber bg-equora-amber/10 px-2 py-0.5 rounded-full">{selected.length}/{max}</span>
          </div>
          <div className="p-2.5 space-y-1.5 max-h-56 sm:max-h-72 md:max-h-96 lg:max-h-120 overflow-y-auto">
            {filteredSelected.length === 0 ? (
              <div className="text-center py-10">
                <IoStarOutline size={24} className="mx-auto text-gray-200 mb-2" />
                <p className="font-body text-xs text-gray-300">
                  {search ? 'Sin resultados' : 'Ninguno seleccionado aún'}
                </p>
              </div>
            ) : (
              filteredSelected.map((item) => (
                <MiniCard
                  key={item._id}
                  image={renderImage(item)}
                  title={renderTitle(item)}
                  subtitle={renderSubtitle(item)}
                  isSelected={true}
                  onClick={() => onRemove(item)}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Main FeaturedManager ────────────────────────────────────────────
export default function FeaturedManager() {
  const [view, setView] = useState<View>('choice');

  // Products state
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [availableProducts, setAvailableProducts] = useState<IProduct[]>([]);
  const [savingProducts, setSavingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState(false);

  // Categories state
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<ICategory[]>([]);
  const [availableCategories, setAvailableCategories] = useState<ICategory[]>([]);
  const [savingCategories, setSavingCategories] = useState(false);
  const [savedCategories, setSavedCategories] = useState(false);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const loadProducts = () => {
    if (allProducts.length > 0) return;
    setLoadingProducts(true);
    api.get('/products').then((res) => {
      const all: IProduct[] = res.data.data || [];
      setAllProducts(all);
      setFeaturedProducts(all.filter((p) => p.isFeatured));
      setAvailableProducts(all.filter((p) => !p.isFeatured));
    }).finally(() => setLoadingProducts(false));
  };

  const loadCategories = () => {
    if (allCategories.length > 0) return;
    setLoadingCategories(true);
    api.get('/categories').then((res) => {
      const all: ICategory[] = res.data.data || [];
      setAllCategories(all);
      setFeaturedCategories(all.filter((c) => c.isFeatured));
      setAvailableCategories(all.filter((c) => !c.isFeatured));
    }).finally(() => setLoadingCategories(false));
  };

  const addProduct = (p: IProduct) => {
    setFeaturedProducts((prev) => [...prev, p]);
    setAvailableProducts((prev) => prev.filter((x) => x._id !== p._id));
  };
  const removeProduct = (p: IProduct) => {
    setFeaturedProducts((prev) => prev.filter((x) => x._id !== p._id));
    setAvailableProducts((prev) => [...prev, p]);
  };
  const saveProducts = async () => {
    setSavingProducts(true);
    try {
      await api.post('/products/featured', { productIds: featuredProducts.map((p) => p._id) });
      setSavedProducts(true);
      setTimeout(() => setSavedProducts(false), 3000);
    } finally {
      setSavingProducts(false);
    }
  };

  const addCategory = (c: ICategory) => {
    setFeaturedCategories((prev) => [...prev, c]);
    setAvailableCategories((prev) => prev.filter((x) => x._id !== c._id));
  };
  const removeCategory = (c: ICategory) => {
    setFeaturedCategories((prev) => prev.filter((x) => x._id !== c._id));
    setAvailableCategories((prev) => [...prev, c]);
  };
  const saveCategories = async () => {
    setSavingCategories(true);
    try {
      await api.post('/categories/featured', { categoryIds: featuredCategories.map((c) => c._id) });
      setSavedCategories(true);
      setTimeout(() => setSavedCategories(false), 3000);
    } finally {
      setSavingCategories(false);
    }
  };

  // ── Choice screen ────────────────────────────────────────────────
  if (view === 'choice') {
    return (
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <p className="font-body text-xs text-equora-amber tracking-widest uppercase mb-1">Gestión</p>
          <h2 className="font-display text-2xl tracking-wider text-equora-dark">CONTENIDO DESTACADO</h2>
          <div className="mt-3 w-8 h-px bg-equora-amber/40" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Products card */}
          <button
            onClick={() => { loadProducts(); setView('products'); }}
            className="group relative flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:border-equora-amber/40 hover:shadow-lg transition-all duration-300 cursor-pointer text-left overflow-hidden"
          >
            {/* Subtle amber accent on hover */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-equora-amber scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

            <div className="w-12 h-12 rounded-xl bg-equora-amber/8 flex items-center justify-center shrink-0 group-hover:bg-equora-amber/15 transition-colors duration-300">
              <IoGrid size={22} className="text-equora-amber" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-display text-base tracking-wider text-equora-dark">PRODUCTOS</p>
              <p className="font-body text-xs text-gray-400 mt-0.5 leading-relaxed">Hasta 12 en la página de inicio</p>
            </div>

            <div className="shrink-0 text-gray-300 group-hover:text-equora-amber transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Categories card */}
          <button
            onClick={() => { loadCategories(); setView('categories'); }}
            className="group relative flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:border-equora-amber/40 hover:shadow-lg transition-all duration-300 cursor-pointer text-left overflow-hidden"
          >
            <div className="absolute left-0 top-0 h-full w-0.5 bg-equora-amber scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

            <div className="w-12 h-12 rounded-xl bg-equora-amber/8 flex items-center justify-center shrink-0 group-hover:bg-equora-amber/15 transition-colors duration-300">
              <IoPricetag size={22} className="text-equora-amber" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-display text-base tracking-wider text-equora-dark">CATEGORÍAS</p>
              <p className="font-body text-xs text-gray-400 mt-0.5 leading-relaxed">Hasta 4 en la página de inicio</p>
            </div>

            <div className="shrink-0 text-gray-300 group-hover:text-equora-amber transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Footer note */}
        <p className="font-body text-xs text-gray-400 mt-6">
          Los cambios se reflejan en la página de inicio después de guardar.
        </p>
      </div>
    );
  }

  // ── Products panel ───────────────────────────────────────────────
  if (view === 'products') {
    if (loadingProducts) {
      return <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>;
    }
    return (
      <SelectionPanel<IProduct>
        label="Productos destacados"
        max={MAX_PRODUCTS}
        selected={featuredProducts}
        available={availableProducts}
        onAdd={addProduct}
        onRemove={removeProduct}
        onBack={() => setView('choice')}
        onSave={saveProducts}
        saving={savingProducts}
        saved={savedProducts}
        renderTitle={(p) => p.name}
        renderSubtitle={(p) => formatPrice(p.price)}
        renderImage={(p) => p.images?.[0]}
      />
    );
  }

  // ── Categories panel ─────────────────────────────────────────────
  if (loadingCategories) {
    return <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>;
  }
  return (
    <SelectionPanel<ICategory>
      label="Categorías destacadas"
      max={MAX_CATEGORIES}
      selected={featuredCategories}
      available={availableCategories}
      onAdd={addCategory}
      onRemove={removeCategory}
      onBack={() => setView('choice')}
      onSave={saveCategories}
      saving={savingCategories}
      saved={savedCategories}
      renderTitle={(c) => c.name}
      renderSubtitle={(c) => `${c.productCount ?? 0} productos`}
      renderImage={(c) => c.image}
    />
  );
}
