import ContainerLayout from '@/components/container-layout';
import WhatWeDoContent from '../components/what-we-do-content';
import WhatWeDoHeader from '../components/what-we-do-header';
import WhatWeDoBgImage from './what-we-do-bg-image';

export default function WhatWeDoSection() {
  return (
    <ContainerLayout>
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Decorative Background Elements */}
        <div className="bg-accent-foreground/5 absolute top-20 left-1/4 size-96 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-40 size-96 rounded-full bg-yellow-500/5 blur-3xl" />

        <div className="relative">
          {/* Top Section - Badge, Title, Description, Button */}
          <WhatWeDoHeader />

          {/* Right - Image Section */}
          <WhatWeDoBgImage />

          {/* Main Content Grid - Categories, Dynamic Content, Image */}
          <WhatWeDoContent />
        </div>
      </section>
    </ContainerLayout>
  );
}
