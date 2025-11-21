import Image from 'next/image';

import CustomImage from '@/components/custom-image';
import useGetLocale from '@/hooks/use-get-locale';
import { cn, LocalisedDataType } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import useGetAllStories from '../hooks/use-get-all-stories';

export default function StoriesListSection() {
  const { getLocalizedString } = useGetLocale();
  const { stories, pagination } = useGetAllStories();
  const t = useTranslations('Default');

  if (stories.length === 0) {
    return <h1 className="py-10 text-center">{t('No_stories_found')}</h1>;
  }

  const convertedDescription = (text: LocalisedDataType[]) =>
    getLocalizedString(text ?? []);

  return (
    <div>
      {stories.map((story, idx) => {
        const splitName = story.name?.split(' ');
        const firstName = splitName && splitName[0];
        const lastname = splitName?.slice(1, splitName.length).join(' ');

        const numbering = (pagination.page - 1) * pagination.pageSize + idx + 1;

        const description = convertedDescription(story.description!);

        return (
          <motion.div
            key={story._id}
            className={
              'tablet:grid-cols-2 grid w-full items-center gap-x-12 gap-y-8 py-[20px]'
            }
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
          >
            <motion.div
              className={cn('relative order-2 overflow-hidden p-2', {
                'tablet:order-1 order-2': (idx + 1) % 2 === 0, // even
                'order-2': (idx + 1) % 2 !== 0 // odd
              })}
              initial={{
                opacity: 0,
                scale: 0.9,
                x: (idx + 1) % 2 === 0 ? 30 : -30
              }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1 + 0.2,
                ease: 'easeOut'
              }}
            >
              <Image
                className="mix-blend-multiply"
                src={`/assets/story/story-bg-img-${(idx % 4) + 1}.png`}
                fill
                alt=""
              />
              <div className="relative z-10 aspect-square w-full overflow-hidden">
                <CustomImage
                  className="laptop:p-[80px] tablet:p-[60px] xs:p-[60px] h-full w-full object-cover p-[40px] sm:p-[80px]"
                  src={story.image}
                  alt={story.name ?? ''}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
            <motion.div
              className={cn('', {
                'tablet:order-2 order-1': (idx + 1) % 2 === 0, // even
                'order-1': (idx + 1) % 2 !== 0 // odd
              })}
              initial={{ opacity: 0, x: (idx + 1) % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1 + 0.3,
                ease: 'easeOut'
              }}
            >
              {/* <strong className="text-muted-foreground/60"> */}
              <motion.strong
                className="text-muted-foreground"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
              >
                {pagination.page == 1
                  ? numbering == 10
                    ? numbering
                    : `0${numbering}`
                  : numbering}
              </motion.strong>
              <motion.div
                className="text-[32px] text-gray-900 md:text-[50px]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 + 0.5 }}
              >
                <b>{firstName}</b>&nbsp;
                <b>{lastname}</b>
              </motion.div>

              {description ? (
                <motion.p
                  className="text-muted-foreground pt-7 text-lg leading-[135%]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.6 }}
                >
                  <span className="whitespace-pre-line">
                    {description?.slice(0, 300)}
                  </span>
                  {description?.length > 300 && (
                    <>
                      ... &nbsp;
                      <Dialog>
                        <DialogTrigger>
                          <button className="cursor-pointer font-medium underline-offset-1 hover:underline">
                            {t('See_more')}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] w-full max-w-[800px]! overflow-y-auto px-[25px] py-[50px] sm:p-[50px]">
                          <DialogTitle className="text-[30px] text-gray-900">
                            <b>
                              {firstName}&nbsp;
                              {lastname}
                            </b>
                          </DialogTitle>
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                description?.replaceAll('\n', '<br/>') || ''
                            }}
                            className="text-muted-foreground"
                          ></p>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </motion.p>
              ) : null}

              {/* <div className="tablet:mt-12 mt-6 flex items-center gap-4">
                <NavigationLink href={`/stories/${story.slug?.current}`}>
                  <Button
                    variant="outline"
                    className="rounded-full !px-5 text-base shadow-none [&_svg]:!size-4"
                    border={'purple'}
                  >
                    <BookOpen className="!h-5 !w-5" /> Read Story
                  </Button>
                </NavigationLink>
              </div> */}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
