'use client';

import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import SuccessLogo from '../components/success-logo';

export default function PaymentSuccessView() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    updateSize();
    // Update on resize
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative w-full pt-[50px] pb-[100px]">
      <ReactConfetti width={dimensions.width} height={dimensions.height} />
      <div className="mx-auto max-w-2xl">
        <SuccessLogo />

        <div className="mt-[100px] flex justify-center">
          <Button className="h-[50px] w-[200px] bg-purple-700 text-base text-white hover:bg-purple-900 hover:text-white">
            <Link href={'/'}>Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
