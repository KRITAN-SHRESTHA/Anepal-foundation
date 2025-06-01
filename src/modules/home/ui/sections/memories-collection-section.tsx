import React from 'react';
import { BentoGrid, BentoGridItem } from './bento-grid';
import { cn } from '@/lib/utils';

export default function MemoriesCollectionSection() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold md:text-5xl">
          Qué nos hace únicos?
        </h2>
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-lg">
          Trabajamos de manera altruista para transformar vidas cada aporte que
          recibimos se dedica por completo a la educación y el bienestar de los
          niños.
        </p>
      </div>

      <BentoGrid className="mt-14 w-full">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            image={item.image}
            className={cn(
              // First row: 2 items
              i === 0 && 'md:col-span-2',
              i === 1 && 'md:col-span-1',
              // Second row: 2 items
              i === 2 && 'md:col-span-1',
              i === 3 && 'md:col-span-2',
              // Third row: 2 items
              i === 4 && 'md:col-span-2',
              i === 5 && 'md:col-span-1',
              i === 5 && 'md:col-span-1'
            )}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const items = [
  {
    title: 'Cuidado Familiar',
    description: null,
    image: '/assets/what_makes_unique/parential_care.jpg'
  },
  {
    title: 'Amor',
    description: null,

    image: '/assets/what_makes_unique/happy_child.jpg'
  },
  {
    title: 'Compañerismo',
    description:
      'Murray cod clownfish American sole rockfish dojo loach gulper, trout-perch footballfish, pelican eel. Spinefoot coelacanth eagle ray',
    image: '/assets/what_makes_unique/brother_sister.jpg'
  },
  {
    title: 'Educación',
    description: null,
    image: '/assets/what_makes_unique/education.jpg'
  },
  {
    title: 'Vida segura y feliz',
    description: null,
    image: '/assets/what_makes_unique/happy_child2.jpg'
  },
  {
    title: 'The Joy of Creation',
    description: null,
    image: '/assets/what_makes_unique/parentail_care_photo_1.jpg'
  }
];
