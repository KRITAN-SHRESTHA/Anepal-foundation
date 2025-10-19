import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { usePaymentAmountStore } from '../store/payment-amount-store';

const radioClassname =
  'border-input has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border-2 px-2 py-3 text-center shadow-xs transition-[color,box-shadow] delay-300 outline-none has-focus-visible:ring-[3px] has-data-[state=checked]:border-purple-800';

export default function SelectAmountSection() {
  const amountList = usePaymentAmountStore(state => state.amountList);
  const setAmount = usePaymentAmountStore(state => state.setAmount);
  const setSelectOtherField = usePaymentAmountStore(
    state => state.setSelectOtherField
  );
  const selectOtherField = usePaymentAmountStore(
    state => state.selectOtherField
  );
  const amountError = usePaymentAmountStore(state => state.amountError);
  const setAmountError = usePaymentAmountStore(state => state.setAmountError);
  const isPaying = usePaymentAmountStore(state => state.isPaying);

  function handleChange(val: string) {
    setAmountError(null);
    if (val === 'custom') {
      setSelectOtherField('custom');
      setAmount(null);
    } else {
      setAmount(val);
      setSelectOtherField(null);
    }
  }

  return (
    <>
      <RadioGroup
        className="xs:grid-cols-3 grid-cols-3 p-1.5"
        defaultValue="1"
        onValueChange={handleChange}
        disabled={isPaying}
      >
        {amountList.map(amt => (
          <div key={amt.value} className={radioClassname}>
            <RadioGroupItem
              id={`${amt.value}-1`}
              value={amt.value.toString()}
              className="sr-only"
            />
            <label
              htmlFor={`${amt.value}-1`}
              className="text-foreground cursor-pointer leading-none font-medium whitespace-nowrap after:absolute after:inset-0"
            >
              $ {amt.value}
            </label>
          </div>
        ))}
        <div className={radioClassname}>
          <RadioGroupItem id={`custom`} value="custom" className="sr-only" />
          <label
            htmlFor={`custom`}
            className="text-foreground cursor-pointer leading-none font-medium after:absolute after:inset-0"
          >
            Custom
          </label>
        </div>
      </RadioGroup>
      {selectOtherField === 'custom' && (
        <div className="mb-4 p-1.5">
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
              disabled={isPaying}
            />
          </div>
          {!!amountError && (
            <p className="text-destructive pb-2">{amountError}</p>
          )}
        </div>
      )}
    </>
  );
}
