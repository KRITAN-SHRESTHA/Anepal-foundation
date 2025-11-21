'use client';

import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';
import { useLocale, useTranslations } from 'next-intl';
import { env } from '@/env';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import ContainerLayout from '@/components/container-layout';
import PaymentFormSection from '../section/payment-form-section';
import HeroSectionThree from '@/components/hero-section-three';
import { motion } from 'motion/react';

export default function PaymentView() {
  const t = useTranslations('Default');
  const locale = useLocale();

  const initialOptions: ReactPayPalScriptOptions = {
    clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,card-fields',
    vault: false,
    locale: locale === 'en' ? 'en_US' : 'es_ES'
  };

  return (
    <div className="bg-white">
      <PayPalScriptProvider options={initialOptions}>
        <HeroSectionThree variant="blue" title={'Donate us'} />
        <ContainerLayout className="max-w-xl py-20">
          <div>
            <div className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <EnhancedBadge
                  text={t('Make_a_difference_today')}
                  variant="pink"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                <EnhancedTitle text={t('Donate_us')} />
              </motion.div>
              <motion.p
                className="text-muted-foreground text-center text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                {t('Your_generosity_changes_lives_of_other_children')}
              </motion.p>
            </div>

            <PaymentFormSection />
          </div>
        </ContainerLayout>
      </PayPalScriptProvider>
    </div>
  );
}
