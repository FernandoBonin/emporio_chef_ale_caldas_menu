'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RESTAURANT_INFO } from '@/data/menu';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

interface HeaderProps {
  pageTitle?: string;
  showBackButton?: boolean;
}

export default function Header({ pageTitle, showBackButton = false }: HeaderProps) {
  const pathname = usePathname();

  let title = pageTitle;
  if (!title) {
    if (pathname === '/') title = 'Início';
    else if (pathname.startsWith('/categorias/')) title = 'Cardápio';
    else if (pathname === '/categorias') title = 'Categorias';
    else if (pathname === '/destaques') title = 'Destaques';
    else if (pathname.startsWith('/prato/')) title = 'Detalhe Do Prato';
    else title = 'Cardápio Digital';
  }

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Categorias', href: '/categorias' },
    { label: 'Destaques', href: '/destaques' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pt-safe bg-surface/90 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 lg:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand / Title */}
          <div className="flex items-center gap-3 min-w-0">
            {showBackButton ? (
              <button
                onClick={() => window.history.back()}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:bg-surface-container-high transition-colors shrink-0"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link href="/" className="hidden lg:flex items-center gap-3 shrink-0 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/30 group-hover:border-primary transition-colors">
                  <Image
                    src={RESTAURANT_INFO.logoUrl}
                    alt={RESTAURANT_INFO.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    sizes="44px"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">
                    {RESTAURANT_INFO.location}
                  </span>
                  <span className="font-serif text-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                    {RESTAURANT_INFO.name}
                  </span>
                </div>
              </Link>
            )}

            {/* Mobile / Screen Title */}
            <div className="flex flex-col min-w-0 lg:hidden">
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary truncate">
                {RESTAURANT_INFO.location}
              </span>
              <h1 className="font-serif text-lg font-semibold text-on-surface truncate leading-tight">
                {title}
              </h1>
              <span className="text-xs text-on-surface-variant truncate">
                {RESTAURANT_INFO.name}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-surface-container-high text-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Location & Schedule info / Brand Emblem */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Hours / Location chip */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/15 text-xs text-on-surface-variant">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>Terça a Domingo • a partir das 18h</span>
            </div>

            {/* Profile Avatar / Emblem */}
            <Link
              href="/"
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-primary/40 hover:border-primary transition-all shrink-0"
              title={RESTAURANT_INFO.name}
            >
              <Image
                src={RESTAURANT_INFO.logoUrl}
                alt="Empório Chef Ale Caldas"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="36px"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
