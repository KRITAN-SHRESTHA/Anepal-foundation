import React from 'react';

export default function Hero() {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between py-20 md:flex-row">
          <div className="md:w-1/2">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Una pequena ayuda puede significar una gran diferencia
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              El dia en que todos trabajemos juntos para lograr un futuro mejor
              para nuestros hijos, sera el mejor dia de la vida.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="assets/homePageImage/banner1.jpg"
              alt="banner"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
