import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
  openGraph: {
    title: 'About Us',
    description:
      'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.'
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
