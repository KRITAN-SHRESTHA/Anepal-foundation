import { OnApproveData } from '@paypal/paypal-js';
import {
  PayPalCardFieldsProvider,
  PayPalCVVField,
  PayPalExpiryField,
  PayPalNameField,
  PayPalNumberField,
  usePayPalCardFields
} from '@paypal/react-paypal-js';
import { toast } from 'sonner';

import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { usePaymentAmountStore } from '../store/payment-amount-store';
import { useTranslations } from 'next-intl';

const INVALID_COLOR = {
  color: '#dc3545'
};

interface CardFormSectionProps {
  // isLoading: boolean;
  onCreateOrder: () => Promise<string>;
  onApproveOrder: (data: OnApproveData) => Promise<void>;
}

export default function CardFormSection({
  // isLoading,
  onApproveOrder,
  onCreateOrder
}: CardFormSectionProps) {
  const setIsPaying = usePaymentAmountStore(state => state.setIsPaying);
  const t = useTranslations('Default');

  return (
    <div className="pb-15">
      {/* paypal debit/credit form */}
      <PayPalCardFieldsProvider
        createOrder={onCreateOrder}
        onApprove={onApproveOrder}
        style={{
          input: {
            'font-size': '16px',
            'font-family': 'Quicksand, sans-serif',
            'font-weight': 'lighter',
            color: '#515266',
            padding: '12px 16px'
          },
          '.invalid': { color: 'purple' }
        }}
        onError={err => {
          setIsPaying(false);
          // global error handler for payment
          console.error('err PayPalCardFieldsProvider', err);
          toast.error('Something went wrong, try again!');
        }}
      >
        <div>
          <Label className="gap-0.5 pl-[0.375rem]">
            {t('Cardholder_name')}
          </Label>
          <PayPalNameField />
        </div>

        <div>
          <Label className="gap-0.5 pl-[0.375rem]">
            {t('Card_number')}
            <span style={INVALID_COLOR}>*</span>
          </Label>
          <PayPalNumberField />
        </div>

        <div className="flex">
          <div className="w-1/2">
            <Label className="gap-0.5 pl-[0.375rem]">
              {t('Expiry_date')}
              <span style={INVALID_COLOR}>*</span>
            </Label>
            <PayPalExpiryField />
          </div>
          <div className="w-1/2">
            <Label className="gap-0.5 pl-[0.375rem]">
              CVV<span style={INVALID_COLOR}>*</span>
            </Label>
            <PayPalCVVField />
          </div>
        </div>

        <SubmitPayment />
      </PayPalCardFieldsProvider>
    </div>
  );
}

const SubmitPayment = () => {
  const { cardFieldsForm } = usePayPalCardFields();
  const amount = usePaymentAmountStore(state => state.amount);
  const setAmountError = usePaymentAmountStore(state => state.setAmountError);
  const isPaying = usePaymentAmountStore(state => state.isPaying);
  const t = useTranslations('Default');

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        'Unable to find any child components in the <PayPalCardFieldsProvider />';

      throw new Error(childErrorMessage);
    }

    if (!amount) {
      setAmountError('Please enter amount');
      return;
    }
    setAmountError(null);
    cardFieldsForm.submit().catch(() => {});
  };

  return (
    <div className="p-1.5">
      <Button
        className="from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/20 relative h-11 w-full overflow-hidden rounded-xs bg-gradient-to-r px-6 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl lg:h-12 lg:px-8"
        onClick={handleClick}
        disabled={isPaying}
      >
        {isPaying ? <Loader /> : t('Donate')}
      </Button>
    </div>
  );
};
