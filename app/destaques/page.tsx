'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/data/menu';
import { Wine, Sparkles } from 'lucide-react';

export default function DestaquesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const dishes = PRODUCTS.filter(
    (p) =>
      p.isFeatured ||
      ['para-compartilhar', 'pratos-e-saladas'].includes(p.categorySlug)
  );

  const filterOptions = [
    { id: 'todos', label: 'Todos', count: dishes.length },
    { id: 'mais-pedidos', label: 'Mais Pedidos' },
    { id: 'friturinhas', label: 'Friturinhas de Autor' },
    { id: 'tartaros-frios', label: 'Tártaros & Frios' },
  ];

  const filteredDishes = dishes.filter((dish) => {
    if (activeFilter === 'todos') return true;
    return dish.tags?.includes(activeFilter);
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header pageTitle="Destaques" showBackButton />

      <main className="flex-1 w-full pt-20 lg:pt-24 pb-28 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header intro */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Cardápio do Chef
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
              <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Criações & Entradas
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold tracking-tight">
              Para Compartilhar & Destaques
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl">
              Petiscos e criações artesanais servidas em porções generosas para celebrar os encontros à mesa no Empório.
            </p>
          </section>

          {/* Filter Pills */}
          <nav aria-label="Filtros de destaques" className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
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

          {/* Dishes Feed: Responsive multi-column grid on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDishes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Sommelier Note */}
          <section className="mt-8 p-4 sm:p-5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 text-tertiary">
              <Wine className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                Harmonização Sugerida
              </span>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                Para abrir a noite com nossos destaques, peça um{' '}
                <strong className="font-semibold text-primary">
                  Negroni Autoral Defumado
                </strong>{' '}
                ou nossa cerveja{' '}
                <strong className="font-semibold text-primary">
                  IPA Tatuapé Fog
                </strong>
                .
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
}
