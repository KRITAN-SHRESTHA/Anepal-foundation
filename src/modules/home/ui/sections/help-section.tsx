import React from 'react';
import { School, UtensilsCrossed, Wallet, Stethoscope } from 'lucide-react';
const features = [
  {
    icon: School,
    title: 'EDUCACION',
    title_en: 'EDUCATION',
    description:
      'Ofrecer a todos los/as niñ@s acceso a una educación de calidad',
    description_en: 'Providing all children with access to a quality education.'
  },
  {
    icon: UtensilsCrossed,
    title: 'NUTRICION',
    title_en: 'NUTRITION',
    description: 'Asegurar una alimentación saludable y rica en nutrientes.',
    description_en: 'Ensuring a healthy, nutrient-rich diet.'
  },
  {
    icon: Wallet,
    title: 'SOPORTE ECONOMICO',
    title_en: 'FINANCIAL SUPPORT ',
    description:
      'Aportar los recursos suficientes para una vida estable y segura para poder centrarse en sus estudios.',
    description_en:
      'Providing sufficient resources for a stable and secure life so they can focus on their studies.'
  },
  {
    icon: Stethoscope,
    title: 'ATENCION MEDICA',
    title_en: 'MEDICAL CARE',
    description: 'Mejorar la salud y el bienestar infantil.',
    description_en: `Improving children's health and well-being.`
  }
];

export default function HelpSection() {
  return (
    <div className="bg-accent mt-10 flex items-center justify-center py-12">
      <div>
        {/* Our help consists of... */}
        <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Nuestra ayuda consiste en...
        </h2>
        <div className="mx-auto mt-10 grid max-w-screen-xl gap-6 px-4 sm:mt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {features.map(feature => (
            <div
              key={feature.title}
              className="flex h-auto flex-col rounded-xl border px-5 py-6"
            >
              <div className="bg-muted mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="text-foreground/80 mt-1 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
