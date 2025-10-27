import { Play } from 'lucide-react';
import Image from 'next/image';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { trpc } from '@/trpc/client';

export default function VideoSection() {
  const data = trpc.settings.getSettings.useSuspenseQuery();

  if (!data[0]?.socialMedia?.youtube) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="absolute bottom-0 left-0 z-40">
          <div className="group relative flex h-[130px] w-[230px] cursor-pointer items-center justify-center overflow-hidden bg-purple-400">
            <Image
              src={'/assets/brother_sister.jpg'}
              fill
              alt=""
              className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
            />
            {/* Ripple effects */}
            <div className="absolute inset-0 top-1/2 left-1/2 z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div
                className="absolute h-full w-full animate-ping rounded-full bg-yellow-400/40"
                style={{ animationDuration: '5s' }}
              />
            </div>
            {/* Main button */}
            <button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-white text-white" />
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[800px]! overflow-y-auto border-none bg-transparent p-10 [&_svg:not([class*='size-'])]:size-7 [&_svg:not([class*='size-'])]:text-white">
        <iframe
          className="aspect-video w-full"
          width="420"
          height="345"
          src={data[0]?.socialMedia?.youtube}
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
