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
  metadataBase: new URL(getMetadataBase()),
  title: {
    default: 'Anepal Foundation',
    template: '%s | Anepal Foundation'
  },
  description:
    'Anepal Foundation is dedicated to empowering communities and creating positive change through sustainable development initiatives.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/favicon-for-app/icon0.svg', type: 'image/svg+xml' }
    ],
    apple: {
      url: '/assets/favicon-for-app/apple-icon.png',
      sizes: '180x180',
      type: 'image/png'
    },
    shortcut: '/favicon.ico'
  },
  keywords: [
    'Nepal',
    'NGO',
    'foundation',
    'charity',
    'community development',
    'social impact',
    'humanitarian aid'
  ],
  authors: [{ name: 'Anepal Foundation' }],
  creator: 'Anepal Foundation',
  publisher: 'Anepal Foundation',
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Anepal Foundation',
    description:
      'Empowering communities and creating positive change through sustainable development initiatives.',
    images: [
      {
        url: '/assets/logo.png', // Updated path
        width: 1200,
        height: 630,
        alt: 'Anepal Foundation'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anepal Foundation',
    description:
      'Empowering communities and creating positive change through sustainable development initiatives.',
    images: ['/assets/logo.png'] // Updated path
  },
  manifest: '/manifest.json'
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
