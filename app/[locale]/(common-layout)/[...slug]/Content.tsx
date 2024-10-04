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
import FeaturedPublicationsGrid from '@/components/blocksWithVariants/FeaturedPublicationsGrid';

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
              <LogoCarousel key={section.id} fragment={section} globalPageProps={globalPageProps} />
            );
          }
          case 'TextSectionRecord': {
            return (
              <TextSection key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'LecturersSectionRecord': {
            return (
              <LecturerGrid key={section.id} fragment={section} globalPageProps={globalPageProps} />
            );
          }
          case 'PageImageTitleSectionRecord': {
            return (
              <PageImageTitle key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'PageTitleSectionRecord': {
            return (
              <PageTitle key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'BorderDividerRecord': {
            return (
              <BorderDivider key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'ImageHeroSectionRecord': {
            return (
              <ImageHero key={section.id} fragment={section} globalPageProps={globalPageProps} />
            );
          }
          case 'SplitImageTextSectionRecord': {
            switch ((section as unknown as SplitImageTextSectionFragment).displayVariant) {
              case 'boxed': {
                return (
                  <SplitImageTextBoxed key={section.id} fragment={section} globalPageProps={globalPageProps} />
                )
              }
              default: {
                return (
                  <SplitImageTextFullWidth key={section.id} fragment={section} globalPageProps={globalPageProps} />
                )
              }
            }
          }
          case 'AccordionSectionRecord': {
            return (
              <AccordionSection key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'CourseTableSectionRecord': {
            return (
              <CourseTable key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'FeaturedContentSectionRecord': {
            return (
              <FeaturedContent key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'StaffSectionRecord': {
            return (
              <StaffGrid key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'CardSectionRecord': {
            return (
              <CardGrid key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'BannerCtaSectionRecord': {
            return (
              <BannerCTA key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'FeaturedBlogPostsSectionRecord': {
            return (
              <FeautredBlogPostsGrid key={section.id} fragment={section} globalPageProps={globalPageProps} />
            )
          }
          case 'FeaturedPublicationsSectionRecord': {
            return (
              <FeaturedPublicationsGrid key={section.id} fragment={section} globalPageProps={globalPageProps} />
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
