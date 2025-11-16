import React from 'react';
import { motion } from 'motion/react';
import { cn, LocalisedDataType } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';

export default function EnhancedTitle({
  text,
  className
}: {
  text?: LocalisedDataType[] | string | null;
  className?: string;
}) {
  const { getLocalizedString } = useGetLocale();
  const convertedText =
    typeof text === 'string' ? text : getLocalizedString(text ?? []);

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
      {convertedText}
    </motion.h2>
  );
}
