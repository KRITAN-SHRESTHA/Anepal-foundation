'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Award } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

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

const data = [
  {
    id: 0,
    name: 'volunteer',
    content:
      'You can make a huge difference to our community and the young people in it.',
    btnText: 'become a volunteer',
    link: '/',
    imageUrl:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop'
  },
  {
    id: 1,
    name: 'work with us',
    content: 'Support those who served us with a one-time or monthly donation.',
    btnText: 'become a volunteer',
    link: '/',
    imageUrl:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'volunteer',
    content:
      'You can make a huge difference to our community and the young people in it.',
    btnText: 'become a volunteer',
    link: '/',
    imageUrl:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop'
  }
];

export default function HelpSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-[150vh] bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content - Enhanced */}
          <div className="relative flex flex-col justify-center lg:sticky lg:top-32 lg:h-fit">
            {/* Decorative Background Element */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="from-accent-foreground/10 absolute top-0 -left-20 size-40 rounded-full bg-gradient-to-br to-purple-500/10 blur-3xl lg:-left-32 lg:size-64"
            />

            {/* Section Badge - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-6 inline-flex"
            >
              <div className="group relative overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    x: [-100, 200]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                <span className="from-accent-foreground/10 text-accent-foreground relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r to-purple-500/10 px-5 py-2.5 text-sm font-bold tracking-wide uppercase backdrop-blur-sm transition-all duration-300 lg:px-6 lg:py-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <Heart className="fill-accent-foreground/20 size-4 lg:size-5" />
                  </motion.div>
                  HOW YOU CAN HELP
                </span>
              </div>
            </motion.div>

            {/* Title - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-6"
            >
              <h2 className="relative text-4xl leading-[1.1] font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                <span className="relative">
                  <span className="relative z-10 bg-clip-text">
                    Give a helping hand{' '}
                  </span>
                  {/* Underline decoration */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="from-accent-foreground/20 absolute -bottom-1 left-0 h-3 w-full origin-left bg-gradient-to-r to-purple-500/20 lg:h-4"
                  />
                </span>
                for needy people
              </h2>
            </motion.div>

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
                Save the Children is right now on the ground, in the U.S and
                around the world, delivering essential humanitarian aid. Your
                donation today helps this life-saving work.
              </p>

              {/* Decorative gradient underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="from-accent-foreground/50 mt-4 h-px w-24 origin-left bg-gradient-to-r to-transparent"
              />
            </motion.div>

            {/* CTA Button - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative mb-12"
            >
              <Button
                size="lg"
                className="group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/30 relative h-14 overflow-hidden bg-gradient-to-r px-10 text-base font-bold shadow-xl transition-all duration-300 hover:shadow-2xl lg:h-16 lg:px-12 lg:text-lg"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{
                    x: [-200, 200]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                />

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
            {data.map((d, idx) => (
              <OverlappingCard index={0} key={d.id}>
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
                    <Image
                      src={d.imageUrl}
                      alt={d.name}
                      fill
                      className="object-cover transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 pr-5">
                    <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900 uppercase lg:text-3xl">
                      {d.name}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-800">
                      {d.content}
                    </p>
                    <Button
                      variant="outline"
                      className="group/btn border-2 border-gray-900 bg-transparent font-bold text-gray-900 uppercase hover:bg-gray-900 hover:text-white"
                    >
                      {d.btnText}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
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
