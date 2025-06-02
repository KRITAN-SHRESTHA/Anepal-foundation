import Image from 'next/image';

export default function PartnersSection() {
  return (
    <section className="bg-accent mt-[100px]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div>
          <p className="text-muted-foreground text-center font-semibold">
            Who help us
          </p>
          <h2 className="text-center text-4xl font-bold md:text-5xl">
            Our Partners & Donors
          </h2>

          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-8">
            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/nvidia.svg"
              alt="Nvidia Logo"
              height={200}
              width={200}
            />
            {/* </div> */}

            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/column.svg"
              alt="Column Logo"
              height="16"
              width={200}
            />
            {/* </div> */}
            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/github.svg"
              alt="GitHub Logo"
              height="16"
              width={200}
            />
            {/* </div> */}
            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/nike.svg"
              alt="Nike Logo"
              height="20"
              width={200}
            />
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
