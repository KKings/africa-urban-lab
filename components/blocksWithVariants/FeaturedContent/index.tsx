import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeaturedContentSectionFragmentDoc } from "@/graphql/types/graphql";
import NextImage from "next/image";
import { GlobalPageProps } from "@/utils/globalPageProps";
import clsx from "clsx";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui";
import { Markdown } from "@/components/ui/markdown";
import Link from "next/link";
import { Grid } from "@/components/types";

type Props = {
  fragment: FragmentType<typeof FeaturedContentSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const FeaturedContent = ({ fragment }: Props) => {
  const {
    title,
    features,
    bgColor,
    textColor,
    image,
    grid = "three",
  } = getFragmentData(FeaturedContentSectionFragmentDoc, fragment);

  return (
    <Section
      title={title ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
    >
      <div className="flex flex-col space-y-8 lg:space-y-12">
        {image?.responsiveImage?.src && (
          <div className="w-full relative">
            <NextImage
              src={image?.responsiveImage?.src ?? ""}
              alt={image?.responsiveImage?.alt ?? ""}
              height={image?.responsiveImage?.height}
              width={image?.responsiveImage?.width}
              className="inset-0 object-cover w-full h-full"
            />
          </div>
        )}
        <div className={clsx(["flex flex-row flex-wrap gap-8 justify-center"])}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={clsx([
                "flex flex-col space-y-6 md:space-y-8 text-center",
                { "md:w-[calc(50%-4rem)]": grid === Grid.two },
                { "md:w-[calc(33%-4rem)]": grid === Grid.three },
                {
                  "md:w-[calc(33%-3rem)] lg:w-[calc(25%-3rem)]":
                    grid === Grid.four,
                },
                {
                  "md:w-[calc(33%-2rem)] lg:w-[calc(20%-2rem)]":
                    grid === Grid.five,
                },
              ])}
            >
              {feature?.image?.responsiveImage?.src && (
                <div className="relative flex justify-center">
                  <NextImage
                    src={feature?.image?.responsiveImage?.src ?? ""}
                    alt={feature?.image?.responsiveImage?.alt ?? ""}
                    sizes={feature?.image?.responsiveImage?.sizes}
                    width={feature?.image?.responsiveImage?.width}
                    height={feature?.image?.responsiveImage?.height}
                    className="object-cover"
                    style={{ height: "auto" }}
                  />
                </div>
              )}
              <Link href={feature.link.slug}>
                <Text as="h3" size="subheading">
                  {feature.title}
                </Text>
              </Link>
              <Markdown className="text-base text-center text-balance space-y-w4">
                {feature.text ?? ""}
              </Markdown>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedContent;
