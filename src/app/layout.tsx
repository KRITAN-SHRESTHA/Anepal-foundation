import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from '@/trpc/client';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import {
  Geist,
  Geist_Mono,
  Quicksand,
  Permanent_Marker
} from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});
const permanentMarker = Permanent_Marker({
  variable: '--font-permanent-marker',
  subsets: ['latin'],
  weight: '400'
});

const quickSand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const getMetadataBase = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return 'https://anepal-foundation.vercel.app';
};

export const metadata: Metadata = {
  // Base URL for all relative URLs in metadata
  metadataBase: new URL(getMetadataBase()), // Dynamically set based on environment

  // Title Configuration
  title: {
    default: 'Anepal Foundation', // Default title for home page
    template: '%s | Anepal Foundation' // Pattern for other pages, %s is replaced with page title
  },
  // Main site description used by search engines
  description:
    'Anepal Foundation is dedicated to empowering communities and creating positive change through sustainable development initiatives.',
  // Icons Configuration
  icons: {
    // Multiple icon formats for different browsers/devices
    icon: [
      { url: '/favicon.ico' }, // Basic favicon for all browsers
      { url: '/assets/favicon-for-app/icon0.svg', type: 'image/svg+xml' } // SVG for modern browsers
    ],
    apple: {
      url: '/assets/favicon-for-app/apple-icon.png', // Icon for iOS devices
      sizes: '180x180',
      type: 'image/png'
    },
    shortcut: '/favicon.ico' // Legacy shortcut icon support
  },
  // SEO Keywords
  keywords: [
    'Nepal',
    'NGO',
    'foundation',
    'charity',
    'community development',
    'social impact',
    'humanitarian aid'
  ],
  // Content Authorship
  authors: [{ name: 'Anepal Foundation' }],
  creator: 'Anepal Foundation',
  publisher: 'Anepal Foundation',
  // OpenGraph Metadata (for social media sharing)
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Anepal Foundation',
    description:
      'Empowering communities and creating positive change through sustainable development initiatives.',
    url: '/',
    images: [
      {
        url: '/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Anepal Foundation'
      }
    ]
  },
  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image', // Large image card type
    title: 'Anepal Foundation',
    description:
      'Empowering communities and creating positive change through sustainable development initiatives.',
    images: ['/assets/logo.png'] // Updated path
  }
  // Web App Manifest
  // manifest: '/manifest.json' // For PWA support
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quickSand.variable} ${permanentMarker.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <TRPCProvider>
            <NextTopLoader color="#a6289f" />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </TRPCProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
