'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { BsTwitterX } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

import { trpc } from '@/trpc/client';

import Logo from '../header/logo';
import { Button } from '../ui/button';
import { bottomLinks } from './footer-config';
import { useTranslations } from 'next-intl';
import useGetLocale from '@/hooks/use-get-locale';
import NavigationLink from '../navigation-link';

export default function FooterContent() {
  const pathname = usePathname();
  const t = useTranslations('Default');
  const { getLocalizedString } = useGetLocale();

  if (pathname.includes('/studio')) {
    return null;
  }

  const [footerData] = trpc.settings.getSettings.useSuspenseQuery();
  const [navData] = trpc.header.getHeader.useSuspenseQuery();

  return (
    <>
      <section className="bg-accent/30 pt-10 pb-10 md:pt-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <footer>
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid h-fit gap-2">
                <NavigationLink href="/" className="-ml-4 h-[100px] w-[190px]">
                  <Logo className="h-full w-full" />
                </NavigationLink>
                <ul className="mt-5">
                  <li className="flex gap-3">
                    {footerData?.socialMedia?.twitter && (
                      <Link
                        href={footerData?.socialMedia?.twitter}
                        target="_blank"
                      >
                        <BsTwitterX className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                      </Link>
                    )}
                    {footerData?.socialMedia?.instagram && (
                      <Link
                        href={footerData?.socialMedia?.instagram}
                        target="_blank"
                      >
                        <FiInstagram className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                      </Link>
                    )}
                    {footerData?.socialMedia?.facebook && (
                      <Link
                        href={footerData?.socialMedia?.facebook}
                        target="_blank"
                      >
                        <FiFacebook className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                      </Link>
                    )}
                  </li>
                </ul>
              </div>

              {/* address, phone, email */}
              <div>
                <h3 className="mb-4 font-bold">{t('Contacts')}</h3>
                <div className="grid space-y-2">
                  <p className="font-medium">{footerData?.contact?.address}</p>
                  <a
                    href={`tel:${footerData?.contact?.phone}`}
                    className="hover:text-primary font-medium"
                    aria-label={`Call us at ${footerData?.contact?.phone}`}
                  >
                    {t('Phone')}: {footerData?.contact?.phone}
                  </a>
                  <a
                    href={`mailto:${footerData?.contact?.email}`}
                    className="hover:text-primary font-medium"
                  >
                    {t('Email')}: {footerData?.contact?.email}
                  </a>
                </div>
              </div>

              {/* navigations links */}
              <div>
                <h3 className="mb-4 font-bold">{t('Links')}</h3>
                <ul className="space-y-2">
                  {navData.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium hover:font-semibold"
                    >
                      <NavigationLink href={link.link!}>
                        {getLocalizedString(link.name ?? [])}
                      </NavigationLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">{t('Donate')}</h3>
                <div className="space-y-4">
                  <p className="font-medium">
                    {t('Help_Us_Change_the_Lives_of_Children_in_World')}
                  </p>
                  <NavigationLink href={'/payment'}>
                    <Button className="hover:bg-accent-foreground h-[50px] w-[150px] rounded-full text-base">
                      {t('Donate_us')} <ArrowUpRight />
                    </Button>
                  </NavigationLink>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
              <p>
                © {new Date().getFullYear()}{' '}
                {t('Anepal_Organization_All_rights_reserved')}
              </p>
              <ul className="flex gap-4">
                {bottomLinks.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary underline">
                    <NavigationLink
                      href={link.url}
                      className="first-letter:capitalize"
                    >
                      {t(link.text)}
                    </NavigationLink>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
