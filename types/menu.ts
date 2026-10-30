export interface PairingOption {
  id: string;
  name: string;
  detail: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  categorySlug: string;
  price: number;
  promoPrice?: number;
  description: string;
  image: string;
  portion?: string;
  badges?: string[];
  tags?: string[];
  pairings?: PairingOption[];
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  group: 'Cozinha & Petiscaria' | 'Carta de Bebidas & Balcão';
  badge?: string;
  subtitle?: string;
  description: string;
  image?: string;
  iconName?: string;
}
