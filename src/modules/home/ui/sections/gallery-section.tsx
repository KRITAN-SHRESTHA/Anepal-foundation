import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function GallerySection() {
  return (
    <div className="mt-10 mb-25 md:mt-14">
      <h2 className="text-center text-4xl font-semibold md:text-5xl">
        Galería
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className="mx-auto mt-8 w-full md:mt-14"
      >
        <CarouselContent className="">
          {data.map(d => (
            <CarouselItem
              key={d.image}
              className="relative basis-1/2 overflow-hidden pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Card className="aspect-square border-none shadow-none">
                <Image
                  src={d.image}
                  fill
                  alt="img"
                  className="object-cover transition-all duration-700 hover:scale-110"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-[calc(100%+1rem)] right-18 left-auto size-10 translate-y-0" />
        <CarouselNext className="top-[calc(100%+1rem)] right-15 size-10 translate-x-full translate-y-0" />
      </Carousel>
    </div>
  );
}

const data = [
  {
    image: '/assets/our_gallery/bikeshh.jpg'
  },
  {
    image: '/assets/our_gallery/sarita.jpg'
  },
  {
    image: '/assets/our_gallery/susmita.jpg'
  },
  {
    image: '/assets/our_gallery/ashmita_budha.jpg'
  },
  {
    image: '/assets/our_gallery/aayush.jpg'
  },
  {
    image: '/assets/our_gallery/abi.jpg'
  },
  {
    image: '/assets/our_gallery/purnima.jpg'
  },
  {
    image: '/assets/our_gallery/manju.jpg'
  },
  {
    image: '/assets/our_gallery/manita.jpg'
  },
  {
    image: '/assets/our_gallery/ajaya.jpg'
  },
  {
    image: '/assets/our_gallery/nawraj.jpg'
  },
  {
    image: '/assets/our_gallery/sirjina.jpg'
  },
  {
    image: '/assets/our_gallery/sibanti.jpg'
  },
  {
    image: '/assets/our_gallery/sagar.jpg'
  },
  {
    image: '/assets/our_gallery/sarjan.jpg'
  }
];
