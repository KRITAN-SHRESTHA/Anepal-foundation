'use client';

import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import NavigationLink from '@/components/navigation-link';
import { Button } from '@/components/ui/button';
import useGetLocale from '@/hooks/use-get-locale';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { ArrowRight, Award, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const OverlappingCard = ({
  children,
  index
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start center']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.95, 1]);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.9, 1]);

  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  // const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        y,
        position: 'sticky',
        // top: index === 0 ? '10rem' : '0rem',
        // top: '10rem',
        top: `${10 + index * 1.5}rem`,
        zIndex: index + 1
      }}
      className="mb-8"
    >
      {children}
    </motion.div>
  );
};

// const data = [
//   {
//     id: 0,
//     name: 'Become a Volunteer',
//     content:
//       'Join our mission to transform lives across Nepal. Share your skills, time, and passion to make a lasting impact on children and families in need. Together, we create sustainable change in communities.',
//     btnText: 'Join as Volunteer',
//     link: '/volunteer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop'
//   },
//   {
//     id: 1,
//     name: 'Make a Donation',
//     content:
//       'Your generous contribution provides essential medical care, quality education, nutritious meals, and emergency relief to vulnerable children and families throughout Nepal.',
//     btnText: 'Donate Now',
//     link: '/payment',
//     imageUrl:
//       'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=400&fit=crop'
//   },
//   {
//     id: 2,
//     name: 'Partner With Us',
//     content:
//       'Collaborate with Anepal Foundation to amplify impact. Together we create sustainable programs that empower communities and change lives for generations to come.',
//     btnText: 'Learn More',
//     link: '/donors-partners',
//     imageUrl:
//       'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop'
//   }
// ];

export default function HelpSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data] = trpc.home.getHomeHelpSection.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();
  // const t = useTranslations('DEFAULT')

  if (!data) return null;

  return (
    <div className="relative min-h-[150vh] bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content - Enhanced */}
          <div className="relative flex flex-col justify-center lg:sticky lg:top-32 lg:h-fit">
            {/* Section Badge */}
            <EnhancedBadge variant="pink" text={data.badge_text} />
            {/* Title */}
            <EnhancedTitle text={data.title} />

            {/* Description - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative mb-8"
            >
              {/* Quote Mark */}
              <div className="text-accent-foreground/10 absolute -top-7 -left-6 text-6xl font-bold lg:-left-10 lg:text-8xl">
                &ldquo;
              </div>

              <p className="relative text-base leading-relaxed text-gray-700 lg:text-lg lg:leading-relaxed">
                {getLocalizedString(data.description ?? [])}
              </p>
            </motion.div>

            {/* CTA Button  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative mb-12"
            >
              <NavigationLink href={'/contacts'}>
                <Button
                  size="lg"
                  className="group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/30 relative h-14 overflow-hidden bg-gradient-to-r text-base font-bold transition-all duration-300 md:px-8 lg:text-lg"
                >
                  <span className="relative flex items-center gap-3">
                    CONTACT US
                    <motion.div
                      animate={{
                        x: [0, 5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <ArrowRight className="size-5 lg:size-6" />
                    </motion.div>
                  </span>
                </Button>
              </NavigationLink>

              {/* Button glow effect */}
              <div className="from-accent-foreground/50 absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r to-purple-500/50 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center gap-8"
            >
              {/* Stat 1 */}
              <div className="group flex items-center gap-3">
                <div className="from-accent-foreground/10 to-accent-foreground/5 group-hover:from-accent-foreground group-hover:to-accent-foreground/80 flex size-12 items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300">
                  <Heart className="text-accent-foreground size-6 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Dedicated</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-gray-200" />

              {/* Stat 2 */}
              <div className="group flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-purple-500/5 transition-all duration-300 group-hover:from-purple-500 group-hover:to-purple-600">
                  <Award className="size-6 text-purple-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    Impactful
                  </div>
                  <div className="text-xs text-gray-600">Mission</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Overlapping Cards */}
          <div ref={containerRef} className="relative">
            {data.help_items?.map((d, idx) => (
              <OverlappingCard index={0} key={getLocalizedString(d.name ?? [])}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    `group relative flex items-center gap-5 overflow-hidden bg-gradient-to-br shadow-2xl md:gap-8`,
                    {
                      'from-pink-300 to-pink-400 md:rotate-[-10deg]': idx === 0,
                      'from-lime-300 to-lime-400 md:rotate-[5deg]': idx === 1,
                      'from-blue-300 to-blue-400 md:rotate-[-3deg]': idx === 2
                    }
                  )}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 opacity-20">
                    <div className="absolute top-4 right-4 size-32 rounded-full bg-white/30 blur-2xl"></div>
                    <div className="absolute top-16 right-16 size-24 rounded-full bg-white/20 blur-xl"></div>
                  </div>

                  {/* Image */}
                  <div className="relative h-[300px] w-[110px] shrink-0 shadow-lg md:w-[200px]">
                    <CustomImage
                      src={d.imageUrl}
                      alt={getLocalizedString(d.name ?? []) ?? ''}
                      fill
                      className="object-cover transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 pr-5">
                    <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900 uppercase lg:text-3xl">
                      {getLocalizedString(d.name ?? [])}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-800">
                      {getLocalizedString(d.content ?? [])}
                    </p>
                    <NavigationLink href={d.link!}>
                      <Button
                        variant="outline"
                        className="group/btn border-2 border-gray-900 bg-transparent font-bold text-gray-900 uppercase hover:bg-gray-900 hover:text-white"
                      >
                        {getLocalizedString(d.btnText ?? [])}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </NavigationLink>
                  </div>

                  {/* Decorative Number */}
                  <div className="absolute top-0 right-8 text-[120px] leading-none font-bold text-white/20 lg:text-[150px]">
                    {`0${idx + 1}`}
                  </div>
                </motion.div>
              </OverlappingCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
