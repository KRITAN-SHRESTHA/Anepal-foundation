import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
  openGraph: {
    title: 'Blogs',
    description:
      'Stay updated with the latest news, stories, and insights from Anepal Foundation.'
    // images: ['/assets/background/blog_bg.png']
  }
};

export default function BlogsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
