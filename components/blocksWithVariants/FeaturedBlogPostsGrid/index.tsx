import { type FragmentType, getFragmentData } from "@/graphql/types";
import NextImage from "next/image";
import {
  CardSectionFragmentDoc,
  FeaturedBlogPostsSectionFragmentDoc,
} from "@/graphql/types/graphql";
import { buildUrl, GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { cn } from "@/components/utils";
import { Button, Text } from "@/components/ui";
import Link from "next/link";
import clsx from "clsx";
import transformDate from "@/utils/transformDate";

type Props = {
  fragment: FragmentType<typeof FeaturedBlogPostsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const FeautredBlogPostsGrid = ({ fragment, globalPageProps }: Props) => {
  const {
    title,
    text,
    posts = [],
    link,
    sectionImage: bgImage,
    bgColor,
    textColor,
  } = getFragmentData(FeaturedBlogPostsSectionFragmentDoc, fragment);

  return (
    <Section
      title={title ?? ""}
      description={text ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
      className="space-y-w16"
      style={{
        backgroundImage: `url(${bgImage?.url ? bgImage?.url : ""})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container flex flex-col items-center space-y-8">
        <div className={cn("flex flex-wrap", "gap-6 w-full justify-center")}>
          {posts.map((item) => (
            <div
              key={item.id}
              className={cn("w-full md:basis-1/2-gap-6 lg:basis-1/3-gap-6 ")}
            >
              <div
                className={clsx([
                  {'pt-12': !item?.promoImage?.responsiveImage?.src},
                  { 'pt-[10px]': item?.promoImage?.responsiveImage?.src },
                  "flex flex-col relative",
                  " pr-12 pl-12 pb-20 h-full space-y-4",
                  "shadow-md bg-white",
                  "before:content-['_'] before:-ml-12 before:bg-[url(/images/section-bg.png)] before:absolute before:w-full before:h-2.5 before:bg-cover before:bg-no-repeat before:top-0",
                  "before:bg-theme-citron",
                ])}
              >
                <div className="mb-2 border-b border-body-color border-opacity-10 pb-4 space-y-4">
                  {item?.promoImage?.responsiveImage?.src && (
                    <NextImage
                      src={item?.promoImage?.responsiveImage?.src ?? ""}
                      alt={item.promoImage?.responsiveImage?.alt ?? ""}
                      sizes={item?.promoImage?.responsiveImage?.sizes}
                      width={item?.promoImage?.responsiveImage?.width ?? 346}
                      height={item?.promoImage?.responsiveImage?.height ?? 230.67}
                      quality={100}
                      className={clsx([
                        "-ml-12 w-[calc(100%+6rem)] max-w-[calc(100%+6rem)]",
                        "object-cover h-auto mb-6"
                      ])}
                    />
                  )}
                  <Text as="p" size="meta" weight="bold">
                    {item.author?.name}
                  </Text>
                </div>
                {item._publishedAt && (
                  <Text size="meta" weight="semi" className="mb-2">
                    {transformDate(item._publishedAt)}
                  </Text>
                )}
                <Text caps size="large" weight="bold">
                  {item.title}
                </Text>
                {item.description && (
                  <Text as="div" size="base">
                    {item.description}
                  </Text>
                )}
                <Link
                  href={buildUrl(globalPageProps, `/blog/${item.slug}`)}
                  className="underline absolute bottom-[2rem]"
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

export default FeautredBlogPostsGrid;
