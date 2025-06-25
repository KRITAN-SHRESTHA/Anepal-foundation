import { Skeleton } from '@/components/ui/skeleton';

export default function EventsPageTitleSkeleton() {
  return (
    <div className="flex w-full flex-col items-center">
      <Skeleton className="mb-[24px] h-[36px] w-[40%] lg:h-[40px]" />

      <div className="mx-auto mb-6 flex w-full flex-col items-center space-y-2 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-[80%]" />
        <Skeleton className="h-[20px] w-[70%]" />
      </div>
    </div>
  );
}
