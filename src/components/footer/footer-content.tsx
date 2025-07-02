'use client';

import Link from 'next/link';
import { ArrowUpRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { trpc } from '@/trpc/client';

import Logo from '../header/logo';
import { Button } from '../ui/button';
import { bottomLinks, linksList } from './footer-config';
import Image from 'next/image';

export default function FooterContent() {
  const pathname = usePathname();

  if (pathname.includes('/studio')) {
    return null;
  }

  const [footerData] = trpc.settings.getSettings.useSuspenseQuery();

  return (
    <>
      <div className="relative h-[180px] w-full">
        <Image
          className="w-full object-contain"
          src={'/assets/bottom-bg.png'}
          alt=""
          quality={100}
          fill
        />
      </div>

      <section className="bg-accent pt-10 pb-10 md:pt-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <footer>
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid h-fit gap-2">
                <Link href="/" className="-ml-4 h-[80px] w-[150px]">
                  <Logo className="h-full w-full" />
                </Link>
                <ul className="">
                  <li className="flex gap-3">
                    {footerData?.socialMedia?.twitter && (
                      <Link href="#" target="_blank">
                        <Twitter className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                      </Link>
                    )}
                    {footerData?.socialMedia?.instagram && (
                      <Link href="#" target="_blank">
                        <Instagram className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                      </Link>
                    )}
                    {footerData?.socialMedia?.facebook && (
                      <Link href="#" target="_blank">
                        <Facebook className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                      </Link>
                    )}
                  </li>
                </ul>
              </div>

              {/* address, phone, email */}
              <div>
                <h3 className="mb-4 font-bold">Contacts</h3>
                <div className="text-muted-foreground grid space-y-2">
                  <p className="hover:text-primary font-medium">
                    {footerData?.contact?.address}
                  </p>
                  <a
                    href={`tel:${footerData?.contact?.phone}`}
                    className="hover:text-primary font-medium"
                    aria-label={`Call us at ${footerData?.contact?.phone}`}
                  >
                    Phone: {footerData?.contact?.phone}
                  </a>
                  <a
                    href={`mailto:${footerData?.contact?.email}`}
                    className="hover:text-primary font-medium"
                  >
                    Email: {footerData?.contact?.email}
                  </a>
                </div>
              </div>

              {/* navigations links */}
              <div>
                <h3 className="mb-4 font-bold">Links</h3>
                <ul className="text-muted-foreground space-y-2">
                  {linksList.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">Donate</h3>
                <div className="text-muted-foreground space-y-4">
                  <p className="hover:text-primary font-medium">
                    Help Us Change the Lives of Children in World
                  </p>
                  <Link href={'/payment'}>
                    <Button className="h-[50px] w-[150px] rounded-full bg-purple-700 text-base hover:bg-purple-900">
                      Donate us <ArrowUpRight />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-muted-foreground mt-12 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
              <p>
                © {new Date().getFullYear()} Anepal Organization. All rights
                reserved.
              </p>
              <ul className="flex gap-4">
                {bottomLinks.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary underline">
                    <Link href={link.url}>{link.text}</Link>
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
