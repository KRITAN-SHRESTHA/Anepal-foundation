import { motion } from 'motion/react';
import CustomImage from '@/components/custom-image';
import EnhancedTitle from '@/components/enhanced-title';
import { Badge } from '@/components/ui/badge';
import useGetLocale from '@/hooks/use-get-locale';
import { PopulatedBlogDetails } from '@/types/blogs-types';
import { format } from 'date-fns';

export default function BlogDetailsHeaderSection({
  data
}: {
  data: PopulatedBlogDetails;
}) {
  const { getLocalizedString } = useGetLocale();

  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Badge
            variant={'secondary'}
            className="bg-[#f0dd87] text-sm text-black"
          >
            {getLocalizedString(data.tag.name ?? [])}
          </Badge>
          <span className="text-muted-foreground pl-4 text-right text-sm whitespace-nowrap">
            {format(new Date(data._createdAt), 'MMM dd, yyyy')}
          </span>
        </motion.div>
        <EnhancedTitle text={data.title} />
      </div>
      <motion.div
        className="relative my-12 h-[550px] w-full shrink-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {data.mainImage && (
          <CustomImage
            src={data.mainImage}
            alt={`${getLocalizedString(data.title ?? [])} image`}
            sizes="100vw"
            fill
            className="rounded-lg border object-cover"
            quality={100}
          />
        )}
      </motion.div>
    </div>
  );
}
