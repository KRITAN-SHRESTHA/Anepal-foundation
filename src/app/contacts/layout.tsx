import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Anepal Foundation. We'd love to hear from you and discuss how we can work together.",
  openGraph: {
    title: 'Contact Us',
    description:
      "Get in touch with Anepal Foundation. We'd love to hear from you and discuss how we can work together."
    // images: ['/assets/logo.png']
  }
};

export default function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
