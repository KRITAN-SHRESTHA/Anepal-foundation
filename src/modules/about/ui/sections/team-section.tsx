'use client';

import TeamMemberCard from '@/components/team-member-card';
import React from 'react';

const teamMembers = [
  {
    name: 'Cristina Marti Roca',
    title: 'Founder',
    imageUrl: '/assets/team/founder.jpg'
  },
  {
    name: 'Monica Marti',
    title: 'Member',
    imageUrl: '/assets/team/member1.jpg'
  },
  {
    name: 'Mercedes Bertomeu Ferrate',
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
    <div className="flex flex-col items-center justify-center px-4 py-[40px] sm:px-6 md:py-[60px] lg:px-8">
      <div className="mx-auto max-w-[1000px] text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Meet Our Team
        </h2>
      </div>
      <div className="mx-auto mt-10 flex max-w-screen-sm flex-col gap-5 gap-y-10 md:mt-20">
        {/* Top row - 3 members */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {teamMembers.slice(0, 3).map(member => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
        {/* Bottom row - 2 members */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:px-24">
          {teamMembers.slice(3, 5).map(member => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}
