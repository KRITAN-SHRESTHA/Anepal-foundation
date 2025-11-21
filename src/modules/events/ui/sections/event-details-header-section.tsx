import CustomImage from '@/components/custom-image';
import useGetLocale from '@/hooks/use-get-locale';
import { Events } from '@/sanity/types';
import { motion } from 'motion/react';

export default function EventDetailsHeaderSection({ data }: { data: Events }) {
  const { getLocalizedString } = useGetLocale();

  return (
    <div>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <motion.h1
          className="max-w-3xl text-[40px] font-semibold text-pretty capitalize md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {getLocalizedString(data.title ?? [])}
        </motion.h1>
        <motion.h3
          className="text-muted-foreground max-w-3xl text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          {getLocalizedString(data.short_description ?? [])}
        </motion.h3>
      </div>
      <motion.div
        className="relative my-12 aspect-video shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {data.mainImage && (
          <CustomImage
            src={data.mainImage}
            alt={`${getLocalizedString(data.title ?? [])}-img`}
            sizes="100vw"
            fill
            className="h-full w-full rounded-lg border object-cover mix-blend-multiply"
            quality={100}
          />
        )}
      </motion.div>
    </div>
  );
}
