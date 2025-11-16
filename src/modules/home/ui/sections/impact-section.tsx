'use client';

import EnhancedBadge from '@/components/enhanced-badge';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function ImpactSection() {
  return (
    // <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32">
    <section className="relative overflow-hidden bg-[#eaae88]/30 py-20 lg:py-32">
      {/* World Map Background Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[600px] w-[1000px]">
          <Image
            src={'/assets/world-map-white.png'}
            fill
            alt="World map background"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="relative mx-auto max-w-5xl text-center">
          {/* Enhanced Badge */}
          <EnhancedBadge text="The Impact We Make" variant="yellow" />

          {/* Main Heading with gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-3xl leading-tight font-extrabold text-transparent uppercase sm:text-4xl lg:mb-16 lg:text-6xl"
          >
            Building a World Where All
            <br />
            <span className="bg-clip-text">Children Are Safe, Strong,</span>
            <br />
            And Valued
          </motion.h2>

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
                14,059,825+
              </h3>
            </div>
          </motion.div>

          {/* Subtitle with icon */}
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative flex items-center gap-6 p-8">
                <div className="mb-4">
                  <span className="bg-clip-text text-6xl font-bold text-black lg:text-7xl">
                    24
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 lg:text-base">
                  Countries with
                  <br />
                  our programs
                </p>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative flex items-center gap-6 p-8">
                <div className="mb-4">
                  <span className="bg-clip-text text-6xl font-bold text-black lg:text-7xl">
                    35
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 lg:text-base">
                  Years helping
                  <br />
                  children thrive
                </p>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative flex items-center gap-6 p-8">
                <div className="mb-4">
                  <span className="bg-clip-text text-6xl font-bold text-black lg:text-7xl">
                    150
                  </span>
                </div>
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
