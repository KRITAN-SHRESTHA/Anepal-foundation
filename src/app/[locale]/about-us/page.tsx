import { getClientUrl } from '@/lib/utils';
import AboutView from '@/modules/about/ui/views/about-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  await Promise.all([
    trpc.aboutus.getAboutUs.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.teamMember.getAboutTeamMembers.prefetch()
  ]);

  const baseUrl = getClientUrl();
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${locale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: `${baseUrl}/${locale}/about-us`
      }
    ]
  };

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutView />
    </HydrateClient>
  );
}
