import BannerSection from '@/modules/home/ui/sections/banner-section';

export default async function Home() {
  return (
    <div>
      <BannerSection />
    </div>
  );

  // return (
  //   <HydrateClient>
  //     <ErrorBoundary fallback={<div>Something went wrong</div>}>
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <ClientGreeting />
  //       </Suspense>
  //     </ErrorBoundary>
  //   </HydrateClient>
  // );
}
