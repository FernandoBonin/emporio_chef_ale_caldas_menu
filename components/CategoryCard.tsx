'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/menu';
import {
  ChevronRight,
  ArrowUpRight,
  UtensilsCrossed,
  Sandwich,
  Salad,
  Cake,
  Wine,
  Beer,
  Coffee,
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  layout?: 'featured' | 'compact' | 'bar';
}

export default function CategoryCard({
  category,
  layout = 'featured',
}: CategoryCardProps) {
  const getIcon = () => {
    switch (category.iconName) {
      case 'sandwich':
        return <Sandwich className="w-6 h-6" />;
      case 'salad':
        return <Salad className="w-6 h-6" />;
      case 'cake':
        return <Cake className="w-6 h-6" />;
      case 'wine':
      case 'wine-glass':
        return <Wine className="w-6 h-6" />;
      case 'beer':
        return <Beer className="w-6 h-6" />;
      case 'coffee':
        return <Coffee className="w-6 h-6" />;
      default:
        return <UtensilsCrossed className="w-6 h-6" />;
    }
  };

  // If category has an image and is featured layout
  if (category.image && layout === 'featured') {
    return (
      <Link
        href={`/categorias/${category.slug}`}
        className="group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/15 shadow-md hover:border-primary/40 active:scale-[0.99] transition-all flex flex-col sm:flex-row h-auto sm:h-36"
      >
        <div className="w-full sm:w-2/5 h-36 sm:h-full relative overflow-hidden shrink-0 bg-surface-container">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-surface-container-low"></div>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between gap-1">
              {category.badge && (
                <span className="text-[10px] text-secondary uppercase font-bold tracking-wider">
                  {category.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors shrink-0" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-on-surface truncate mt-0.5 group-hover:text-primary transition-colors">
              {category.title}
            </h4>
            <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-snug">
              {category.description}
            </p>
          </div>
          {category.subtitle && (
            <div className="flex items-center gap-2 text-tertiary text-xs mt-2 font-medium">
              <span>{category.subtitle}</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Bar & drinks 2x2 grid layout
  if (layout === 'bar') {
    return (
      <Link
        href={`/categorias/${category.slug}`}
        className="group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/15 p-4 flex flex-col justify-between shadow-md hover:border-primary/40 active:scale-[0.98] transition-all min-h-[148px]"
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
            {getIcon()}
          </div>
          <ArrowUpRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
        </div>
        <div className="mt-3">
          {category.badge && (
            <span className="text-[10px] text-secondary uppercase font-semibold block tracking-wider">
              {category.badge}
            </span>
          )}
          <h4 className="font-serif text-base font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
            {category.title}
          </h4>
          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-snug">
            {category.description}
          </p>
        </div>
      </Link>
    );
  }

  // Compact horizontal card (e.g. Sanduba & Burguer, Para Adoçar)
  return (
    <Link
      href={`/categorias/${category.slug}`}
      className="group relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/15 shadow-md hover:border-primary/40 active:scale-[0.99] transition-all p-4 flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
          {getIcon()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-base font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
              {category.title}
            </h4>
            {category.badge && (
              <span className="text-[10px] bg-surface-container-highest text-secondary px-1.5 py-0.5 rounded font-medium">
                {category.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
            {category.description}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors shrink-0" />
    </Link>
  );
}
