import { type FragmentType, getFragmentData } from "@/graphql/types";
import NextImage from "next/image";
import {
  CardSectionFragmentDoc,
  FeaturedBlogPostsSectionFragmentDoc,
  FeaturedPublicationsSectionFragmentDoc,
} from "@/graphql/types/graphql";
import { buildUrl, GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { cn } from "@/components/utils";
import { Button, Text } from "@/components/ui";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  fragment: FragmentType<typeof FeaturedPublicationsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const FeaturedPublicationsGrid = ({ fragment, globalPageProps }: Props) => {
  const {
    title,
    text,
    posts = [],
    bgColor,
    textColor,
  } = getFragmentData(FeaturedPublicationsSectionFragmentDoc, fragment);

  return (
    <Section
      title={title ?? ""}
      description={text ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
      className="space-y-w16"
    >
      <div className="container">
        <div
          className={cn(
            "flex flex-wrap",
            "gap-6 w-full justify-center"
          )}
        >
          {posts.map((item) => (
            <div
              key={item.id}
              className={cn(
                "w-full md:basis-1/2-gap-6 xl:basis-1/3-gap-6 "
              )}
            >
              <div className={clsx([
                "flex flex-col relative",
                "p-12 pb-20 h-full space-y-4",
                "shadow-md  bg-white",
              ])}>
                <Text caps size="large" weight="bold">
                  {item.title}
                </Text>
                <Link 
                  href={buildUrl(globalPageProps, `/publications/${item.slug}`)} 
                  className="underline"
                >
                  <Text size="base" className="underline absolute bottom-0 pb-[inherit]" style={{
                    transform: 'translateY(-210%)'
                  }}>
                    Read More
                  </Text>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedPublicationsGrid;