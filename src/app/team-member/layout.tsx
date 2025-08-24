import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
  openGraph: {
    title: 'Our Team',
    description:
      'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.'
    // images: ['/assets/logo.png']
  }
};

export default function TeamMemberLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
