import { formatDateByCountry } from '@/lib/date-format';
import { Events } from '@/sanity/types';
import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function EventsDetailsFooterSection({ data }: { data: Events }) {
  const t = useTranslations('Default');
  return (
    <div className="xs:grid-cols-2 mt-13 grid grid-cols-1 gap-7 md:grid-cols-3">
      <motion.div
        className="bg-[#32C876] p-7 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <h4 className="text-xl font-bold">{t('Details')}</h4>
        <p className="mt-4">
          <b>{t('Start')}:</b>{' '}
          {formatDateByCountry(data.event_time?.start as string)}
        </p>
        <p>
          <b>{t('Finish')}:</b>{' '}
          {formatDateByCountry(data.event_time?.end as string)}
        </p>
      </motion.div>
      <motion.div
        className="bg-[#F76588] p-7 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h4 className="text-xl font-bold">{t('Organizer')}</h4>
        <p className="mt-4">
          <b>{t('Phone')}:</b> {data.organizer_info?.phone}
        </p>
        <p>
          <b>{t('Email')}:</b> {data.organizer_info?.email}
        </p>
      </motion.div>
      <motion.div
        className="bg-[#49C2DF] p-7 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <h4 className="text-xl font-bold">{t('Venue')}</h4>
        <p className="mt-4">
          <b>{t('Location')}:</b> {data.venue?.location}
        </p>
      </motion.div>
    </div>
  );
}
