import { getClientUrl } from '@/lib/utils';
import ContactView from '@/modules/contacts/ui/views/contact-view';
import { urlFor } from '@/sanity/lib/image';
import { serverClient } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = getClientUrl();
  const settingsData = await serverClient.settings.getSettings();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Anepal Foundation',
    alternateName: 'Anepal',
    url: baseUrl,
    logo: settingsData.foundation_logo
      ? urlFor(settingsData.foundation_logo).quality(100).url()
      : `${baseUrl}/assets/logo.jpeg`,
    description:
      'Leading NGO for community development, sustainable development, education, and humanitarian initiatives in Nepal.',
    // address: {
    //   '@type': 'PostalAddress',
    //   addressCountry: 'NP',
    //   addressRegion: 'Kathmandu',
    //   addressLocality: 'Nepal'
    // },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['English', 'Spanish']
      }
    ]
    // sameAs: [
    //   'https://www.facebook.com/anepalfoundation',
    //   'https://twitter.com/anepalfoundation',
    //   'https://www.instagram.com/anepalfoundation',
    //   'https://www.linkedin.com/company/anepalfoundation'
    // ],
    // areaServed: {
    //   '@type': 'Country',
    //   name: 'Nepal'
    // }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      <ContactView />
    </div>
  );
}
