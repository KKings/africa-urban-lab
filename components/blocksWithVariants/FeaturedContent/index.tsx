import { type FragmentType, getFragmentData } from "@/graphql/types";
import {
  FeaturedContentSectionFragmentDoc,
  ImageHeroSectionFragmentDoc,
} from "@/graphql/types/graphql";
import NextImage from "next/image";
import { GlobalPageProps } from "@/utils/globalPageProps";
import clsx from "clsx";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui";
import { Markdown } from "@/components/ui/markdown";
import Link from "next/link";

type Props = {
  fragment: FragmentType<typeof FeaturedContentSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const FeaturedContent = ({ fragment }: Props) => {
  const { title, features, bgColor, textColor, image } = getFragmentData(
    FeaturedContentSectionFragmentDoc,
    fragment
  );

  return (
    <Section
      title={title ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
    >
      <div className="flex flex-col space-y-8 lg:space-y-12">
        <div className="w-full relative">
          <NextImage
            src={image?.responsiveImage?.src ?? ""}
            alt={image?.responsiveImage?.alt ?? ""}
            height={image?.responsiveImage?.height}
            width={image?.responsiveImage?.width}
            className="inset-0 object-cover w-full h-full"
          />
        </div>
        <div className={clsx([
          "grid gap-8", 
          "lg:grid-cols-3 lg:gap-16"
        ])}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col space-y-6 md:space-y-8 text-center"
            >
              <Link href={feature.link.slug}>
                <Text as="h3" serif size="subheading">
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
