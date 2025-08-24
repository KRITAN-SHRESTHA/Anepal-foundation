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
import { getMetadataBase } from '@/lib/utils';

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

export const metadata: Metadata = {
  // Base URL for all relative URLs in metadata
  metadataBase: new URL(getMetadataBase()),

  // Canonical URL and Alternates
  alternates: {
    canonical: '/'
    // languages: {
    //   'en': '/',
    //   'es': '/es'
    // },
  },

  // Enhanced Title Configuration
  title: {
    default: 'Anepal Foundation - Empowering Communities in Nepal',
    template: '%s | Anepal Foundation',
    absolute:
      'Anepal Foundation - NGO Supporting Sustainable Development in Nepal'
  },

  // Enhanced description with targeted keywords
  description:
    'Anepal Foundation is a non-profit organization dedicated to empowering communities in Nepal through sustainable development, education, and humanitarian initiatives. Join us in making a difference.',

  // Robots control
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Viewport settings for responsive design and accessibility
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover' // Better support for notched phones
  },

  // Theme color for browser UI
  themeColor: '#a6289f',

  // Verification tokens
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
  // },

  // App information
  applicationName: 'Anepal Foundation',
  referrer: 'origin-when-cross-origin',
  // SEO Keywords

  keywords: [
    'Nepal NGO',
    'Community Development Nepal',
    'Sustainable Development',
    'Humanitarian Aid Nepal',
    'Education Initiatives Nepal',
    'Social Impact Foundation',
    'Nepal Charity',
    'Nepal',
    'NGO',
    'foundation',
    'charity',
    'community development',
    'social impact',
    'humanitarian aid'
  ],
  category: 'non-profit',
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

  // Content Authorship
  authors: [{ name: 'Anepal Foundation' }],
  creator: 'Anepal Foundation',
  publisher: 'Anepal Foundation',
  // Enhanced OpenGraph Metadata
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Anepal Foundation - Empowering Communities in Nepal',
    description:
      'Join Anepal Foundation in our mission to create sustainable change through community development, education, and humanitarian initiatives in Nepal.',
    url: getMetadataBase(),
    // locale: 'en_US',
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 450,
        alt: 'Anepal Foundation - Empowering Communities in Nepal',
        type: 'image/png'
      },
      {
        url: '/assets/logo-transparent.png',
        width: 800,
        height: 450,
        alt: 'Anepal Foundation Logo',
        type: 'image/png'
      }
    ]
  },

  // Enhanced Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    site: '@anepalfoundation',
    creator: '@anepalfoundation',
    title: 'Anepal Foundation - Empowering Communities in Nepal',
    description:
      'Join Anepal Foundation in our mission to create sustainable change through community development, education, and humanitarian initiatives in Nepal.',
    images: {
      url: '/assets/logo.png',
      alt: 'Anepal Foundation - Empowering Communities in Nepal',
      width: 1200,
      height: 630,
      type: 'image/png'
    }
  }

  // Additional social media
  // other: {
  //   'facebook-domain-verification':
  //     process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
  // }
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
