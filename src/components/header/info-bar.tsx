import React from 'react';

export default function InfoBar() {
  return (
    <div className="bg-accent hidden lg:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-x-9 px-4 py-2 sm:px-6 lg:px-8">
        {/* phone number */}
        <div className="flex items-center">
          <span className="text-xs">Phone number:</span>
          <p className="ml-1 text-sm leading-[100%] font-medium">
            +34 676 452 011
          </p>
        </div>
        {/* address */}
        <div className="flex items-center">
          <span className="text-xs">Address:</span>
          <p className="ml-1 text-sm leading-[100%] font-medium">
            Carrer Pau Casals, 4 Entresuelo, 2ª, 08860 Casteldefels, Barcelona
          </p>
        </div>
        {/* email */}
        <div className="flex items-center">
          <span className="text-xs">Email:</span>
          <p className="ml-1 text-sm leading-[100%] font-medium">
            cristinamartianepal@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
