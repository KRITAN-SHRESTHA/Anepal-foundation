'use client';

import ContentTitle from '@/components/content-title';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { PopulatedTestimonialsList } from '@/types/testimonials-type';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const chunkArray = (
  array: PopulatedTestimonialsList[],
  chunkSize: number
): PopulatedTestimonialsList[][] => {
  const result: PopulatedTestimonialsList[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function TestimonialsSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <TestimonialsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function TestimonialsSectionSuspense() {
  const [data] = trpc.home.getHomeTestimonials.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  const testimonialChunks = chunkArray(
    data.select_testimonials,
    Math.ceil(data.select_testimonials.length / 3)
  );
  return (
    <section>
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <ContentTitle
              subtitle={data.subtitle}
              title={data.subtitle}
              highlightTitleText={data.highlightTitle}
            />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ role, user_name, content }, index) => (
                  <Card key={index} className="bg-transparent">
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3">
                      <Avatar className="size-9">
                        {/* <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        /> */}
                        <AvatarFallback>{user_name?.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="text-primary font-medium">
                          {user_name}
                        </h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role.name}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {getLocalizedString(content ?? [])}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
