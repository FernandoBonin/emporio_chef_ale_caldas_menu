'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wine, UtensilsCrossed, Sparkles, Info } from 'lucide-react';

export default function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'inicio',
      label: 'Início',
      href: '/',
      icon: Wine,
      isActive: pathname === '/',
    },
    {
      id: 'categorias',
      label: 'Categorias',
      href: '/categorias',
      icon: UtensilsCrossed,
      isActive: pathname.startsWith('/categorias'),
    },
    {
      id: 'destaques',
      label: 'Destaques',
      href: '/destaques',
      icon: Sparkles,
      isActive: pathname === '/destaques',
    },
    {
      id: 'informacoes',
      label: 'Sobre',
      href: '#informacoes',
      icon: Info,
      isActive: false,
    },
  ];

  return (
    <nav
      aria-label="Navegação Principal Mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 min-w-[44px] min-h-[44px] transition-colors ${
                item.isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] tracking-wider uppercase font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
