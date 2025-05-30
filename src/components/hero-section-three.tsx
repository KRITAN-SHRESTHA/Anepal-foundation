import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
      <main className="bg-muted/50 overflow-hidden">
        <section>
          <div className="relative py-24">
            <div className="mx-auto max-w-5xl px-6">
              <div>
                <h1 className="mt-8 max-w-2xl text-5xl font-bold text-balance lg:text-6xl">
                  Build 10x Faster with Mist
                </h1>
                <p className="text-foreground my-6 max-w-2xl text-2xl text-balance">
                  Craft. Build. Ship Modern Websites With AI Support.
                </p>

                <div className="flex flex-col items-center gap-3 *:w-full sm:flex-row sm:*:w-fit">
                  <Button asChild size="lg">
                    <Link href="#link">
                      <span className="text-nowrap">Start Building</span>
                    </Link>
                  </Button>
                  <Button key={2} asChild size="lg" variant="outline">
                    <Link href="#link">
                      <span className="text-nowrap">Request a demo</span>
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-muted-foreground font-medium">
                  Trusted by teams at :
                </p>
                <div className="mt-4 flex items-center gap-12">
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                </div>
              </div>

              <div className="relative mt-16 -mr-56 sm:mr-0">
                <div className="bg-background relative mx-auto overflow-hidden rounded-(--radius) border border-transparent shadow-lg ring-1 shadow-black/10 ring-black/10">
                  <Image
                    src="/mist/tailark-2.png"
                    alt="app screen"
                    width="2880"
                    height="1842"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
