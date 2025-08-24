import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donors & Partners',
  description:
    'Meet our valuable donors and partners who help make our mission possible at Anepal Foundation.',
  openGraph: {
    title: 'Donors & Partners',
    description:
      'Meet our valuable donors and partners who help make our mission possible at Anepal Foundation.'
    // images: ['/assets/logo.png']
  }
};

export default function DonorsPartnersLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
