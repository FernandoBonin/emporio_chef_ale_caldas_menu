"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/menu";
import {
  Utensils,
  Flame,
  Sparkles,
  Wine,
  Users,
  ArrowRight,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  layout?: "standard" | "carousel";
}

export default function ProductCard({
  product,
  layout = "standard",
}: ProductCardProps) {
  const getBadgeIcon = (badge: string) => {
    if (
      badge.toLowerCase().includes("pedido") ||
      badge.toLowerCase().includes("favorito")
    ) {
      return <Flame className="w-3.5 h-3.5" />;
    }
    if (
      badge.toLowerCase().includes("vinho") ||
      badge.toLowerCase().includes("sommelier")
    ) {
      return <Wine className="w-3.5 h-3.5" />;
    }
    if (
      badge.toLowerCase().includes("dividir") ||
      badge.toLowerCase().includes("compartilhar")
    ) {
      return <Users className="w-3.5 h-3.5" />;
    }
    return <Sparkles className="w-3.5 h-3.5" />;
  };

  const primaryBadge = product.badges?.[0];

  return (
    <article
      className={`group relative flex flex-col bg-surface-container-low border border-outline-variant/15 rounded-xl overflow-hidden shadow-md hover:border-primary/40 transition-all ${
        layout === "carousel"
          ? "snap-center shrink-0 w-[84vw] max-w-[320px] lg:w-full lg:max-w-none"
          : "w-full"
      }`}
    >
      {/* Clickable Image */}
      <Link
        href={`/prato/${product.slug}`}
        className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/30"></div>

        {/* Top-left Badge */}
        {primaryBadge && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface-container-lowest/85 backdrop-blur-md px-2.5 py-1 rounded-full text-secondary text-[11px] font-bold uppercase tracking-wider shadow">
            {getBadgeIcon(primaryBadge)}
            <span>{primaryBadge}</span>
          </div>
        )}

        {/* Price Tag overlay */}
        <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-outline-variant/20">
          <span className="font-serif text-base sm:text-lg font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <Link href={`/prato/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-on-surface hover:text-primary transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom bar with Portion & Ver Detalhes */}
        <div className="flex flex-col gap-2 items-center justify-between border-t border-outline-variant/10">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <Utensils className="w-3.5 h-3.5 text-tertiary shrink-0" />
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium truncate">
              {product.portion || "Porção autoral"}
            </span>
          </div>

          <Link
            href={`/prato/${product.slug}`}
            className="h-9 px-3.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-sm shrink-0"
            aria-label={`Ver detalhes de ${product.name}`}
          >
            <span>Ver Detalhes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
