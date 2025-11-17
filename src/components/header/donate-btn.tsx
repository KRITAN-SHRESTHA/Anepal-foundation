import { useTranslations } from 'next-intl';
import React from 'react';
import NavigationLink from '../navigation-link';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DonateBtn({ className }: { className?: string }) {
  const t = useTranslations('Default');
  return (
    <NavigationLink href={'/payment'}>
      <Button
        className={cn(
          'group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/20 relative h-11 w-full overflow-hidden rounded-xs bg-gradient-to-r px-6 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl lg:h-12 lg:px-8',
          className
        )}
      >
        {/* Animated background shine */}
        <motion.div
          animate={{
            x: [-200, 200]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <span className="relative flex items-center gap-2">
          <Heart className="size-4 fill-current" />
          {t('Donate_us')}
          <motion.div
            animate={{
              x: [0, 3, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <ArrowUpRight className="size-4" />
          </motion.div>
        </span>
      </Button>
    </NavigationLink>
  );
}
