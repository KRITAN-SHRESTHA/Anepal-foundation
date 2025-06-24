import ContentTitle from '@/components/content-title';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import CustomImage from '@/components/custom-image';

export default function WhoHelpUsSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div className="py-[60px] sm:py-[100px]">
      <div className="grid justify-center">
        <ContentTitle
          title={data?.whoHelpUsSection?.title}
          subtitle={data?.whoHelpUsSection?.subtitle}
          align="center"
        />
        <p className="text-muted-foreground max-w-[60ch] pt-6 text-center">
          {getLocalizedString(data?.whoHelpUsSection?.description ?? [])}
        </p>
      </div>

      <div className="m-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-10">
        {data?.whoHelpUsSection.partnersName.map(partner => (
          <div className="relative h-[100px] w-[200px]" key={partner._id}>
            <CustomImage
              className="h-full w-full object-contain"
              src={partner.partnersLogo}
              alt="Nvidia Logo"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}
