import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="tablet:grid-cols-2 mx-auto mt-5 grid w-full max-w-screen-xl items-center gap-x-12 gap-y-8 px-4 py-12 sm:px-6 md:mt-14 lg:px-8">
      <div>
        {/* Anepal Foundation: */}
        <h1 className="tablet:max-w-[17ch] mt-6 text-4xl !leading-[1.2] font-bold md:text-5xl lg:text-[2.75rem] xl:text-5xl">
          Fundación Anepal
        </h1>
        {/* What is Anepal and why should you collaborate with us? */}
        <h2 className="text-2xl font-medium">
          Que es Anepal y porque colaborar con nosotros.
        </h2>
        {/* We are a non-profit foundation. Registered under number 3023 in the
            Registry of Foundations of the Generalitat de Catalunya (Catalan
            Government). Tax ID number G-66891086. We have been working in Nepal
            since 2006. Our goal is to offer education to girls and boys who
            lack the means or resources to access it. Most of these children
            have no family or support. We offer them a home, a family, a safe
            space, a future. */}
        <p className="tablet:max-w-[60ch] mt-6 text-lg">
          Somos una Fundacion sin animo de lucro. Inscrita con el numero 3023 en
          el Registro de Fundaciones de la Generalitat de Catalunya. Cif
          n.G-66891086.Trabajamos en Nepal desde el año 2006. Nuestro objetivo
          es ofrecer educación a niñas y niños que no tienen los medios ni los
          recursos suficientes para poder acceder a los mismos. La mayoria de
          los niños no tienen familia ni soporte alguno. Nosotros les ofrecemos
          un hogar, una familia, un espacio seguro, un futuro.
        </p>
        <div className="tablet:mt-12 mt-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full !px-7 text-base shadow-none"
            border={'purple'}
          >
            <BookOpen className="!h-5 !w-5" /> Read Story
          </Button>
        </div>
      </div>
      <div className="bg-accent aspect-[16/12] w-full overflow-hidden rounded-xl">
        <Image
          className="h-full w-full object-cover"
          src="/assets/homePageImage/hero.jpg"
          alt="hero-img"
          width={300}
          height={250}
        />
      </div>
    </div>
  );
}
