'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import ProductCard from '@/components/ProductCard';
import { getCategoryBySlug, getProductsByCategory, PRODUCTS, CATEGORIES } from '@/data/menu';
import { Wine, Search } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);

  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!category) {
    notFound();
  }

  let products = getProductsByCategory(category.slug);
  if (products.length === 0) {
    products = PRODUCTS.filter((p) => p.categorySlug === category.slug || p.tags?.includes(category.slug));
  }

  const availableTags = Array.from(
    new Set(products.flatMap((p) => p.tags || []))
  );

  const filterOptions = [
    { id: 'todos', label: 'Todos', count: products.length },
    ...(availableTags.includes('mais-pedidos')
      ? [{ id: 'mais-pedidos', label: 'Mais Pedidos' }]
      : []),
    ...(availableTags.includes('friturinhas')
      ? [{ id: 'friturinhas', label: 'Friturinhas de Autor' }]
      : []),
    ...(availableTags.includes('tartaros-frios')
      ? [{ id: 'tartaros-frios', label: 'Tártaros & Frios' }]
      : []),
    ...(availableTags.includes('destaques')
      ? [{ id: 'destaques', label: 'Destaques' }]
      : []),
  ];

  const filteredProducts = products.filter((item) => {
    const matchesTag =
      activeFilter === 'todos' || item.tags?.includes(activeFilter);
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header pageTitle={category.title} showBackButton />

      <main className="flex-1 w-full pt-20 lg:pt-24 pb-28 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Breadcrumb Navigation on Desktop */}
          <nav className="hidden lg:flex items-center gap-2 text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href="/categorias" className="hover:text-primary transition-colors">
              Categorias
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold">{category.title}</span>
          </nav>

          {/* Category Intro / Editorial Header */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
                Cardápio do Chef
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
              <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                {category.group}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold tracking-tight">
                  {category.title}
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl mt-1">
                  {category.description}
                </p>
              </div>

              {/* Quick Search */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar neste cardápio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-high text-xs text-on-surface placeholder:text-outline border border-outline-variant/30 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Filter Pills */}
          {filterOptions.length > 1 && (
            <nav aria-label="Filtros da categoria" className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filterOptions.map((opt) => {
                const isActive = activeFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFilter(opt.id)}
                    className={`h-8 px-4 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm font-bold'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.count !== undefined && (
                      <span className="text-[10px] opacity-80">({opt.count})</span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Items Feed: Multi-column on desktop, single column on mobile */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/30">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg font-semibold text-on-surface">
                Nenhum prato nesta seleção
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Experimente limpar os filtros ou buscar por outro termo.
              </p>
              <button
                onClick={() => {
                  setActiveFilter('todos');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase tracking-wider"
              >
                Ver Todos os Pratos
              </button>
            </div>
          )}

          {/* Sommelier Note Section */}
          <section className="mt-8 p-4 sm:p-5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 text-tertiary">
              <Wine className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                Harmonização Sugerida pelo Sommelier
              </span>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                Para acompanhar suas escolhas desta seleção, experimente nosso{' '}
                <strong className="font-semibold text-primary">
                  Smoked Negroni Empório
                </strong>{' '}
                ou nossa refrescante{' '}
                <strong className="font-semibold text-primary">
                  IPA Tatuapé Fog (Pint 473ml)
                </strong>
                .
              </p>
            </div>
          </section>

          {/* Quick jump to other categories */}
          <section className="pt-4 border-t border-outline-variant/15">
            <h3 className="font-serif text-base font-semibold text-on-surface mb-3">
              Outras Categorias do Cardápio
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link
                  key={c.id}
                  href={`/categorias/${c.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-xs text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
}
