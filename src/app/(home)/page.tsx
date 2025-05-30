import Hero from '@/components/hero';

export default async function Home() {
  return (
    <div>
      <Hero />
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
