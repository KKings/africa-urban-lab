import Link from "next/link";
import NextImage from "next/image";
import clsx from "clsx";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitImageTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Markdown } from "@/components/ui/markdown";
import { Button, Text } from "@/components/ui";
import { Section } from "@/components/ui/section";
import { ImageAlignment, ImageGrid, TextVariants } from "@/components/types";
import { IMAGE_SIZES } from "../constants";
import { ImageCarousel } from "../ImageCarousel";

type Props = {
  fragment: FragmentType<typeof SplitImageTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const SplitImageTextBoxed = ({ fragment }: Props) => {
  const {
    splitImageTitle: title,
    splitImageText: text,
    images,
    imageAlignment,
    imageGrid = ImageGrid["2/5"],
    bgColor,
    textColor,
    textVariant,
    link,
  } = getFragmentData(SplitImageTextSectionFragmentDoc, fragment);

  const vars = {
    "--image-grid-size": imageGrid
      ? IMAGE_SIZES[imageGrid as ImageGrid]
      : IMAGE_SIZES[ImageGrid["2/5"]],
  } as React.CSSProperties;

  const useCarousel = images.length > 1;

  return (
    <Section bgColor={bgColor?.hex}>
      <div
        className={clsx([
          "grid grid-flow-row md:grid-flow-column gap-16 items-center",
          "bg-theme-grey text-background 100dvh md:h-auto",
          {
            ['md:grid-cols-[var(--image-grid-size)_auto] md:[grid-template-areas:"image_text"]']:
              imageAlignment === ImageAlignment.Left,
          },
          {
            ['md:grid-cols-[auto_var(--image-grid-size)] md:[grid-template-areas:"text_image"]']:
              imageAlignment === ImageAlignment.Right,
          },
        ])}
        style={{
          backgroundColor: bgColor?.hex ?? "",
          ...vars,
        }}
      >
        <div className="w-full relative md:[grid-area:image] md:justify-center">
          {!useCarousel ? (
            <NextImage
              src={images?.[0]?.responsiveImage?.src ?? ""}
              alt={images?.[0]?.responsiveImage?.alt ?? ""}
              height={images?.[0]?.responsiveImage?.height}
              width={images?.[0]?.responsiveImage?.width}
              className="inset-0 w-full h-auto"
            />
          ) : (
            <ImageCarousel images={images} />
          )}
        </div>
        <div
          className={clsx([
            "flex flex-col text-center md:justify-center",
            "space-y-8",
            "md:[grid-area:text]",
          ])}
          style={{ color: textColor?.hex ?? "" }}
        >
          {title && (
            <Text as="h2" caps size="subheading" weight="semi">
              {title}
            </Text>
          )}
          {text && (
            <Text
              as="div"
              align="center"
              balance
              className={clsx(
                "space-y-w4 mx-auto",
                "[&_img]:mx-auto [&_img]:w-[72px] [&_img]:pt-w8 [&_img+h2]:!pt-0",
                {
                  ["[&_p.text-base]:text-4xl"]:
                    textVariant === TextVariants.Large,
                }
              )}
            >
              <Markdown>{text}</Markdown>
            </Text>
          )}
          {link?.url && (
            <Button
              asChild
              variant="outline"
              size="default"
              className="w-max self-center"
            >
              <Link href={link?.url}>{link?.label || "Read More"}</Link>
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SplitImageTextBoxed;
