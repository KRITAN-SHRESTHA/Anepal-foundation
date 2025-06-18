import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { OnApproveData } from '@paypal/paypal-js';
import {
  PayPalCardFieldsProvider,
  PayPalCVVField,
  PayPalExpiryField,
  PayPalNameField,
  PayPalNumberField,
  usePayPalCardFields
} from '@paypal/react-paypal-js';
import React, { useState } from 'react';

interface CustomCard {
  createOrder: () => Promise<string>;
  onApprove: (data: OnApproveData) => Promise<void>;
  isCreatingOrder: boolean;
}

const INVALID_COLOR = {
  color: '#dc3545'
};

type CardFieldError = 'INVALID_NUMBER' | 'INVALID_EXPIRY' | 'INVALID_CVV';

export default function CustomCard({
  createOrder,
  onApprove,
  isCreatingOrder
}: CustomCard) {
  const [errors, setErrors] = useState<CardFieldError[]>([]);

  console.log('errors', errors);

  return (
    <div className="pb-15">
      <PayPalCardFieldsProvider
        createOrder={createOrder}
        onApprove={onApprove}
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
        onError={() => {}}
      >
        <Label className="gap-0.5 pl-[0.375rem]">Cardholder name</Label>
        <PayPalNameField />

        <div>
          <Label className="gap-0.5 pl-[0.375rem]">
            Card number<span style={INVALID_COLOR}>*</span>
          </Label>
          <PayPalNumberField />
          {/* {errors.includes('INVALID_NUMBER') && (
            <span className="text-destructive -mt-2 mb-2 pl-[0.375rem]">
              Enter valid card number
            </span>
          )} */}
        </div>

        <div className="flex">
          <div className="w-1/2">
            <Label className="gap-0.5 pl-[0.375rem]">
              Expiry date<span style={INVALID_COLOR}>*</span>
            </Label>
            <PayPalExpiryField />
            {/* {errors.includes('INVALID_EXPIRY') && 'Enter valid expiry date'} */}
          </div>
          <div className="w-1/2">
            <Label className="gap-0.5 pl-[0.375rem]">
              CVV<span style={INVALID_COLOR}>*</span>
            </Label>
            <PayPalCVVField />
            {/* {errors.includes('INVALID_CVV') && 'Enter valid CVV'} */}
          </div>
        </div>

        <SubmitPayment
          isCreatingOrder={isCreatingOrder}
          setErrors={setErrors}
        />
      </PayPalCardFieldsProvider>
    </div>
  );
}

const SubmitPayment = ({
  isCreatingOrder,
  setErrors
}: {
  isCreatingOrder: boolean;
  setErrors: React.Dispatch<React.SetStateAction<CardFieldError[]>>;
}) => {
  const { cardFieldsForm } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        'Unable to find any child components in the <PayPalCardFieldsProvider />';

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    setErrors(formState.errors as CardFieldError[]);

    // if (!formState.isFormValid) {
    //   return alert('The payment form is invalid');
    // }
    cardFieldsForm.submit().catch(() => {});
  };

  return (
    <Button
      variant={'outline'}
      className="group mt-3 h-[50px] w-full bg-purple-700 text-base text-white hover:bg-purple-900 hover:text-white"
      onClick={handleClick}
      disabled={isCreatingOrder}
    >
      {isCreatingOrder ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="h-10 w-10 animate-spin fill-purple-700 text-gray-200 group-hover:fill-purple-900 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        'Donate'
      )}
    </Button>
  );
};
