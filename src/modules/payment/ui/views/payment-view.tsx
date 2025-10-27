'use client';

import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions
} from '@paypal/react-paypal-js';

import ContentTitle from '@/components/content-title';
import { env } from '@/env';

import PaymentFormSection from '../section/payment-form-section';
import { useLocale, useTranslations } from 'next-intl';

export default function PaymentView() {
  const t = useTranslations('Default');
  const locale = useLocale();
  console.log('locale', locale);

  const initialOptions: ReactPayPalScriptOptions = {
    clientId: env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons,card-fields',
    vault: false,
    locale: locale === 'en' ? 'en_US' : 'es_ES'
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="relative z-10 mx-auto max-w-[500px] px-4 pt-[40px] pb-[100px]">
        <ContentTitle
          title={t('Donate_us')}
          align="center"
          subtitle={t('Make_a_difference_today')}
          subtitleClassname="text-[30px]!"
        />
        <p className="text-muted-foreground pt-2 pb-5 text-center text-sm">
          {t('Your_generosity_changes_lives_of_other_children')}
        </p>

        <PaymentFormSection />
      </div>
    </PayPalScriptProvider>
  );
}
