'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';

import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/lib/i18n-config';
import { LOCALE_COOKIE_NAME } from '@/constants';

type DictionaryContextType = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
};

const DictionaryContext = createContext<DictionaryContextType | undefined>(
  undefined
);

export function DictionaryProvider({
  children,
  dictionaryObj,
  locale
}: {
  children: React.ReactNode;
  dictionaryObj: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}) {
  const [dictionary, setDictionary] = useState({});

  useEffect(() => {
    setDictionary(dictionaryObj);
  }, []);

  useEffect(() => {
    Cookies.set(LOCALE_COOKIE_NAME, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      dictionary,
      locale
    }),
    [dictionary, locale]
  );

  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);

  if (context === undefined) {
    throw new Error(
      'useDictionaryContext must be used within a DictionaryProvider'
    );
  }

  return context;
}
