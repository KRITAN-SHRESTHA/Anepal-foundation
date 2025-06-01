import { Button } from '@/components/ui/button';
import { ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'CRISTINA MARTI ROCA',
    title: 'Founder',
    imageUrl: '/assets/team/founder.jpg'
  },
  {
    name: 'Monica Marti',
    title: 'Member',
    imageUrl: '/assets/team/member1.jpg'
  },
  {
    name: 'MERCEDES BERTOMEU FERRATE',
    title: 'Member',
    imageUrl: '/assets/team/member.jpg'
  },
  {
    name: 'Max Casas',
    title: 'Member',
    imageUrl: '/assets/team/max.jpg'
  },
  {
    name: 'Anju Solas',
    title: 'Member',
    imageUrl: '/assets/team/anju.jpg'
  }
];

export default function TeamSection() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        {/* Meet Our Team */}
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          NUESTRO EQUIPO
        </h2>
        <p className="mt-4 text-base sm:text-lg">
          Our philosophy is simple — hire a team of diverse, passionate people
          and foster a culture that empowers you to do you best work.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-4 rounded-full !px-5 pr-2"
          border={'purple'}
        >
          <Link href="/team-member">
            Read more
            <ChevronRight className="opacity-50" />
          </Link>
        </Button>
      </div>
      <div className="mx-auto mt-10 flex max-w-screen-sm flex-col gap-5 gap-y-10 md:mt-20">
        {/* Top row - 3 members */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {teamMembers.slice(0, 3).map(member => (
            <TeamCardItem key={member.name} {...member} />
          ))}
        </div>
        {/* Bottom row - 2 members */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-24">
          {teamMembers.slice(3, 5).map(member => (
            <TeamCardItem key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamCardItem(member: {
  name: string;
  title: string;
  imageUrl: string;
}) {
  return (
    <div key={member.name} className="text-center">
      <Image
        src={member.imageUrl}
        alt={member.name}
        className="bg-secondary mx-auto h-20 w-20 rounded-full object-cover"
        width={120}
        height={120}
      />
      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
      <p className="text-muted-foreground">{member.title}</p>
      <div className="mt-3 flex items-center justify-center gap-4">
        <Link href="#" target="_blank">
          <Twitter className="stroke-muted-foreground h-5 w-5" />
        </Link>
        <Link href="#" target="_blank">
          <Instagram className="stroke-muted-foreground h-5 w-5" />
        </Link>
        <Link href="#" target="_blank">
          <Facebook className="stroke-muted-foreground h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
