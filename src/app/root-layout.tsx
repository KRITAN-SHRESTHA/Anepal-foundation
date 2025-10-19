'use client';

import { useParams } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function RootLayoutPage({ children }: Props) {
  const params = useParams();

  const locale = (params.locale as string) ?? 'en';

  return <html lang={locale}>{children}</html>;
}
