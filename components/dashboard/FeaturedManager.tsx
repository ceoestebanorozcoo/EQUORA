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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-400 hover:text-equora-dark transition-colors font-body text-sm cursor-pointer"
          >
            <IoArrowBack size={16} /> Volver
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <div>
            <h2 className="font-display text-2xl tracking-wider text-equora-dark">{label.toUpperCase()}</h2>
            <p className="font-body text-sm text-gray-500 mt-0.5">
              Selecciona hasta {max} para mostrar en la página de inicio
            </p>
          </div>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all cursor-pointer ${
            saved ? 'bg-green-500 text-white' : 'bg-equora-amber text-white hover:bg-[#8a5224]'
          }`}
        >
          {saved ? <IoCheckmarkCircle size={16} /> : <IoSave size={16} />}
          {saved ? '¡Guardado!' : saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <IoSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm text-equora-dark placeholder:text-gray-400 focus:outline-none focus:border-equora-amber transition-colors"
        />
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-body text-sm font-semibold text-gray-700">
              Disponibles ({filteredAvailable.length})
            </h3>
            <p className="font-body text-xs text-gray-400 mt-0.5">Clic para agregar a destacados</p>
          </div>
          <div className="p-3 space-y-2 max-h-120 overflow-y-auto">
            {filteredAvailable.length === 0 ? (
              <p className="text-center py-8 font-body text-sm text-gray-400">
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
        <div className="bg-white rounded-2xl border border-equora-amber/20 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-equora-amber/20 bg-equora-amber/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-body text-sm font-semibold text-equora-dark">
                  Destacados ({selected.length}/{max})
                </h3>
                <p className="font-body text-xs text-gray-400 mt-0.5">Clic para quitar de destacados</p>
              </div>
              {selected.length >= max && (
                <span className="font-body text-xs bg-equora-amber text-white px-2.5 py-1 rounded-full">
                  Completo
                </span>
              )}
            </div>
          </div>
          <div className="p-3 space-y-2 max-h-120 overflow-y-auto">
            {filteredSelected.length === 0 ? (
              <div className="text-center py-8">
                <IoStarOutline size={32} className="mx-auto text-gray-200 mb-2" />
                <p className="font-body text-sm text-gray-400">
                  {search ? 'Sin resultados' : 'Ninguno seleccionado'}
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
      <div>
        <div className="mb-8">
          <h2 className="font-display text-2xl tracking-wider text-equora-dark">PRODUCTOS DESTACADOS</h2>
          <p className="font-body text-sm text-gray-500 mt-1">
            ¿Qué quieres destacar en la página de inicio?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {/* Products card */}
          <button
            onClick={() => { loadProducts(); setView('products'); }}
            className="group flex flex-col items-start gap-4 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-equora-amber hover:shadow-md transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors">
              <IoGrid size={24} className="text-equora-amber" />
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wider text-equora-dark mb-1">PRODUCTOS</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed">
                Selecciona hasta 12 productos para mostrar en la sección de inicio
              </p>
            </div>
            <span className="font-body text-sm text-equora-amber font-medium group-hover:underline">
              Gestionar →
            </span>
          </button>

          {/* Categories card */}
          <button
            onClick={() => { loadCategories(); setView('categories'); }}
            className="group flex flex-col items-start gap-4 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-equora-amber hover:shadow-md transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors">
              <IoPricetag size={24} className="text-equora-amber" />
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wider text-equora-dark mb-1">CATEGORÍAS</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed">
                Selecciona hasta 4 categorías para mostrar en la sección de inicio
              </p>
            </div>
            <span className="font-body text-sm text-equora-amber font-medium group-hover:underline">
              Gestionar →
            </span>
          </button>
        </div>
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
