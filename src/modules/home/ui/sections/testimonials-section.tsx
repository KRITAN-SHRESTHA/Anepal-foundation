import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Volunteer',
    image: '/testimonials/person1.jpg',
    quote:
      'Job Hub Nepal helped me land my dream job. The platform is user-friendly and the job listings are always up-to-date.'
  },
  {
    name: 'Priya Adhikari',
    role: 'Volunteer',
    image: '/testimonials/person2.jpg',
    quote:
      'As a hiring manager, I found great candidates through Job Hub Nepal. The quality of applicants is consistently high.'
  },
  {
    name: 'Bijay Tamang',
    role: 'Volunteer',
    image: '/testimonials/person3.jpg',
    quote:
      'The direct application process made job hunting so much easier. Found and secured my current position within weeks.'
  },
  {
    name: 'Sabina Gurung',
    role: 'Volunteer',
    image: '/testimonials/person4.jpg',
    quote:
      'Job Hub Nepal streamlined our hiring process. The platform helps us connect with qualified candidates efficiently. lorem lorem lorem lorem lorem lorem lorem'
  },
  {
    name: 'Meera Shrestha',
    role: 'Volunteer',
    company: 'Nepal Tech Solutions',
    image: '/testimonials/person6.jpg',
    quote:
      'I am really new to Tailwind and I want to give a go to make some page on my own. I searched a lot of hero pages and blocks online. However, most of them are not giving me a clear view or needed some HTML/CSS coding background to '
  },
  {
    name: 'Rajesh Thapa',
    role: 'Volunteer',
    image: '/testimonials/person5.jpg',
    quote:
      'The verification process gives confidence that the job postings are legitimate. Found my current role here!'
  },
  {
    name: 'Meera Shrestha',
    role: 'Volunteer',
    image: '/testimonials/person6.jpg',
    quote:
      'As an employer, the platform makes it easy to post jobs and manage applications. Highly recommended!'
  },
  {
    name: 'Rajesh Thapa',
    role: 'Volunteer',
    image: '/testimonials/person5.jpg',
    quote:
      'The verification process gives confidence that the job postings are legitimate. Found my current role here!'
  },
  {
    name: 'Rajesh Thapa',
    role: 'Volunteer',
    image: '/testimonials/person5.jpg',
    quote:
      'The verification process gives confidence that the job postings are legitimate. Found my current role here!'
  }
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

export default function TestimonialsSection() {
  return (
    <section>
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:text-5xl">
              What People Say About Us
            </h2>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index} className="bg-transparent">
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
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
