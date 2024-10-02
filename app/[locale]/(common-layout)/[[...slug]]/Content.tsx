import type { ContentPage } from '@/components/WithRealTimeUpdates/types';
import LogoCarousel from '@/components/blocksWithVariants/LogoCarousel';
import { buildUrl } from '@/utils/globalPageProps';
import { notFound, redirect } from 'next/navigation';
import type { PageProps, Query } from './meta';
import LecturerGrid from '@/components/blocksWithVariants/LecturerGrid';
import PageImageTitle from '@/components/blocksWithVariants/PageImageTitle';
import TextSection from '@/components/blocksWithVariants/TextSection';
import BorderDivider from '@/components/blocksWithVariants/BorderDivider';
import ImageHero from '@/components/blocksWithVariants/ImageHero';
import SplitImageText from '@/components/blocksWithVariants/SplitImageText';
import AccordionSection from '@/components/blocksWithVariants/Accordion';
import CourseTable from '@/components/blocksWithVariants/CourseTable';
import FeaturedContent from '@/components/blocksWithVariants/FeaturedContent';

const Content: ContentPage<PageProps, Query> = ({
  data,
  ...globalPageProps
}) => {
  if (!data.page) {
    notFound();
  }

  return (
    <>
      {data.page.sections.map((section) => {
        switch (section.__typename) {
          case 'LogoCarouselSectionRecord': {
            return (
              <LogoCarousel fragment={section} globalPageProps={globalPageProps} />
            );
          }
          case 'TextSectionRecord': {
            return (
              <TextSection fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'LecturersSectionRecord': {
            return (
              <LecturerGrid fragment={section} globalPageProps={globalPageProps} />
            );
          }
          case 'PageImageTitleSectionRecord': {
            return (
              <PageImageTitle fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'BorderDividerRecord': {
            return (
              <BorderDivider fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'ImageHeroSectionRecord': {
            return (
              <ImageHero fragment={section} globalPageProps={globalPageProps} />
            );
          }
          case 'SplitImageTextSectionRecord': {
            return (
              <SplitImageText fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'AccordionSectionRecord': {
            return (
              <AccordionSection fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'CourseTableSectionRecord': {
            return (
              <CourseTable fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'FeaturedContentSectionRecord': {
            return (
              <FeaturedContent fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'RedirectSectionRecord': {
            if (section?.slugToRedirectTo) {
              const redirectSectionRecord = section;
              redirect(
                buildUrl(
                  globalPageProps,
                  `/${redirectSectionRecord.slugToRedirectTo}`,
                ),
              );
            }
            return null;
          }
          default:
            return null;
        }
      })}
    </>
  );
};

export default Content;
