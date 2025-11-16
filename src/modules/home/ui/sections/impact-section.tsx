'use client';

import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { Separator } from '@/components/ui/separator';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-[#eaae88] py-20 mix-blend-multiply lg:py-32">
      {/* World Map Background Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[600px] w-[1000px]">
          <Image
            src={'/assets/world-map-white.png'}
            fill
            alt="World map background"
            className="object-contain opacity-20"
            quality={100}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="relative mx-auto max-w-5xl text-center">
          {/* Enhanced Badge */}
          <EnhancedBadge text="The Impact We Make" variant="yellow" />

          {/* Main Heading with gradient */}
          <EnhancedTitle text="Building a World Where All" className="mb-0" />
          <EnhancedTitle text="Children Are Safe, Strong," className="mb-0" />
          <EnhancedTitle text="And Valued" />

          {/* Large Impact Number with better gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            className="mb-6"
          >
            <div className="relative inline-block">
              <h3 className="bg-clip-text text-7xl font-extrabold text-[#f0dd8f] sm:text-8xl lg:text-9xl">
                140,000+
              </h3>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16 lg:mb-20"
          >
            <p className="inline-flex items-center gap-2 text-base font-bold tracking-wide text-gray-700 uppercase sm:text-lg">
              Children & Families Support All Over The World
            </p>
          </motion.div>

          {/* Stats Grid with enhanced cards */}
          <div className="flex flex-col items-center justify-center gap-7 md:gap-17 lg:flex-row">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative flex"
            >
              <div className="relative flex items-center gap-6">
                <span className="bg-clip-text text-5xl font-bold text-black md:text-6xl lg:text-7xl">
                  24
                </span>
                <p className="text-sm font-semibold text-gray-700 lg:text-base">
                  Countries with
                  <br />
                  our programs
                </p>
              </div>
            </motion.div>
            <Separator
              orientation="vertical"
              className="hidden h-[100px]! w-[1px]! bg-gray-500 lg:block"
            />

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative flex items-center gap-6">
                <span className="bg-clip-text text-5xl font-bold text-black md:text-6xl lg:text-7xl">
                  35
                </span>
                <p className="text-sm font-semibold text-gray-700 lg:text-base">
                  Years helping
                  <br />
                  children thrive
                </p>
              </div>
            </motion.div>
            <Separator
              orientation="vertical"
              className="hidden h-[100px]! w-[1px]! bg-gray-500 lg:block"
            />

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative flex items-center gap-6">
                <span className="bg-clip-text text-5xl font-bold text-black md:text-6xl lg:text-7xl">
                  150
                </span>
                <p className="text-sm font-semibold text-gray-700 lg:text-base">
                  Local partner
                  <br />
                  organizations
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
