import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import { PopulatedTeamMember } from '@/types/team-member-types';

import CustomImage from './custom-image';

export default function TeamMemberCard(member: PopulatedTeamMember) {
  return (
    <div className="text-center">
      <CustomImage
        src={member.image}
        alt={member.name ?? ''}
        className="bg-secondary mx-auto h-40 w-40 rounded-full object-cover"
        width={160}
        height={160}
      />
      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
      <p className="text-muted-foreground">{member.role?.name}</p>
      <div className="mt-3 flex items-center justify-center gap-4">
        {member.socialMedia?.facebook && (
          <Link href={member.socialMedia?.facebook} target="_blank">
            <Facebook className="stroke-muted-foreground h-5 w-5" />
          </Link>
        )}
        {member.socialMedia?.twitter && (
          <Link href={member.socialMedia?.twitter} target="_blank">
            <Twitter className="stroke-muted-foreground h-5 w-5" />
          </Link>
        )}
        {member.socialMedia?.instagram && (
          <Link href={member.socialMedia?.instagram} target="_blank">
            <Instagram className="stroke-muted-foreground h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
