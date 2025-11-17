import React from 'react';
import Image from 'next/image';
import { cn, LocalisedDataType } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';
import { motion } from 'motion/react';
import NavigationLink from '@/components/navigation-link';
import { ChevronRight } from 'lucide-react';

interface Props {
  variant: 'blue' | 'green' | 'yellow' | 'pink';
  title?: LocalisedDataType[] | null;
  className?: string;
  parentLink: string;
  parentName: string;
}

export default function BlogDetailsHeroSection({
  variant,
  title,
  className,
  parentLink,
  parentName
}: Props) {
  const { getLocalizedString } = useGetLocale();
  const convertedText = getLocalizedString(title ?? []);
  return (
    <div
      className={cn(
        'relative h-[350px] w-full overflow-hidden bg-[#E9FEFC]/50',
        {
          'bg-[#E9FEFC]/50': variant === 'blue',
          'bg-[#FFEDEF]/50': variant === 'pink'
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
            width={600}
            height={400}
          />
        </motion.div>
      )}
      {variant === 'pink' && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -bottom-[130px] left-0 z-0"
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
              href={parentLink}
              className="text-muted-foreground text-sm"
            >
              {parentName}
            </NavigationLink>
            <ChevronRight className="text-muted-foreground size-3" />
            <p className="text-muted-foreground text-sm">{convertedText}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
