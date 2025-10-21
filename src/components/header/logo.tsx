import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';

import CustomImage from '../custom-image';
import { ErrorBoundary } from 'react-error-boundary';

export default function Logo({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <LogoSuspense className={className} />
    </ErrorBoundary>
  );
}

function LogoSuspense({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [settings] = trpc.settings.getSettings.useSuspenseQuery();

  return (
    <div className={cn('relative h-[56px] w-[100px] shrink-0', className)}>
      <CustomImage
        src={settings.foundation_logo}
        className="mix-blend-multiply"
        alt="Anepal Organization logo"
        sizes="20vw"
        fill
      />
    </div>
  );
}
