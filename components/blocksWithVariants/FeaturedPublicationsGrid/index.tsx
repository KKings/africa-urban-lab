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
    sectionImage: bgImage,
    textColor,
    link,
  } = getFragmentData(FeaturedPublicationsSectionFragmentDoc, fragment);

  return (
    <Section
      title={title ?? ""}
      description={text ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
      className="space-y-w16"
      style={{
        backgroundImage: `url(${bgImage?.url ? bgImage?.url : ''})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container flex flex-col items-center space-y-8">
        <div className={cn("flex flex-wrap", "gap-6 w-full justify-center")}>
          {posts.map((item) => (
            <div
              key={item.id}
              className={cn(
                "w-full md:basis-1/2-gap-6 xl:basis-1/2-gap-6 relative"
              )}
            >
              <div
                className={clsx([
                  "flex flex-col relative",
                  "px-12 pt-12 pb-20 h-full space-y-4",
                  "shadow-md  bg-white",
                  "before:content-['_'] before:-ml-12 before:bg-[url(/images/section-bg.png)] before:absolute before:w-full before:h-2.5 before:bg-cover before:bg-no-repeat before:top-0",
                  "before:bg-theme-turquoise",
                ])}
              >
                <div className="mb-2 border-b border-body-color border-opacity-10 pb-4">
                  <Text as="p" size="meta" weight="bold">
                    {item.author?.name}
                  </Text>
                </div>
                <Text caps size="large" weight="bold">
                  {item.title}
                </Text>
                <Link
                  href={buildUrl(globalPageProps, `/publications/${item.slug}`)}
                  className="underline absolute bottom-[2.5rem]"
                >
                  <Text size="base" className="underline pb-[inherit]">
                    Read More
                  </Text>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {link?.url && (
          <Button
            asChild
            variant="outline"
            size="default"
            className="w-max self-center text-center"
          >
            <Link href={link?.url}>{link?.label || "Read More"}</Link>
          </Button>
        )}
      </div>
    </Section>
  );
};

export default FeaturedPublicationsGrid;
