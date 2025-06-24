import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

export default function ThankyouSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div className="py-[60px] md:py-[100px]">
      <h3 className="tablet:text-[250px] xs:text-[150px] text-center text-[110px] leading-[85%] font-medium text-yellow-500 sm:text-[200px]">
        Thank <br /> You
      </h3>
      <div className="mt-6 sm:-mt-[60px] sm:ml-[calc(45%-130px)]">
        <p className="w-full max-w-[20ch] text-[32px] leading-[80%] font-extrabold sm:text-[40px]">
          {getLocalizedString(data?.thankYouSection?.subtitle ?? [])}
        </p>
        <p className="text-muted-foreground max-w-[60ch] pt-3 sm:text-xl">
          {getLocalizedString(data?.thankYouSection?.description ?? [])}
        </p>
      </div>
    </div>
  );
}
