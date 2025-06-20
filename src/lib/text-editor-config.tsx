import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';

export const textEditorComponentsConfig: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // hide image in list section
      // if (value) return null;
      return (
        <div className="relative aspect-video">
          <Image
            src={urlFor(value).quality(80).url()}
            fill
            alt={value.alt}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            quality={100}
          />
        </div>
      );
    },
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      )
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <a
          className="font-semibold underline underline-offset-2"
          href={value.href}
          rel={rel}
        >
          {children}
        </a>
      );
    }
  },
  block: {
    h1: ({ children }) => (
      <h1 className="my-5 text-5xl font-bold text-pretty md:text-6xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-5 text-3xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-5 text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="my-5 text-xl font-semibold">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground my-3 text-base">{children}</p>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground my-3 text-base">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-s-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-muted-foreground list-inside list-disc space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-inside list-decimal space-y-2 text-gray-500">
        {children}
      </ol>
    ),
    checkmarks: ({ children }) => (
      <ol className="list-inside list-none space-y-2 text-gray-500">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-primary pl-5 [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-primary pl-5 [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </li>
    ),
    checkmarks: ({ children }) => (
      <li className="text-primary pl-5 [&_ul]:space-y-2 [&_ul]:pl-5">
        ✅ &nbsp; {children}
      </li>
    )
  }
};
