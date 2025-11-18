import { trpc } from '@/trpc/server';
import ContactDetailsSection from '../sections/contact-details-section';
import ContactFormSection from '../sections/contact-form-section';
import ContactTitleSection from '../sections/contact-title-section';
import ContactMap from '../components/contact-map';

export default async function ContactView() {
  await Promise.all([
    void trpc.settings.getSettings.prefetch(),
    void trpc.contact.getContactPage.prefetch()
  ]);

  return (
    <main>
      <ContactTitleSection />
      <div className="bg-white">
        <ContactDetailsSection />
      </div>
      <ContactMap />
      <div className="bg-white">
        <ContactFormSection />
      </div>
    </main>
  );
}
