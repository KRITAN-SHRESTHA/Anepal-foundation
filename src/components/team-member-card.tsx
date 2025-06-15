import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function TeamMemberCard(member: {
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
