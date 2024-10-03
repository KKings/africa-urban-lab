import Link from "next/link";
import NextImage from "next/image";
import clsx from "clsx";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitImageTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Markdown } from "@/components/ui/markdown";
import { Button, Text } from "@/components/ui";
import { Section } from "@/components/ui/section";
import { ImageAlignment, ImageGrid } from "../types";
import { IMAGE_SIZES } from "../constants";

type Props = {
  fragment: FragmentType<typeof SplitImageTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const SplitImageTextBoxed = ({ fragment }: Props) => {
  const {
    splitImageTitle: title,
    splitImageText: text,
    image,
    imageAlignment,
    imageGrid = ImageGrid["2/5"],
    bgColor,
    textColor,
    buttonUrl,
    buttonLabel,
  } = getFragmentData(SplitImageTextSectionFragmentDoc, fragment);

  const vars = { 
    "--image-grid-size": imageGrid ? IMAGE_SIZES[imageGrid as ImageGrid] : IMAGE_SIZES[ImageGrid["2/5"]]
  } as React.CSSProperties;

  return (
    <Section bgColor={bgColor?.hex}>
      <div className={clsx([
        "grid grid-flow-row md:grid-flow-column gap-16 items-center",
        "bg-theme-grey text-background",
        {['md:grid-cols-[var(--image-grid-size)_auto] md:[grid-template-areas:"image_text"]']: imageAlignment === ImageAlignment.Left},
        {['md:grid-cols-[auto_var(--image-grid-size)] md:[grid-template-areas:"text_image"]']: imageAlignment === ImageAlignment.Right}
      ])} style={{ 
          backgroundColor: bgColor?.hex ?? "",
          ...vars
        }}>
        <div className="w-full relative md:[grid-area:image] md:justify-center">
          <NextImage
            src={image?.responsiveImage?.src ?? ""}
            alt={image?.responsiveImage?.alt ?? ""}
            height={image?.responsiveImage?.height}
            width={image?.responsiveImage?.width}
            className="inset-0 w-full h-auto"
          />
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
            <Text as="h2" size="subheading">
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
                "[&_img]:mx-auto [&_img]:w-[72px] [&_img]:pt-w8 [&_img+h2]:!pt-0"
              )}
            >
              <Markdown>{text}</Markdown>
            </Text>
          )}
          { buttonUrl && 
            <Button asChild variant="outline" size="default" className="w-max self-center">
              <Link
                href={buttonUrl}
              >
                { buttonLabel || 'Read More' }
              </Link>
            </Button>
          }
        </div>
      </div>
    </Section>
  );
};

export default SplitImageTextBoxed;
