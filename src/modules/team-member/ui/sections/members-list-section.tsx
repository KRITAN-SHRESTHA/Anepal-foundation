import React from 'react';
import TeamMemberCard from '../components/team-member-card';
import ContentTitle from '@/components/content-title';

const people = [
  {
    id: 'person-1',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp'
  },
  {
    id: 'person-2',
    name: 'Name',
    role: 'Role',
    description: 'Elig doloremque mollitia fugiat omnis!',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp'
  },
  {
    id: 'person-3',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp'
  },
  {
    id: 'person-4',
    name: 'Name',
    role: 'Role',
    description: 'Elig doloremque mollitia fugiat omnis!',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp'
  },
  {
    id: 'person-5',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp'
  },
  {
    id: 'person-6',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp'
  },
  {
    id: 'person-7',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp'
  },
  {
    id: 'person-8',
    name: 'Name',
    role: 'Role',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp'
  }
];

export default function MembersListSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-[80px] pb-32 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start text-left">
        {/* title */}
        {/* Support a Brighter Future Give Hope,
      Change Lives Your Gift Makes a
      Difference Empower Children in Nepal
      Join Us in Making an Impact */}
        {/* subtitle */}
        {/* Every donation helps transform a life.
      Together, we can create lasting change.
      Your generosity fuels our mission.
      Small acts, big impact.
      Be the reason someone smiles today. */}
        <ContentTitle
          title={'Support a Brighter Future'}
          subtitle={'Your generosity fuels our mission'}
        />
        <p className="text-muted-foreground mt-6 mb-8 max-w-3xl">
          100% of your donation goes to programs that uplift communities and
          change lives. Join our community of supporters and help us make a real
          difference.
        </p>
      </div>
      <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {people.map(person => (
          <TeamMemberCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}
