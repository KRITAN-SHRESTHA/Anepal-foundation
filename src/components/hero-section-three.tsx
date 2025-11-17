import { ChevronRight } from 'lucide-react';
import React from 'react';
import NavigationLink from './navigation-link';
import EnhancedTitle from './enhanced-title';
import Image from 'next/image';
import { cn, LocalisedDataType } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';
import { motion } from 'motion/react';

interface Props {
  variant: 'blue' | 'green' | 'yellow';
  title?: LocalisedDataType[] | null;
  link: string;
}

export default function HeroSectionThree({ variant, link, title }: Props) {
  const { getLocalizedString } = useGetLocale();
  const convertedText = getLocalizedString(title ?? []);
  return (
    <div
      className={cn(
        'relative h-[350px] w-full overflow-hidden bg-[#E9FEFC]/50',
        {
          'bg-[#E9FEFC]/50': variant === 'blue'
        }
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute -right-[170px] -bottom-[160px] z-0"
      >
        <Image
          src={'/assets/background/donor-bg-img.png'}
          alt=""
          width={600}
          height={400}
        />
      </motion.div>
      <div className="relative z-5 flex h-full items-center justify-center">
        <div className="grid place-items-center">
          <EnhancedTitle
            text={title}
            className="text-center text-6xl lg:text-7xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex w-fit items-center justify-center gap-2 rounded-sm bg-white px-2.5 py-0.5 shadow-sm" //[#bbdff5]
          >
            <NavigationLink
              href={'/'}
              className="text-muted-foreground text-sm"
            >
              Home
            </NavigationLink>
            <ChevronRight className="text-muted-foreground size-3" />
            <NavigationLink
              href={link}
              className="text-muted-foreground text-sm"
            >
              {convertedText}
            </NavigationLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
