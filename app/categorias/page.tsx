'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import CategoryCard from '@/components/CategoryCard';
import { CATEGORIES } from '@/data/menu';
import {
  Utensils,
  Flame,
  Wine,
  Percent,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';

export default function CategoriasPage() {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'destaques' | 'cozinha' | 'bar'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'todos', label: 'Todos', icon: Utensils },
    { id: 'destaques', label: 'Destaques', icon: Flame },
    { id: 'cozinha', label: 'Cozinha', icon: Sparkles },
    { id: 'bar', label: 'Bar & Adega', icon: Wine },
  ];

  const cozinhaCategories = CATEGORIES.filter((c) => c.group === 'Cozinha & Petiscaria');
  const barCategories = CATEGORIES.filter((c) => c.group === 'Carta de Bebidas & Balcão');

  const filteredCozinha = cozinhaCategories.filter((c) => {
    if (activeFilter === 'bar') return false;
    if (activeFilter === 'destaques' && !['para-compartilhar', 'pratos-e-saladas'].includes(c.slug)) return false;
    if (searchQuery) {
      return (
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const filteredBar = barCategories.filter((c) => {
    if (activeFilter === 'cozinha') return false;
    if (activeFilter === 'destaques' && !['drinks', 'chopp-e-beer'].includes(c.slug)) return false;
    if (searchQuery) {
      return (
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header pageTitle="Categorias" />

      <main className="flex-1 w-full pt-20 lg:pt-24 pb-28 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Intro editorial & Search */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-secondary tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Seleção Gastronômica
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container-high px-2.5 py-0.5 rounded-full">
                9 Categorias
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight">
                  Nosso Cardápio
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl leading-relaxed">
                  Navegue pelas criações autorais do Chef Ale Caldas e nossa curadoria sensorial de bebidas.
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar categoria ou prato..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container-high text-xs text-on-surface placeholder:text-outline border border-outline-variant/30 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Quick filter pill bar */}
            <div className="flex items-center gap-2 overflow-x-auto py-1.5 no-scrollbar">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id as any)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destaque Especial: Promoção do Dia */}
          <Link
            href="/destaques"
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary-container/80 via-surface-container to-surface-container-high p-5 sm:p-6 shadow-xl border border-secondary/30 active:scale-[0.99] transition-all cursor-pointer group block"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Promoção do Dia
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-primary font-semibold tracking-tight">
                  Criação Especial da Noite
                </h3>
                <p className="text-xs sm:text-sm text-on-secondary-container max-w-xl leading-relaxed">
                  Pratos selecionados pelo Chef com harmonização sugerida e valor comemorativo de balcão.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform text-secondary">
                <Percent className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-secondary/20 flex items-center justify-between text-secondary">
              <span className="text-xs tracking-wider uppercase font-bold flex items-center gap-1">
                Conferir itens exclusivos
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[11px] bg-surface-container-lowest/70 text-secondary px-2.5 py-0.5 rounded-full font-medium">
                Hoje até 23h30
              </span>
            </div>
          </Link>

          {/* Seção Cozinha Autoral */}
          {filteredCozinha.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-tertiary uppercase tracking-widest">
                  Cozinha & Petiscaria
                </h2>
                <span className="text-xs text-outline">
                  {filteredCozinha.length} coleções
                </span>
              </div>

              {/* Responsive Grid: 1 column on mobile, 2 columns on tablet, 2 or 3 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                {filteredCozinha.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    layout={cat.image ? 'featured' : 'compact'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Seção Bar & Bebidas */}
          {filteredBar.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-tertiary uppercase tracking-widest">
                  Carta de Bebidas & Balcão
                </h2>
                <span className="text-xs text-outline">
                  {filteredBar.length} cartas
                </span>
              </div>

              {/* Grid 2x2 for drinks on mobile/tablet, 4 columns on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredBar.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} layout="bar" />
                ))}
              </div>
            </div>
          )}

          {/* Curadoria & Sugestão do Sommelier */}
          <div className="p-4 sm:p-5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">
                  Curadoria & Harmonização do Sommelier
                </p>
                <p className="text-xs text-on-surface-variant">
                  Conheça nossa seleção de vinhos de altitude, chopps artesanais e coquetéis autorais.
                </p>
              </div>
            </div>
            <Link
              href="/categorias/drinks"
              className="w-full sm:w-auto h-9 px-5 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container text-xs font-bold uppercase tracking-wider shrink-0 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver Carta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
}
