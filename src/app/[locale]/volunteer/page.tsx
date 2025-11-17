import { getClientUrl } from '@/lib/utils';
import VolunteerView from '@/modules/volunteer/ui/views/volunteer-view';
import { HydrateClient } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Become a Volunteer | Anepal Foundation',
  description:
    'Join us in making a difference in the lives of children and families across Nepal. Volunteer with Anepal Foundation and create lasting change in communities that need it most.',
  keywords: [
    'volunteer Nepal',
    'charity volunteer',
    'volunteer opportunities',
    'help children Nepal',
    'community service'
  ]
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function VolunteerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
        name: 'Become a Volunteer',
        item: `${baseUrl}/${locale}/volunteer`
      }
    ]
  };

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VolunteerView />
    </HydrateClient>
  );
}
