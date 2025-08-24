import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support our cause by making a donation to Anepal Foundation. Every contribution makes a difference.',
  openGraph: {
    title: 'Donate',
    description:
      'Support our cause by making a donation to Anepal Foundation. Every contribution makes a difference.'
    // images: ['/assets/logo.png']
  }
};

export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
