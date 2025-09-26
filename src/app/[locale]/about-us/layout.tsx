import { generateAlternates, generateFullPath } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'About Us',
    description:
      'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
    alternates: generateAlternates('/about-us', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'About Us',
      description:
        'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
      url: generateFullPath('/about-us', locale),
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
    }
  };
}

// export const metadata: Metadata = {
//   title: 'About Us',
//   description:
//     'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
//   alternates: {
//     canonical: `${getClientUrl()}/about-us`,
//     languages: {
//       'en-US': '/en',
//       'es-ES': '/es'
//     }
//   },
//   openGraph: {
//     type: 'website',
//     siteName: 'Anepal Foundation',
//     title: 'About Us',
//     description:
//       'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
//     url: `${getClientUrl()}/about-us`,
//     images: [
//       {
//         url: '/assets/logo.png',
//         width: 800,
//         height: 450,
//         alt: 'Anepal Foundation - Empowering Communities in Nepal',
//         type: 'image/png'
//       },
//       {
//         url: '/assets/logo-transparent.png',
//         width: 800,
//         height: 450,
//         alt: 'Anepal Foundation Logo',
//         type: 'image/png'
//       }
//     ]
//   }
// };

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
