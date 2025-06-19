import HeroSection from '@/components/hero-section';
import React from 'react';
import MembersListSection from '../sections/members-list-section';

export default function TeamMemberView() {
  return (
    <div>
      <HeroSection
        image={'/assets/main-slider/24.jpg'}
        boldTitle="Team"
        normalTitle="Member"
      />

      <MembersListSection />
    </div>
  );
}
