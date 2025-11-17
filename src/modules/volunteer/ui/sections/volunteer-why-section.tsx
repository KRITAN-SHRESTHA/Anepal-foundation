'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import ContainerLayout from '@/components/container-layout';

const benefits = [
  'Meet like-minded professional volunteers from around the world',
  'Help communities improve quality of life',
  'Skill development and career enrichment',
  "Support children's and youth rights",
  'Additional professional networking opportunity',
  'Make a lasting impact on future generations'
];

export default function VolunteerWhySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-yellow-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />

      <ContainerLayout>
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"
                alt="Why volunteer is important"
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Quote on image */}
              <div className="absolute right-8 bottom-8 left-8">
                <p className="text-lg font-bold text-white italic lg:text-xl">
                  {
                    'Volunteers do not necessarily have the time; they just have the heart.'
                  }
                </p>
              </div>
            </div>

            {/* Decorative floating element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 -bottom-6 rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="text-center">
                <p className="text-accent-foreground text-4xl font-black">
                  5000+
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  Lives Touched
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <EnhancedBadge text="Make a Difference" variant="green" />
            <EnhancedTitle text="Why Volunteer is Important" />

            <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
              {
                "Volunteering is more than giving back—it's about creating connections, developing skills, and being part of something bigger than yourself."
              }
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <Check className="size-4 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-base font-medium text-gray-700 lg:text-lg">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
