'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import { getProductBySlug, PRODUCTS } from '@/data/menu';
import {
  Star,
  Users,
  Wine,
  ArrowLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { slug } = use(params);

  // Find product by slug or default to first product
  const product = getProductBySlug(slug) || PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header pageTitle="Detalhe Do Prato" showBackButton />

      <main className="flex-1 w-full pt-16 lg:pt-24 pb-28 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb on Desktop */}
        <nav className="hidden lg:flex items-center gap-2 text-xs text-on-surface-variant mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/categorias" className="hover:text-primary transition-colors">
            Cardápio
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/categorias/${product.categorySlug}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.categorySlug.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-semibold">{product.name}</span>
        </nav>

        {/* Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao cardápio</span>
          </button>

          <Link
            href={`/categorias/${product.categorySlug}`}
            className="text-xs text-secondary hover:text-primary transition-colors capitalize font-semibold"
          >
            Ver mais em {product.categorySlug.replace(/-/g, ' ')}
          </Link>
        </div>

        {/* 2-Column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Food Photography & Badges */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low border border-outline-variant/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>

              {/* Destaque badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-surface-dim/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-secondary border border-secondary/20 shadow-lg">
                <Star className="w-4 h-4 fill-secondary" />
                <span className="text-xs tracking-wider uppercase text-on-surface font-bold">
                  Destaque da Casa
                </span>
              </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary-container/40 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-secondary/20">
                Receita Autoral
              </span>
              <span className="bg-surface-container-high text-on-surface-variant text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                Para Compartilhar
              </span>
              <span className="bg-surface-container-high text-on-surface-variant text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{product.portion || 'Serve 2 a 3'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Title, Price, Description, & Sommelier Pairings */}
          <div className="lg:col-span-6 space-y-6">
            {/* Title & Price */}
            <div className="flex items-start justify-between gap-4 border-b border-outline-variant/15 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-tertiary tracking-widest block">
                  Cozinha Autoral • Chef Ale Caldas
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-2xl sm:text-3xl text-primary font-bold block">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-[11px] text-outline uppercase tracking-wider">
                  Valor no cardápio
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Harmonização do Sommelier (Editorial Recommendation) */}
            {product.pairings && product.pairings.length > 0 && (
              <div className="bg-surface-container-low rounded-xl p-4 sm:p-5 border border-outline-variant/15 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <Wine className="w-5 h-5 text-tertiary" />
                  <h2 className="font-serif text-base sm:text-lg text-tertiary font-semibold">
                    Harmonização Sugerida pelo Sommelier
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {product.pairings.map((pairing) => (
                    <div
                      key={pairing.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-outline-variant/10"
                    >
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-xs sm:text-sm font-semibold text-on-surface truncate">
                          {pairing.name}
                        </span>
                        <span className="text-[11px] text-on-surface-variant line-clamp-1">
                          {pairing.detail}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-secondary shrink-0">
                        R$ {pairing.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Informação do Salão & Exploração */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                  Consulta Digital de Cardápio
                </span>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Prato servido fresco na cozinha sob pedido com nossa equipe de salão.
                </p>
              </div>

              <Link
                href="/categorias"
                className="w-full sm:w-auto h-11 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0 shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Mais Pratos</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
}
