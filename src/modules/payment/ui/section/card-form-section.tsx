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
import { Input } from '@/components/ui/input';

import SelectAmountSection from './select-amount-section';
import { usePaymentAmountStore } from '../store/payment-amount-store';
import { cn } from '@/lib/utils';

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
  const selectOtherField = usePaymentAmountStore(
    state => state.selectOtherField
  );
  const setAmount = usePaymentAmountStore(state => state.setAmount);
  const amountError = usePaymentAmountStore(state => state.amountError);
  const setAmountError = usePaymentAmountStore(state => state.setAmountError);
  console.log('selectOtherField', selectOtherField);

  return (
    <div className="pb-15">
      {/* amount selector */}
      <SelectAmountSection />

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
          // global error handler for payment
          console.error('err PayPalCardFieldsProvider', err);
          toast.error('Something went wrong, try again!');
        }}
      >
        {selectOtherField === 'custom' && (
          <div className="p-1.5">
            <Label className="gap-0.5">Amount</Label>
            <div className="py-1.5">
              <Input
                className={cn('input-custom-focus', {
                  'shadow-payment-input-error! focus:shadow-payment-input-focus! border-[#d9360b]! outline-none focus:border-[#000000]! focus:outline-none! focus-visible:ring-0':
                    !!amountError
                })}
                placeholder="Enter amount"
                required
                type="number"
                onChange={e => {
                  if (!!e.target.value) {
                    setAmount(e.target.value);
                    setAmountError(null);
                  } else {
                    setAmountError('Please enter amount');
                    setAmount(null);
                  }
                }}
                onKeyDown={e => {
                  // Block 'e', 'E', '+', '-'
                  if (['e', 'E', '+', '-'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                disabled={isLoading}
              />
            </div>
            {!!amountError && (
              <p className="text-destructive pb-2">{amountError}</p>
            )}
          </div>
        )}
        <div>
          <Label className="gap-0.5 pl-[0.375rem]">Cardholder name</Label>
          <PayPalNameField />
        </div>

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
  const amount = usePaymentAmountStore(state => state.amount);
  const setAmountError = usePaymentAmountStore(state => state.setAmountError);

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
        variant={'outline'}
        className="group mt-3 h-[50px] w-full bg-purple-700 text-base text-white hover:bg-purple-900 hover:text-white"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : 'Donate'}
      </Button>
    </div>
  );
};
