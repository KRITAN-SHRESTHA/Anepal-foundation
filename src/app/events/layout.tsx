import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Discover upcoming and past events organized by Anepal Foundation to support our community.',
  openGraph: {
    title: 'Events',
    description:
      'Discover upcoming and past events organized by Anepal Foundation to support our community.'
    // images: ['/assets/events_bg.png']
  }
};

export default function EventsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
