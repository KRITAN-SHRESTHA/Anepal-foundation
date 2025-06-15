import ContentTitle from '@/components/content-title';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function MemoriesCollection() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-16 lg:px-8">
      <ContentTitle subtitle={'Nuestra Historia'} align="center" />

      <div className="mt-14 grid items-center gap-12">
        {items.map((item, idx) => {
          return (
            <div
              key={item.title}
              className="grid w-full gap-12 lg:grid-cols-2 lg:py-0"
            >
              <div
                className={cn(
                  'my-auto',
                  idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                )}
              >
                {/* name */}
                <h2 className="text-primary text-4xl font-semibold tracking-tight md:text-4xl">
                  {item.title}
                </h2>
                {/* description */}
                <p className="text-card-foreground mt-5 line-clamp-6 text-lg md:mt-6">
                  {item.description}
                </p>

                <p className="text-muted-foreground mt-4 font-medium">
                  - {item.name}
                </p>
                {/* name of the person */}
              </div>
              <div
                className={cn(
                  'h-[400px] w-full',
                  idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                )}
              >
                <Image
                  src={item.image}
                  width={450}
                  height={400}
                  alt="img"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const items = [
  {
    title: 'Una vida de cine',
    description:
      'Born in Nepal, Humla, on April 3, 1997. At the age of 7, he was orphaned by his father and mother, raising himself in an orphanage in Kathmandu..',
    image: '/assets/hall_of_fame/dhanaraj.jpg',
    name: 'Dhanraj Barkote'
  },
  {
    title: 'Ingeniero Informático',
    description:
      'Hola, mi nombre es Dharmajit, pero me llaman Dharma. Soy ingeniero de software. Tengo buena experiencia trabajando en la industria de TI. Mi camino en el campo de la tecnología comenzó con la licenciatura en Ciencias de la Computación de una reconocida universidad, gracias al generoso apoyo de ANepal. Estoy profundamente agradecido a mis sponsors Manu y Nekane por su apoyo inquebrantable, que ha sido fundamental para dar forma a mi carrera y mis logros. Me gustaría animar a las personas a unirse a la fundación ANepal, una organización comprometida con extender una mano amiga a niños huérfanos y desfavorecidos. Al brindar su apoyo, puede ayudar a darles a estos niños acceso a la educación y a sus necesidades básicas, convirtiéndose en un faro de esperanza en su búsqueda de un futuro mejor. Gracias',
    image: '/assets/our_story/dharmajit_budha.jpg',
    name: 'Dharmajit Budhathoki'
  },
  {
    title: 'Farmaceutico',
    description: `TEK BAHADUR LAMA, terminó sus estudios de Farmacia y ya reside fuera de la residencia. En este inicio de su nueva vida de momento ha decidido compartir vivienda con amigos, ha conseguido trabajo en una farmacia y ya es independiente. Tek, corazón, te deseamos toda la felicidad y la suerte del mundo!!! Alguien tan bondadoso como tu es lo mínimo que se merece. Te queremos !!! Fundación ANepal,25 de noviembre. Saludos muy cálidos desde Nepal. Yo mismo Tek Bahadur Lama, Me gustaría agradecer a la fundación ANepal por brindarme una oportunidad de oro para construir mi vida y mi carrera. Me siento muy afortunado porque obtuve un gran apoyo en mi programa académico. Ahora, acabo de terminar mi Licenciatura en Farmacia. Me siento orgulloso de que puedo hacer algo mejor en el futuro. Agradezco de corazón a mi amada madre 'Cristina Marti Roca' por apoyarme en todos y cada uno de los pasos de mi vida. Ella es mi madre dotada de Dios y respeto su cuidado, amor y afecto. Desearía poder ser un buen hijo y poder ayudar a la Fundación ANepal a su lado también... Estoy preocupado por mis hermanos y hermanas pequeños, que tendrán o no tendrán la misma oportunidad. Y les prometo que estaré allí cuando la Fundación ANepal me necesite. Y apoyaré a mis hermanos y hermanas pequeños tanto como pueda en el futuro. ¡¡Espero que nos encontremos pronto!! Gracias !!`,
    image: '/assets/hall_of_fame/tek_dai.jpg',
    name: 'Tek Bahadur Lama'
  },
  {
    title: 'Ingenieroo Informático',
    description:
      'Gracias por darme un regalo que cambia la vida. No sé por dónde empezar o terminar para expresar lo agradecido que estoy con esta organización. Llegué aquí como un niño confundido que había perdido a sus padres que significaban el mundo para mí y mi sentido de esperanza. Estaba ansioso y emocionado de mudarme aquí porque me prometían una vida mejor, llena de posibilidades. Al principio de ese tiempo, sé que es realmente difícil entender lo que esto significaba, sin embargo, sabía que no tendría que irme a la cama con hambre o pensar de dónde vendría mi próxima comida, como en el tiempo en que mis padres solían proveernos había pasado, la vida en el hogar se había vuelto miserable. Estoy tan agradecido por brindarme un refugio seguro y eliminar todos mis miedos e inquietudes que tenía en la vida antes de la fundación Anepal. Mis pesadillas se transformaron en sueños reales que hasta ahora he podido realizar y que seguiré haciendo. No puedo decir que no haya tenido desafíos, pero puedo decir con confianza que lo que representas y el entornos familiar que me has brindado siempre me alientan a superar estos obstáculos. En cada paso de mi vida, se han utilizado distintas maneras para moldear u fortalecer mi carácter y rejuvenecer mi esperanza en momentos en que me sentía desesperado. En esto, me presento como evidencia del trabajo que hace la fundacion para brindar estas oportunidades que cambian la vida de todos los que vivimos aquí. Me gustaría agradecer desde el fondo de mi corazón por dejarnos soñar de nuevo nuestros sueños y hacerlos realidad. Quisiera hacer una mención especial a mi Mamá [Fundación Anepal], Cristina Marti Roca. He visto tanto amor y sigo viendo tanto amor de ella y estoy muy agradecida de tener a alguien como ella en mi vida. gracias, mamá Hay tanto que puedo decir sobre lo agradecido que estoy, como dije, no sé por dónde empezar o terminar, pero al aventurarme en esta nueva etapa de mi vida, estoy agradecido. Estoy agradecido porque me han brindado tantas oportunidades para realizar mis sueños. Estoy agradecido porque hoy me enorgullezco de pertenecer a una familia amorosa gracias a ti. Estoy agradecido porque siempre seré parte de la fundación Anepal y tendré una familia. Puedo decir con orgullo que la fundación Anepal es el hogar amoroso de todo niño. Aprecio que me hayas dado el conocimiento y la confianza que necesito para enfrentarme al mundo de frente. Estoy agradecido de que ya no tengo miedo de cómo es la vida fuera de la fundación. Rezo para que sigas mostrando tanto amor y generosidad a quienes me precedieron y me siguieron, y que aprovechen cada oportunidad que les brindes y logren sus objetivos. Gracias. Con amor, Kritan Shrestha',
    image: '/assets/our_story/kritan_shrestha.jpg',
    name: 'Kritan Shrestha'
  },
  {
    title: 'Gestion Hotelera',
    description:
      'Saludos muy cálidos desde Nepal.Yo mismo Ajaya Bom. Me gustaría agradecer a la fundación ANepal por brindarme esta oportunidad. La fundación Anepal han sido todos los pasos de mi vida para ayudar a mi carrera y construir una vida progresiva. Ahora me he convertido en un hombre y una persona que puede trabajar en la vida profesional real. Actualmente estoy realizando una pasantía en la Licenciatura en Administración Hotelera. Me siento muy orgullosa de ser parte de la fundación Anepal. Un agradecimiento especial a mi madre Cristina, quien me apoya desde la niñez, que me cuida como una semilla a su flor. Espero que la Fundación Anepal continúe con sus obras y ayude a mis hermanas y hermanos. Siempre deseo que tengan un buen futuro y construyan una carrera en su vida como nosotros. Prometo y deseo ayudar a la Fundación Anepal en su futuro. Espero verte pronto. Gracias',
    image: '/assets/hall_of_fame/ajaya.jpg',
    name: 'Aajya Boom'
  }
];
