'use client';

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

import { Button } from '@/components/ui/button';

import NavigationLink from '@/components/navigation-link';
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
    <div className="relative w-full bg-white pt-[50px] pb-[100px]">
      <ReactConfetti width={dimensions.width} height={dimensions.height} />
      <div className="mx-auto max-w-2xl">
        <SuccessLogo />

        <div className="mt-[100px] flex justify-center">
          <Button className="h-[50px] w-[200px] text-base">
            <NavigationLink href={'/'} className="">
              Back to home
            </NavigationLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
