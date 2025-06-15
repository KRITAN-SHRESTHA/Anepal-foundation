import ContentTitle from '@/components/content-title';
import {
  LucideProps,
  School,
  Stethoscope,
  UtensilsCrossed,
  Wallet
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface DataType {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}

const data: DataType[] = [
  {
    icon: School,
    title: 'EDUCATION',
    description: 'Providing_all_children_with_access_to_a_quality_education'
  },
  {
    icon: UtensilsCrossed,
    title: 'NUTRITION',
    description: 'Ensuring_healthy_nutrient_rich_diet'
  },
  {
    icon: Wallet,
    title: 'FINANCIAL_SUPPORT',
    description:
      'Providing_sufficient_resources_for_a_stable_and_secure_life_so_they_focus__their_studies'
  },
  {
    icon: Stethoscope,
    title: 'MEDICAL_CARE',
    description: 'Improving_children_health_and_well_being'
  }
];

export default function HelpSection() {
  const t = useTranslations('Homepage');

  return (
    <div className="bg-accent mt-10 flex items-center justify-center py-12">
      <div>
        <ContentTitle
          title={'What we do'}
          subtitle={'We do it for People in need'}
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-screen-xl gap-6 px-4 sm:mt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {data?.map(feature => (
            <div
              key={feature.title}
              className="flex h-auto flex-col rounded-xl border border-gray-300 px-5 py-6"
            >
              <div className="bg-muted mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{t(feature.title)}</span>
              <p className="text-muted-foreground mt-1 text-[15px]">
                {t(feature.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
