import Image from 'next/image';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex w-full items-center justify-center">
          <Image
            src={'/assets/404-Error-Page-not-Found.svg'}
            width={500}
            height={500}
            alt=""
          />
        </div>
      </body>
    </html>
  );
}
