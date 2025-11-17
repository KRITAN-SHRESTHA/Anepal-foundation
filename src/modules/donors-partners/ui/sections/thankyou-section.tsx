import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { motion } from 'motion/react';

export default function ThankyouSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();

  const { getLocalizedString, locale } = useGetLocale();

  if (!data?.thankYouSection) return null;

  return (
    <div className="py-[60px] md:py-[100px]">
      <motion.h3
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="tablet:text-[250px] xs:text-[150px] text-center text-[110px] leading-[85%] font-medium text-yellow-500 sm:text-[200px]"
      >
        {locale === 'en' ? (
          <>
            Thank <br /> You
          </>
        ) : (
          'Gracias'
        )}
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 sm:-mt-[60px] sm:ml-[calc(45%-130px)]"
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full max-w-[20ch] text-[32px] leading-[80%] font-extrabold sm:text-[40px]"
        >
          {getLocalizedString(data?.thankYouSection?.subtitle ?? [])}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-muted-foreground max-w-[60ch] pt-3 sm:text-xl"
        >
          {getLocalizedString(data?.thankYouSection?.description ?? [])}
        </motion.p>
      </motion.div>
    </div>
  );
}
