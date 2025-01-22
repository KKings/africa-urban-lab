import NextImage from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitImageTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Markdown } from "@/components/ui/markdown";
import { Button, Text } from "@/components/ui";
import { IMAGE_SIZES } from "../constants";
import { ImageAlignment, ImageGrid, TextVariants } from "@/components/types";
import { ImageCarousel } from "../ImageCarousel";

type Props = {
  fragment: FragmentType<typeof SplitImageTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const SplitImageTextFullWidth = ({ fragment }: Props) => {
  const {
    splitImageTitle: title,
    splitImageText: text,
    images,
    imageAlignment,
    bgColor,
    textVariant,
    imageGrid,
    textColor,
    link,
  } = getFragmentData(SplitImageTextSectionFragmentDoc, fragment);

  const vars = {
    "--image-grid-size": imageGrid
      ? IMAGE_SIZES[imageGrid as ImageGrid]
      : IMAGE_SIZES[ImageGrid["2/5"]],
  } as React.CSSProperties;

  const useCarousel = images.length > 1;

  return (
    <div
      className={clsx([
        "grid grid-flow-row lg:grid-flow-col",
        "bg-theme-grey text-background",
        {
          ['lg:grid-cols-[var(--image-grid-size)_auto] lg:[grid-template-areas:"image_text"]']:
            imageAlignment === ImageAlignment.Left,
        },
        {
          ['lg:grid-cols-[auto_var(--image-grid-size)] lg:[grid-template-areas:"text_image"]']:
            imageAlignment === ImageAlignment.Right,
        },
      ])}
      style={{
        backgroundColor: bgColor?.hex ?? "",
        ...vars,
      }}
    >
      <div className="w-full relative lg:[grid-area:image]">
        {!useCarousel ? (
          <NextImage
            src={images?.[0]?.responsiveImage?.src ?? ""}
            alt={images?.[0]?.responsiveImage?.alt ?? ""}
            height={images?.[0]?.responsiveImage?.height}
            width={images?.[0]?.responsiveImage?.width}
            className="inset-0 object-cover w-full lg:h-full"
          />
        ) : (
          <div className="md:inline-flex xl:block md:items-center sm:h-auto lg:h-full xl:h-auto">
            <ImageCarousel images={images} />
          </div>
        )}
      </div>
      <div
        className={clsx([
          "flex flex-col text-center justify-center",
          "space-y-8 py-16 px-4 lg:p-16",
          "lg:[grid-area:text]",
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
              "space-y-w4 mx-auto xl:w-5/6",
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
          <Button asChild variant="outline" className="w-max self-center">
            <Link href={link?.url}>{link?.label || "Read More"}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SplitImageTextFullWidth;
