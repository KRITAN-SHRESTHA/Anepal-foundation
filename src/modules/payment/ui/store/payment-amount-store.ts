import { create } from 'zustand';

const amountValues = [
  {
    value: '1'
  },
  {
    value: '5'
  },
  {
    value: '10'
  },
  {
    value: '50'
  },
  {
    value: '100'
  }
];

interface StoreState {
  amountList: {
    value: string;
  }[];
  amount: string | null;
  selectOtherField: 'custom' | null;
  amountError: string | null;
  isPaying: boolean;
  setIsPaying: (val: boolean) => void;
  setAmount: (val: string | null) => void;
  setSelectOtherField: (val: 'custom' | null) => void;
  setAmountError: (val: string | null) => void;
}

export const usePaymentAmountStore = create<StoreState>()(set => ({
  amount: '1',
  amountError: null,
  selectOtherField: null,
  isPaying: false,
  setIsPaying: val => set({ isPaying: val }),
  amountList: amountValues,
  setAmount: val => set({ amount: val }),
  setSelectOtherField: val => set({ selectOtherField: val }),
  setAmountError: val => set({ amountError: val })
}));
