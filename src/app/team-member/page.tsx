import HeroSection from '@/components/hero-section';
import React from 'react';

export default function TeamMemberPage() {
  return (
    <div>
      <HeroSection
        image={'/assets/main-slider/24.jpg'}
        boldTitle="Team"
        normalTitle="Member"
      />
    </div>
  );
}
