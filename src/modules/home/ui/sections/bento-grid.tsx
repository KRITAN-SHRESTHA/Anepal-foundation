import { cn } from '@/lib/utils';
import Image from 'next/image';

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
        'grid auto-rows-[300px] grid-cols-1 overflow-hidden sm:grid-cols-2 md:auto-rows-[450px] md:grid-cols-3',
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
  image
}: {
  className?: string;
  image: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group/bento shadow-input relative row-span-1 flex flex-col justify-between overflow-hidden bg-white transition duration-200 dark:border-white/[0.2] dark:bg-black dark:shadow-none',
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          fill
          className="object-cover transition-all duration-700 group-hover/bento:scale-110"
          alt={typeof title === 'string' ? title : 'grid item'}
        />
        {/* Add overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20 transition-all duration-700 group-hover/bento:bg-black/40" />
      </div>

      <div className="relative z-10 mt-auto p-6">
        <div className="translate-y-8 transform opacity-0 transition-all duration-700 group-hover/bento:translate-y-0 group-hover/bento:opacity-100">
          <h3 className="mb-2 font-sans text-xl font-bold text-white">
            {title}
          </h3>
          {description && (
            <p className="translate-y-4 transform font-sans text-sm font-normal text-white/90 opacity-0 transition-all delay-100 duration-700 group-hover/bento:translate-y-0 group-hover/bento:opacity-100">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
