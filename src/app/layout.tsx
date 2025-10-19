import {
  Geist,
  Geist_Mono,
  Permanent_Marker,
  Quicksand
} from 'next/font/google';

import RootLayoutPage from './root-layout';
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

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <RootLayoutPage>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quickSand.variable} ${permanentMarker.variable} antialiased`}
      >
        {children}
      </body>
    </RootLayoutPage>
  );
}
