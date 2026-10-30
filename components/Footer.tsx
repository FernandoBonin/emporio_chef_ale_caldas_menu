'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RESTAURANT_INFO } from '@/data/menu';
import { Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="informacoes" className="mt-auto border-t border-outline-variant/15 bg-surface-container-low/60 backdrop-blur-md scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Desktop grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/30">
                <Image
                  src={RESTAURANT_INFO.logoUrl}
                  alt={RESTAURANT_INFO.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="40px"
                />
              </div>
              <span className="font-serif text-lg font-bold text-on-surface">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {RESTAURANT_INFO.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-tertiary font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Gastronomia Autoral no Tatuapé
            </span>
          </div>

          {/* Col 2: Horários */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-secondary" />
              Horário de Funcionamento
            </h4>
            <p className="text-xs text-on-surface font-medium">
              {RESTAURANT_INFO.hours}
            </p>
            <p className="text-xs text-on-surface-variant">
              Cozinha autoral e balcão de coquetelaria em operação.
            </p>
          </div>

          {/* Col 3: Localização & Salão */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-secondary" />
              Endereço & Salão
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>
            <p className="text-xs text-tertiary">
              Ambiente climatizado, acessibilidade e deck externo.
            </p>
          </div>

          {/* Col 4: Reservas & Informações */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-secondary" />
              Reservas & Contato
            </h4>
            <p className="text-xs text-on-surface-variant">
              Reservas de mesas e eventos especiais sob consulta com nosso maitre.
            </p>
            <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/15 space-y-1">
              <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                Atendimento Presencial
              </span>
              <p className="text-xs text-primary font-semibold">
                Tatuapé, São Paulo • SP
              </p>
              <p className="text-[11px] text-on-surface-variant">
                Cardápio digital para consulta exclusiva no salão.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-outline uppercase tracking-wider">
            © {new Date().getFullYear()} {RESTAURANT_INFO.name} • Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/categorias" className="hover:text-primary transition-colors">
              Cardápio Completo
            </Link>
            <Link href="/destaques" className="hover:text-primary transition-colors">
              Destaques
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
