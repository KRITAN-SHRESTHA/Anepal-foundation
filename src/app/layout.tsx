import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { TRPCProvider } from '@/trpc/client';
import type { Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import {
  Geist,
  Geist_Mono,
  Permanent_Marker,
  Quicksand
} from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { getMetadataBase } from '@/lib/utils';
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

// Viewport settings for responsive design and accessibility
export const viewport: Viewport = {
  // Theme color for browser UI
  themeColor: '#a6289f',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover' // Better support for notched phones
};

export const metadata = {
  // Base URL for all relative URLs in metadata
  metadataBase: new URL(getMetadataBase()),

  // Canonical URL and Alternates with language support
  alternates: {
    canonical: '/'
    // languages: {
    //   'en-US': '/',
    //   'es-ES': '/es'
    // }
  },

  // Enhanced Title Configuration with keywords
  title: {
    default:
      'Anepal Foundation - Leading NGO for Community Development in Nepal',
    template: '%s | Anepal Foundation',
    absolute:
      'Anepal Foundation - Transforming Lives Through Sustainable Development in Nepal'
  },

  // Enhanced description with targeted keywords and call-to-action
  description:
    'Anepal Foundation leads impactful community development initiatives in Nepal. Our NGO focuses on sustainable development, education, and humanitarian aid. Join us in creating lasting change for Nepalese communities. Donate or volunteer today.',

  // Enhanced robots control for better SEO
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // App information and verification
  applicationName: 'Anepal Foundation',
  referrer: 'origin-when-cross-origin',
  // manifest: '/manifest.json',
  // themeColor: '#a6289f',
  // colorScheme: 'light dark',
  // Enhanced SEO Keywords for better targeting
  keywords: [
    'Nepal NGO',
    'Community Development Nepal',
    'Sustainable Development Nepal',
    'Humanitarian Aid Nepal',
    'Education Initiatives Nepal',
    'Social Impact Foundation Nepal',
    'Nepal Charity Organization',
    'Donate to Nepal',
    'Volunteer in Nepal',
    'Nepal Community Service',
    'Nepal Education Programs',
    'Nepal Social Development',
    'Kathmandu NGO',
    'Nepal Non-Profit Organization',
    'Support Nepal Communities',
    'Nepal Foundation',
    'Nepal Social Work',
    'Nepal Humanitarian Projects'
  ],
  category: 'non-profit',
  classification: 'NGO, Non-Profit, Humanitarian Aid',
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
  // Enhanced OpenGraph Metadata for better social sharing
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Anepal Foundation - Leading NGO for Community Development in Nepal',
    description:
      'Transform lives in Nepal through sustainable development, education, and humanitarian initiatives. Join Anepal Foundation in creating lasting change. Donate or volunteer today.',
    url: getMetadataBase(),
    locale: 'en_US',
    images: [
      {
        url: '/assets/logo-og.png',
        width: 1200,
        height: 630,
        alt: 'Anepal Foundation - Transforming Lives in Nepal'
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

  // other: {
  //   'facebook-domain-verification':
  //     process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION,
  //   'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // }
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
