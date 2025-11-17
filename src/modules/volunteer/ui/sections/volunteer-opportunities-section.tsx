'use client';

import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { Briefcase, Handshake, Users } from 'lucide-react';
import { motion } from 'motion/react';

const opportunities = [
  {
    icon: Users,
    title: 'Individual Volunteers',
    description:
      'As an individual volunteer, you can work in our partner helping facilitate recess games, leadership programs, or special events.',
    cta: 'Register Now',
    link: '/our-team',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Handshake,
    title: 'Partner with Us',
    description:
      'You and your team can make an impact by working directly with kids or engaging in a playground transformation project.',
    cta: 'Contact Us',
    link: '/contacts',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Briefcase,
    title: 'Work with Us',
    description:
      'Raising a generation of leaders takes a team of the best teachers, counselors, coordinators, and so much more.',
    cta: 'Explore Our Causes',
    link: '/about-us',
    gradient: 'from-orange-500 to-red-500'
  }
];

export default function VolunteerOpportunitiesSection() {
  return (
    <section className="relative bg-white py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <ContainerLayout>
        <div className="relative">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
            <EnhancedBadge text="Volunteer Opportunities" variant="pink" />
            <EnhancedTitle
              text="Choose How You Want to Help"
              className="text-balance"
            />
          </div>

          {/* Opportunities Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                  {/* Icon */}
                  <div className="mb-6 inline-flex">
                    <div
                      className={`flex size-16 items-center justify-center rounded-xl bg-gradient-to-br ${opportunity.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <opportunity.icon className="size-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-black tracking-tight text-gray-900 uppercase">
                    {opportunity.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-gray-600 lg:text-base">
                    {opportunity.description}
                  </p>

                  {/* CTA Button */}
                  {/* <Link href={opportunity.link}>
                    <Button
                      variant="outline"
                      className="group/btn w-full border-2 border-gray-900 bg-transparent font-bold text-gray-900 uppercase transition-all hover:bg-gray-900 hover:text-white"
                    >
                      {opportunity.cta}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link> */}

                  {/* Decorative corner accent */}
                  <div
                    className={`absolute -top-2 -right-2 size-20 rounded-full bg-gradient-to-br ${opportunity.gradient} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}
