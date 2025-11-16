import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function EnhancedTitle({
  text,
  className
}: {
  text?: string | null;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={cn(
        'relative mb-6 text-4xl leading-[1.1] font-extrabold text-gray-900 md:text-5xl lg:text-6xl',
        className
      )}
    >
      {text}
    </motion.h2>
  );
}
