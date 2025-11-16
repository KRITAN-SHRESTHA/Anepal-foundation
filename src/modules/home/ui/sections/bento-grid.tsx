import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'motion/react';

export const BentoGrid = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid auto-rows-[300px] grid-cols-1 gap-4 bg-transparent sm:grid-cols-2 md:auto-rows-[450px] md:grid-cols-3 lg:gap-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  index = 0
}: {
  className?: string;
  image: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  index?: number;
}) => {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      // whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn(
        'group/bento hover:shadow-accent-foreground/10 relative row-span-1 flex flex-col justify-between overflow-hidden rounded-2xl bg-white transition-all duration-500 lg:rounded-3xl',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          fill
          className="object-cover transition-all duration-700 group-hover/bento:scale-110"
          alt={typeof title === 'string' ? title : 'grid item'}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-700 group-hover/bento:from-black/90 group-hover/bento:via-black/60" />

        {/* Decorative Corner Accent */}
        <div className="absolute top-0 right-0 size-32 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100">
          <div className="bg-accent-foreground/20 absolute top-4 right-4 h-16 w-16 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto p-6 lg:p-8">
        {/* Badge/Icon */}
        {/* <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.1 + 0.3,
            duration: 0.5,
            type: 'spring'
          }}
          className="bg-accent-foreground/90 mb-4 inline-flex size-12 items-center justify-center rounded-xl opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/bento:opacity-100 lg:size-14"
        >
          <Sparkles className="size-6 text-white lg:size-7" />
        </motion.div> */}

        {/* Title & Description */}
        <div className="transform space-y-3 transition-all duration-700 lg:translate-y-4 lg:opacity-0 lg:group-hover/bento:translate-y-0 lg:group-hover/bento:opacity-100">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-2xl leading-tight font-bold text-white lg:text-3xl">
              {title}
            </h3>

            {/* Arrow Icon */}
            {/* <motion.div
              whileHover={{ scale: 1.2, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover/bento:bg-accent-foreground lg:size-12"
            >
              <ArrowUpRight className="size-5 text-white lg:size-6" />
            </motion.div> */}
          </div>

          {description && (
            <p className="transform text-sm leading-relaxed text-white/90 transition-all delay-100 duration-700 lg:translate-y-2 lg:text-base lg:opacity-0 lg:group-hover/bento:translate-y-0 lg:group-hover/bento:opacity-100">
              {description}
            </p>
          )}

          {/* Decorative Line */}
          <div className="from-accent-foreground h-1 w-20 origin-left scale-x-100 rounded-full bg-gradient-to-r to-purple-500 transition-all duration-500 ease-out lg:scale-x-0 lg:opacity-0 lg:group-hover/bento:scale-x-100 lg:group-hover/bento:opacity-100" />
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="ring-accent-foreground/20 absolute inset-0 rounded-2xl opacity-0 ring-2 transition-opacity duration-500 group-hover/bento:opacity-100 lg:rounded-3xl" />

      {/* Shine Effect */}
      <motion.div
        animate={{
          x: [-200, 200],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/bento:opacity-100"
      />
    </motion.div>
  );
};
