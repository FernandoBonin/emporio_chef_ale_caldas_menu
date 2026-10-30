'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import ProductCard from '@/components/ProductCard';
import { RESTAURANT_INFO, PRODUCTS } from '@/data/menu';
import {
  BookOpen,
  UtensilsCrossed,
  Sparkles,
  Wine,
  Beer,
  Clock,
  ArrowRight,
  Flame,
  ChefHat,
  GlassWater,
} from 'lucide-react';

export default function HomePage() {
  // 3 featured dishes matching Stitch reference
  const featuredDishes = PRODUCTS.filter((p) =>
    ['croquetes-artesanais-de-ossobuco', 'salada-caesar-autoral-frango', 'rolinhos-artesanais-crocantes'].includes(p.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />

      <main className="flex-1 w-full pt-16 lg:pt-24 pb-28 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* HERO SECTION: Responsive 2-column on desktop, authentic Stitch on mobile */}
        <section className="relative w-full rounded-2xl bg-surface-container-low border border-outline-variant/15 p-6 sm:p-8 lg:p-12 shadow-2xl overflow-hidden mb-8 lg:mb-14">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Editorial info) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
              {/* Official Emblem */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-primary/25 blur-md scale-95 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40 shadow-xl">
                  <Image
                    src={RESTAURANT_INFO.logoUrl}
                    alt="Emblema Empório Chef Ale Caldas"
                    fill
                    className="object-cover transform transition duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    sizes="112px"
                    priority
                  />
                </div>
              </div>

              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 text-tertiary text-xs font-semibold tracking-widest uppercase">
                <UtensilsCrossed className="w-3.5 h-3.5 text-tertiary" />
                <span>{RESTAURANT_INFO.tagline}</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight">
                  {RESTAURANT_INFO.name}
                </h1>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
                  {RESTAURANT_INFO.description}
                </p>
              </div>

              {/* CTAs for Browsing */}
              <div className="w-full sm:w-auto pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/categorias"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-98"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explorar Cardápio</span>
                </Link>

                <Link
                  href="/destaques"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ver Destaques da Casa</span>
                </Link>
              </div>

              {/* Quick Hours indicator */}
              <div className="flex items-center gap-2 text-xs text-outline pt-1">
                <Clock className="w-4 h-4 text-secondary" />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>

            {/* Right Column on Desktop: Featured Dish Spotlight */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container shadow-2xl p-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhv42HFM-oltBph9_LMkPm2DmKQZA2nAnjHMyXCAc1ZPv_6AO7eoDs5dbVs0q9wUy4EQ-zyQbr8wZVJ53QUnllYACLg0J0gLRMJYIbzzZv_YWvMcT6VpwCi_cDUdMe9j7fTGWf450l105moK7S2mIsbE10yKld4YbNkwBs1BjyiWI_Ox5wxL46BLPnnkgMTOARm5jcFWhsKpOZjXKJ5g1ikit_Q9hPVQI9QrvLtGVXiDVZcBtu2sbBAA"
                    alt="Croquetes de Ossobuco - Empório Chef Ale Caldas"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    sizes="480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-secondary-container/90 backdrop-blur-md px-3 py-1 rounded-full text-secondary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Destaque Autoral</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                        Entrada Assinatura
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white">
                        Croquetes de Ossobuco
                      </h3>
                    </div>
                    <span className="font-serif text-xl font-bold text-primary">
                      R$ 48,00
                    </span>
                  </div>
                </div>
                <div className="p-3 text-xs text-on-surface-variant flex items-center justify-between">
                  <span>Massa cremosa em redução de vinho e ervas</span>
                  <Link
                    href="/prato/croquetes-artesanais-de-ossobuco"
                    className="text-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    Ver Detalhes <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: DESTAQUES DA CASA */}
        <section className="space-y-4 mb-8 lg:mb-14">
          <div className="flex items-end justify-between px-1">
            <div>
              <span className="text-xs font-semibold text-tertiary tracking-widest uppercase block">
                Seleção Gastronômica
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-on-surface">
                Destaques da Casa
              </h2>
            </div>
            <Link
              href="/destaques"
              className="text-xs sm:text-sm text-secondary hover:text-primary font-semibold tracking-wide flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Responsive presentation: Horizontal snap on mobile, 3-column grid on desktop */}
          <div className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:overflow-visible no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {featuredDishes.map((product) => (
              <ProductCard key={product.id} product={product} layout="carousel" />
            ))}
          </div>
        </section>

        {/* SECTION 2: HOSPITALIDADE & EXPERIÊNCIA GASTRONÔMICA */}
        <section className="rounded-2xl bg-surface-container-low border border-outline-variant/15 p-5 sm:p-6 shadow-xl space-y-5 mb-8 lg:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <ChefHat className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-on-surface">
                  Hospitalidade & Cozinha Autoral
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Criações para compartilhar harmonizadas com coquetelaria contemporânea
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 text-tertiary text-xs font-bold uppercase tracking-wider">
              Tatuapé • SP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Gastronomia Card */}
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Cozinha & Petiscaria Fina
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Petiscos de boteco fino, carnes grelhadas e sobremesas contemporâneas preparadas artesanalmente sob comando do Chef Ale Caldas.
              </p>
              <Link
                href="/categorias"
                className="text-xs text-secondary hover:text-primary font-semibold flex items-center gap-1 pt-1"
              >
                <span>Explorar pratos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bar & Harmonização Card */}
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <GlassWater className="w-4 h-4 text-tertiary" />
                <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">
                  Bar & Adega de Altitude
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Chopp artesanal fresco nas torneiras, coquetéis autorais defumados e carta de vinhos harmonizados especialmente para cada prato.
              </p>
              <Link
                href="/categorias/drinks"
                className="text-xs text-secondary hover:text-primary font-semibold flex items-center gap-1 pt-1"
              >
                <span>Conferir bebidas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: GASTROBAR EXPERIENCE (HARMONIZAÇÕES DO DIA) */}
        <section className="space-y-4 mb-8 lg:mb-14">
          <div className="px-1">
            <span className="text-xs font-semibold text-tertiary tracking-widest uppercase block">
              Gastrobar Experience
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-on-surface">
              Harmonizações do Dia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Item 1: Coquetelaria */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between gap-4 shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                  <Wine className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-semibold text-on-surface truncate">
                    Smoked Negroni Empório
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-1">
                    Gin artesanal & fumaça de canela tostada
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-base font-bold text-primary block">
                  R$ 38
                </span>
                <span className="text-[10px] uppercase font-bold text-tertiary">
                  Coquetel
                </span>
              </div>
            </div>

            {/* Item 2: Chopp Artesanal */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between gap-4 shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
                  <Beer className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-semibold text-on-surface truncate">
                    IPA Tatuapé Fog (Pint)
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-1">
                    Lúpulos cítricos e amargor redondo
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-base font-bold text-primary block">
                  R$ 26
                </span>
                <span className="text-[10px] uppercase font-bold text-tertiary">
                  Chopp Local
                </span>
              </div>
            </div>

            {/* Item 3: Vinho Selecionado */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between gap-4 shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                  <Wine className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-semibold text-on-surface truncate">
                    Taça Syrah Mantiqueira
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-1">
                    Safra de inverno com especiarias
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-base font-bold text-primary block">
                  R$ 34
                </span>
                <span className="text-[10px] uppercase font-bold text-tertiary">
                  Taça 150ml
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: QUICK CATEGORIES PREVIEW */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-secondary-container/30 via-surface-container-low to-surface-container-high border border-primary/20 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Cardápio Completo
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-on-surface">
            Conheça Nossas 9 Categorias Gastronômicas
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg mx-auto">
            De petiscos para compartilhar a cortes grelhados, mixologia contemporânea e adega selecionada.
          </p>
          <div className="pt-2">
            <Link
              href="/categorias"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all active:scale-98 shadow-md"
            >
              <span>Ver Todas as Categorias</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
}
