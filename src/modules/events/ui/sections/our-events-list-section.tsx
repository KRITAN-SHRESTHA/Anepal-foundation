import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Clock4, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function OurEventsListSection() {
  return (
    <div className="m-auto max-w-5xl px-4 pt-[100px] pb-32 sm:px-6 lg:px-8">
      <div className="grid gap-12">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="xs:grid hidden h-fit w-full max-w-[100px] bg-purple-700 px-[10px] py-[20px] shadow-sm">
              <b className="text-center text-[50px] leading-[100%] font-bold text-white">
                27
              </b>
              <span className="text-center font-medium text-white">
                Mar, 20
              </span>
            </div>
            <Card className="flex items-center gap-x-0 gap-y-8 overflow-hidden rounded-none border-none shadow-xl md:flex-row">
              <div className="w-full pr-6 pl-6 md:pr-0">
                {/* <div className="relative aspect-video w-full overflow-hidden pl-6 md:h-[200px] md:max-w-[300px]"> */}
                <div className="relative aspect-video md:h-[230px] md:w-[300px]">
                  <Link
                    href={'/'}
                    // target="_blank"
                    className="fade-in h-full w-full transition-opacity duration-200 hover:opacity-70"
                  >
                    <Image
                      src={'/assets/main-slider/23.jpg'}
                      alt={''}
                      className="h-full w-full object-cover"
                      fill
                    />
                  </Link>
                </div>
              </div>
              <div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    The Culture of India. Rebirth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4">
                    Minnow snoek icefish velvet-belly shark, California halibut
                    round stingray northern sea robin. Southern grayling
                    trout-perch. Nam interdum quam sed elit congue hendrerit.
                    Aenean eleifend vit. Minnow snoek icefish velvet-belly
                    shark, California halibut round stingray northern sea robin.
                    Southern grayling trout-perch. Nam interdum quam sed elit
                    congue hendrerit. Aenean eleifend vit
                  </p>
                </CardContent>
                <CardFooter className="mt-4 grid">
                  <div className="flex items-center gap-3">
                    <Clock4 className="size-4" />{' '}
                    <p> September 30, 10:00 AM - October 31, 18:00 PM</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="size-4" />{' '}
                    <p>Dark Spurt, San Francisco, CA 94528, USA</p>
                  </div>
                </CardFooter>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
