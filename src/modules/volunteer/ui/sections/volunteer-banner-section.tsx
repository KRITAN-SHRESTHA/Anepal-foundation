'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import EnhancedBadge from '@/components/enhanced-badge';
import ContainerLayout from '@/components/container-layout';
import EnhancedTitle from '@/components/enhanced-title';

export default function VolunteerBannerSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <ContainerLayout>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EnhancedBadge text="We Need Your Help" variant="yellow" />
            <EnhancedTitle text="Become a Volunteer" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 text-xl font-semibold text-gray-700 lg:text-2xl"
            >
              Do you want to get involved?
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base leading-relaxed text-gray-600 lg:text-lg"
            >
              Join us in making a difference in the lives of children and
              families across Nepal. Your time, skills, and passion can create
              lasting change in communities that need it most.
            </motion.p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=800&fit=crop"
                alt="Volunteers helping children"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="from-accent-foreground flex size-16 items-center justify-center rounded-full bg-gradient-to-br to-purple-600">
                  <span className="text-2xl font-black text-white">1K+</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Active Volunteers
                  </p>
                  <p className="text-xs text-gray-500">Making Impact Daily</p>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
