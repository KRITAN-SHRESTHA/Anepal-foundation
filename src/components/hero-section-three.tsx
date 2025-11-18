import { ChevronRight } from 'lucide-react';
import React from 'react';
import NavigationLink from './navigation-link';
import EnhancedTitle from './enhanced-title';
import Image from 'next/image';
import { cn, LocalisedDataType } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';
import { motion } from 'motion/react';

interface Props {
  variant: 'blue' | 'pink' | 'skyblue' | 'gradient';
  title?: LocalisedDataType[] | null | string;
  className?: string;
}

export default function HeroSectionThree({ variant, title, className }: Props) {
  const { getLocalizedString } = useGetLocale();
  const convertedText =
    typeof title === 'string' ? title : getLocalizedString(title ?? []);
  return (
    <div
      className={cn(
        'relative h-[450px] w-full overflow-hidden',
        {
          'bg-[#E9FEFC]/50': variant === 'blue',
          'bg-[#FFEDEF]/50': variant === 'pink',
          'bg-[#F0DD8F]/50': variant === 'gradient',
          'bg-[#EBF7FF]/50': variant === 'skyblue'
        },
        className
      )}
    >
      {variant === 'blue' && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -right-[170px] -bottom-[160px] z-0"
        >
          <Image
            src={'/assets/background/donor-bg-img.png'}
            alt=""
            width={700}
            height={500}
          />
        </motion.div>
      )}
      {variant === 'gradient' && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 bottom-0 z-0"
        >
          <Image
            src={'/assets/background/contact-bg-img.png'}
            alt=""
            width={700}
            height={500}
          />
        </motion.div>
      )}
      {variant === 'skyblue' && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 bottom-0 z-0"
        >
          <Image
            src={'/assets/background/about-bg-img.png'}
            alt=""
            width={700}
            height={500}
          />
        </motion.div>
      )}
      {variant === 'pink' && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -bottom-[0px] -left-[0px] z-0"
        >
          <Image
            src={'/assets/background/blog-bg-img.png'}
            alt=""
            width={600}
            height={400}
          />
        </motion.div>
      )}

      <div className="relative z-5 flex h-full items-center justify-center">
        <div className="grid place-items-center">
          {title ? (
            <EnhancedTitle
              text={title}
              className="text-center text-6xl uppercase lg:text-7xl"
            />
          ) : null}
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
            <p className="text-muted-foreground text-sm capitalize">
              {convertedText}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
