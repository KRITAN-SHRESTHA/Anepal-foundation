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

const INVALID_COLOR = {
  color: '#dc3545'
};

interface CardFormSectionProps {
  isLoading: boolean;
  onCreateOrder: () => Promise<string>;
  onApproveOrder: (data: OnApproveData) => Promise<void>;
}

export default function CardFormSection({
  isLoading,
  onApproveOrder,
  onCreateOrder
}: CardFormSectionProps) {
  return (
    <div className="pb-15">
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
          // global error handler for payment
          console.error('err PayPalCardFieldsProvider', err);
          toast.error('Something went wrong, try again!');
        }}
      >
        <Label className="gap-0.5 pl-[0.375rem]">Cardholder name</Label>
        <PayPalNameField />

        <div>
          <Label className="gap-0.5 pl-[0.375rem]">
            Card number<span style={INVALID_COLOR}>*</span>
          </Label>
          <PayPalNumberField />
        </div>

        <div className="flex">
          <div className="w-1/2">
            <Label className="gap-0.5 pl-[0.375rem]">
              Expiry date<span style={INVALID_COLOR}>*</span>
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

        <SubmitPayment isLoading={isLoading} />
      </PayPalCardFieldsProvider>
    </div>
  );
}

const SubmitPayment = ({ isLoading }: { isLoading: boolean }) => {
  const { cardFieldsForm } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        'Unable to find any child components in the <PayPalCardFieldsProvider />';

      throw new Error(childErrorMessage);
    }

    cardFieldsForm.submit().catch(() => {});
  };

  return (
    <Button
      variant={'outline'}
      className="group mt-3 h-[50px] w-full bg-purple-700 text-base text-white hover:bg-purple-900 hover:text-white"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : 'Donate'}
    </Button>
  );
};
