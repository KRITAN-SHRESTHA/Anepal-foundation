import type { Metadata } from 'next';
// import { serverClient } from '@/trpc/server';
// import { urlFor } from '@/sanity/lib/image';

export const metadata: Metadata = {
  title: 'Stories',
  description:
    'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
  openGraph: {
    title: 'Stories',
    description:
      'Read inspiring stories of impact and transformation from our work at Anepal Foundation.'
  }
};
// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     // Fetch stories page content using server-side tRPC client
//     // const storiesData = await serverClient.stories.getStoriesPageContent();
//     // const heroImage = storiesData.heroSection?.backgroundImage
//     //   ? urlFor(storiesData.heroSection.backgroundImage).quality(100).url()
//     //   : '/assets/story/story-bg-img-1.png';

//     return {
//       title: 'Stories',
//       description:
//         'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
//       openGraph: {
//         title: 'Stories',
//         description:
//           'Read inspiring stories of impact and transformation from our work at Anepal Foundation.'
//         // images: [
//         //   {
//         //     url: heroImage,
//         //     width: 1200,
//         //     height: 630,
//         //     alt:
//         //       storiesData.heroSection?.backgroundImage?.alt ||
//         //       'Anepal Foundation Stories'
//         //   }
//         // ]
//       }
//     };
//   } catch {
//     // Fallback metadata if API call fails
//     return {
//       title: 'Stories',
//       description:
//         'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
//       openGraph: {
//         title: 'Stories',
//         description:
//           'Read inspiring stories of impact and transformation from our work at Anepal Foundation.'
//         // images: ['/assets/logo.png']
//       }
//     };
//   }
// }

export default function StoriesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
