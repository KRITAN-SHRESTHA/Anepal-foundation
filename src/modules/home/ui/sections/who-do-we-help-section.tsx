import React from 'react';

export default function WhoDoWeHelpSection() {
  return (
    <div className="bg-accent mt-10">
      <div className="mx-auto max-w-screen-md py-12 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">Who do we help</h2>
        {/* <p className="mt-6 text-lg">Because after switching to us...</p> */}
        <div className="mt-10 grid justify-center gap-x-8 gap-y-16 sm:mt-14 sm:grid-cols-3">
          {/* Our Children */}
          <div className="grid justify-center">
            <span className="text-5xl font-semibold">20</span>
            <p className="mt-6 text-lg">Nuestros Niños</p>
          </div>
          {/* Our Sponsors */}
          <div className="grid justify-center">
            <span className="text-5xl font-semibold">74</span>
            <p className="mt-6 text-lg">Nuestros Sponsors</p>
          </div>
          <div className="grid justify-center">
            <span className="text-5xl font-semibold">220k</span>
            <p className="mt-6 text-lg">Dollars We Collected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
