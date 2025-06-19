import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GithubIcon, LinkedinIcon } from '@sanity/icons';
import { Dribbble } from 'lucide-react';
import React from 'react';

interface TeamMemberCardProps {
  person: {
    id: string;
    name: string;
    role: string;
    description: string;
    avatar: string;
  };
}

export default function TeamMemberCard({ person }: TeamMemberCardProps) {
  return (
    <div key={person.id} className="flex flex-col items-start">
      <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
        <AvatarImage src={person.avatar} />
        <AvatarFallback>{person.name}</AvatarFallback>
      </Avatar>
      <p className="font-medium">{person.name}</p>
      <p className="text-muted-foreground">{person.role}</p>
      <p className="text-muted-foreground py-3 text-sm">{person.description}</p>
      <div className="mt-2 flex gap-4">
        <a href="#">
          <GithubIcon className="text-muted-foreground size-5" />
        </a>
        <a href="#">
          <LinkedinIcon className="text-muted-foreground size-5" />
        </a>
        <a href="#">
          <Dribbble className="text-muted-foreground size-5" />
        </a>
      </div>
    </div>
  );
}
