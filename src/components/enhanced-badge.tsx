import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function EnhancedBadge({
  text,
  variant
}: {
  text?: string | null;
  variant: 'yellow' | 'green' | 'pink' | 'blue';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 inline-block"
    >
      <span
        className={cn(
          'relative inline-block bg-gradient-to-r px-2 py-1 text-sm font-bold tracking-widest text-gray-900 uppercase',
          {
            'bg-[#f0dd8f]': variant === 'yellow',
            'bg-[#bbdff5]': variant === 'green',
            'bg-[#f5bbbc]': variant === 'pink',
            'bg-[#d1cbe8]': variant === 'blue'
          }
        )}
      >
        {text}
      </span>
    </motion.div>
  );
}
