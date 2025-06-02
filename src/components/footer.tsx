import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowUpRight, Facebook, Instagram, Twitter } from 'lucide-react';

const linksList = [
  { text: 'Home', url: '#' },
  { text: 'About us', url: '#' },
  { text: 'Team members', url: '#' },
  { text: 'Gallery', url: '#' },
  { text: 'Contact', url: '#' },
  { text: 'Stories', url: '#' }
];

const bottomLinks = [
  { text: 'Terms and Conditions', url: '#' },
  { text: 'Privacy Policy', url: '#' }
];

export default function Footer() {
  return (
    <section className="pt-10 pb-10 md:pt-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <footer>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid h-fit gap-2">
              <Link href="/" className="-ml-4 h-[80px] w-[150px]">
                <Image
                  src="/assets/logo-transparent.png"
                  alt="logo-footer"
                  className="h-full w-full"
                  width={200}
                  height={100}
                />
              </Link>
              <ul className="">
                <li className="flex gap-3">
                  <Link href="#" target="_blank">
                    <Twitter className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                  </Link>
                  <Link href="#" target="_blank">
                    <Instagram className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                  </Link>
                  <Link href="#" target="_blank">
                    <Facebook className="stroke-muted-foreground h-5 w-5 hover:stroke-black" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* address, phone, email */}
            <div>
              <h3 className="mb-4 font-bold">Contacts</h3>
              <div className="text-muted-foreground space-y-2">
                <p className="hover:text-primary font-medium">
                  Carrer Pau Casals, 4 Entresuelo, 2ª, 08860 Casteldefels,
                  Barcelona
                </p>
                <a
                  href="tel:+34 676 452 011"
                  className="hover:text-primary font-medium"
                  aria-label="Call us at +34 676 452 011"
                >
                  Phone: +34 676 452 011
                </a>
                <p className="hover:text-primary font-medium">
                  Email: Cristinamartianepal@gmail.com
                </p>
              </div>
            </div>

            {/* navigations links */}
            <div>
              <h3 className="mb-4 font-bold">Links</h3>
              <ul className="text-muted-foreground space-y-2">
                {linksList.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary font-medium">
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
                <Button className="h-[50px] w-[150px] rounded-full bg-purple-700 text-base hover:bg-purple-900">
                  Donacion <ArrowUpRight />
                </Button>
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
  );
}
