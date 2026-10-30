import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#141312',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Empório Chef Ale Caldas - Menu Digital',
  description: 'Cardápio digital premium e exclusivo do Empório Chef Ale Caldas no Tatuapé, São Paulo. Cozinha autoral, petiscaria fina e coquetelaria contemporânea.',
  openGraph: {
    title: 'Empório Chef Ale Caldas - Menu Digital',
    description: 'Cardápio digital premium e exclusivo do Empório Chef Ale Caldas no Tatuapé, São Paulo.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Empório Chef Ale Caldas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empório Chef Ale Caldas - Menu Digital',
    description: 'Cardápio digital premium e exclusivo do Empório Chef Ale Caldas no Tatuapé, São Paulo.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
