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
import SplitImageTextFullWidth from '@/components/blocksWithVariants/SplitImageText/FullWidth';
import AccordionSection from '@/components/blocksWithVariants/Accordion';
import CourseTable from '@/components/blocksWithVariants/CourseTable';
import FeaturedContent from '@/components/blocksWithVariants/FeaturedContent';
import StaffGrid from '@/components/blocksWithVariants/StaffGrid';
import SplitImageTextBoxed from '@/components/blocksWithVariants/SplitImageText/Boxed';
import { SplitImageTextSectionFragment } from '@/graphql/types/graphql';
import CardGrid from '@/components/blocksWithVariants/CardGrid';
import BannerCTA from '@/components/blocksWithVariants/BannerCTA';
import FeautredBlogPostsGrid from '@/components/blocksWithVariants/FeaturedBlogPostsGrid';
import PageTitle from '@/components/blocksWithVariants/PageTitle';

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
          case 'PageTitleSectionRecord': {
            return (
              <PageTitle fragment={section} globalPageProps={globalPageProps} />
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
            switch ((section as unknown as SplitImageTextSectionFragment).displayVariant) {
              case 'boxed': {
                return (
                  <SplitImageTextBoxed fragment={section} globalPageProps={globalPageProps} />
                )
              }
              default: {
                return (
                  <SplitImageTextFullWidth fragment={section} globalPageProps={globalPageProps} />
                )
              }
            }
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
          case 'StaffSectionRecord': {
            return (
              <StaffGrid fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'CardSectionRecord': {
            return (
              <CardGrid fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'BannerCtaSectionRecord': {
            return (
              <BannerCTA fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'FeaturedBlogPostsSectionRecord': {
            return (
              <FeautredBlogPostsGrid fragment={section} globalPageProps={globalPageProps} />
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
