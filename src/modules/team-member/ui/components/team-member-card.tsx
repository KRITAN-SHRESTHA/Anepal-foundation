import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { BsTwitterX } from 'react-icons/bs';
import useGetLocale from '@/hooks/use-get-locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PopulatedTeamMember } from '@/types/team-member-types';

export default function TeamMemberCard(member: PopulatedTeamMember) {
  const { getLocalizedString } = useGetLocale();
  return (
    <div key={member._id} className="flex flex-col items-start">
      <Avatar className="mb-4 size-24 sm:size-30 md:mb-5">
        {member.image && (
          <AvatarImage
            src={urlFor(member.image).quality(100).url()}
            className="object-cover"
          />
        )}
        <AvatarFallback>{member.name}</AvatarFallback>
      </Avatar>
      <p className="font-medium">{member.name}</p>
      <p className="text-muted-foreground">{member.role?.name}</p>
      <p className="text-muted-foreground py-3 text-sm">
        {getLocalizedString(member.short_intro ?? [])}
      </p>
      <div className="mt-2 flex gap-4">
        {member.socialMedia?.facebook && (
          <Link href={member.socialMedia?.facebook} target="_blank">
            <FiFacebook className="stroke-muted-foreground h-5 w-5" />
          </Link>
        )}
        {member.socialMedia?.twitter && (
          <Link href={member.socialMedia?.twitter} target="_blank">
            <BsTwitterX className="stroke-muted-foreground h-5 w-5" />
          </Link>
        )}
        {member.socialMedia?.instagram && (
          <Link href={member.socialMedia?.instagram} target="_blank">
            <FiInstagram className="stroke-muted-foreground h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
