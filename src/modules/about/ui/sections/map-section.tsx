import { motion } from 'motion/react';
import Image from 'next/image';

export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-white/10 py-20 lg:py-32">
      {/* World Map Background Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[600px] w-screen lg:w-[1200px]">
          <Image
            src={'/assets/world-map-white.png'}
            fill
            alt="World map background"
            className="object-contain opacity-100"
            quality={100}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="relative mx-auto max-w-5xl text-center">
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
                {/* {data.total_impacted_lives}+ */}
                14,059,825 +
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
              children & families support all over the world
              {/* {short_description} */}
            </p>
          </motion.div>

          {/* Stats Grid with enhanced cards */}
          <div className="flex flex-col items-center justify-center gap-7 md:gap-17 lg:flex-row">
            {/* Stats */}
            {/* {data.select_stats.map(stat => (
              <> */}
            <motion.div
              // key={stat._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative flex"
            >
              <div className="relative grid gap-6 text-center">
                <span className="bg-clip-text text-5xl font-bold text-black md:text-6xl lg:text-7xl">
                  {/* {stat.value} */}
                  24
                </span>
                <p className="text-xl font-semibold text-gray-900">
                  Countries with our programs
                  {/* {getLocalizedString(stat.label || [])} */}
                </p>
              </div>
            </motion.div>

            <motion.div
              // key={stat._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative flex"
            >
              <div className="relative grid gap-6 text-center">
                <span className="bg-clip-text text-5xl font-bold text-black md:text-6xl lg:text-7xl">
                  {/* {stat.value} */}
                  35
                </span>
                <p className="text-xl font-semibold text-gray-900">
                  Years helping children thrive
                  {/* {getLocalizedString(stat.label || [])} */}
                </p>
              </div>
            </motion.div>

            <motion.div
              // key={stat._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="group relative flex"
            >
              <div className="relative grid gap-6 text-center">
                <span className="bg-clip-text text-5xl font-bold text-black md:text-6xl lg:text-7xl">
                  {/* {stat.value} */}
                  150
                </span>
                <p className="text-xl font-semibold text-gray-900">
                  Local partner organizations
                  {/* {getLocalizedString(stat.label || [])} */}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
