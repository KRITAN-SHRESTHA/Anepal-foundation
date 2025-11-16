import { Play, Video } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { trpc } from '@/trpc/client';

export default function VideoSection() {
  const data = trpc.settings.getSettings.useSuspenseQuery();

  if (!data[0]?.socialMedia?.youtube) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute right-4 bottom-4 z-40 lg:right-8 lg:bottom-12"
    >
      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative cursor-pointer"
          >
            {/* Main Card Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-500 lg:rounded-3xl">
              {/* Background Image */}
              <div className="relative h-32 w-56 lg:h-40 lg:w-72">
                <Image
                  src={'/assets/brother_sister.jpg'}
                  fill
                  alt="Watch our story"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="from-accent-foreground/30 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-between p-4 lg:p-5">
                {/* Left Content */}
                <div className="flex flex-col justify-end space-y-1">
                  <div className="flex items-center gap-2">
                    <Video className="size-4 text-white/90 lg:size-5" />
                    <span className="text-xs font-semibold tracking-wider text-white/90 uppercase lg:text-sm">
                      Watch Video
                    </span>
                  </div>
                  <p className="text-xs text-white/80 lg:text-sm">
                    See our impact
                  </p>
                </div>

                {/* Play Button */}
                <div className="relative flex items-center justify-center">
                  {/* Animated Ripple Rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="absolute size-16 rounded-full bg-white/30 lg:size-20"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5
                      }}
                      className="absolute size-16 rounded-full bg-white/20 lg:size-20"
                    />
                  </div>

                  {/* Main Play Button */}
                  <motion.div
                    // whileHover={{ scale: 1.1 }}
                    // transition={{ type: 'tween', stiffness: 300 }}
                    className="group-hover:bg-accent-foreground relative z-10 flex size-14 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 lg:size-16"
                  >
                    <Play className="ml-0.5 size-6 fill-gray-900 text-gray-900 transition-colors duration-300 group-hover:fill-white group-hover:text-white lg:size-7" />
                  </motion.div>
                </div>
              </div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>

            {/* Floating Label Badge (Optional) */}
            {/* <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="absolute -right-2 -top-2 rounded-full bg-accent-foreground px-3 py-1 text-xs font-bold text-white shadow-lg lg:-right-3 lg:-top-3 lg:px-4 lg:py-1.5 lg:text-sm"
            >
              NEW
            </motion.div> */}
          </motion.div>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="max-w-[95vw] border-none bg-black/95 p-4 backdrop-blur-xl sm:max-w-[90vw] lg:max-w-4xl lg:p-8 [&_svg:not([class*='size-'])]:size-7 [&_svg:not([class*='size-'])]:text-white">
          <div className="relative overflow-hidden rounded-lg lg:rounded-2xl">
            <iframe
              className="aspect-video w-full"
              width="100%"
              height="100%"
              src={data[0]?.socialMedia?.youtube}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
