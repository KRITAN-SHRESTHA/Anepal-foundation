import { trpc } from '@/trpc/server';
import ContactDetailsSection from '../sections/contact-details-section';
import ContactFormSection from '../sections/contact-form-section';
import ContactTitleSection from '../sections/contact-title-section';

export default async function ContactView() {
  await Promise.all([
    void trpc.settings.getSettings.prefetch(),
    void trpc.contact.getContactPage.prefetch()
  ]);

  return (
    <main>
      <ContactTitleSection />
      <section className="py-20 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col justify-between gap-10 md:flex-row lg:gap-20">
            <ContactDetailsSection />
            <ContactFormSection />
          </div>
        </div>
      </section>
    </main>
  );
}
