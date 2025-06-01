import HomeView from '@/modules/home/ui/views/home-view';

export default async function Home() {
  return (
    <>
      <HomeView />
    </>
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
