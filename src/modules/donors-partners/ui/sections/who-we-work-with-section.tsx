import ContentTitle from '@/components/content-title';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

export default function WhoWeWorkWithSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <div className="tablet:flex-row tablet:items-center flex flex-col justify-between gap-9 py-[60px] sm:py-[100px]">
      <div>
        <ContentTitle
          title={data?.statsSection?.statsTitle}
          subtitle={data?.statsSection?.statsSubtitle}
        />
        <p className="text-muted-foreground tablet:max-w-[60ch] pt-6">
          {getLocalizedString(data?.statsSection?.partnersDescription ?? [])}
        </p>
      </div>
      <div className="xs:flex-nowrap flex flex-wrap gap-x-[60px] gap-y-[30px]">
        {data?.statsSection?.statistics?.map(stat => (
          <div key={stat._key}>
            <h3 className="text-center text-xl font-extrabold whitespace-nowrap">
              {getLocalizedString(stat.label ?? [])}
            </h3>
            <span className="xs:text-[80px] text-[70px] font-extrabold lg:text-[100px]">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
