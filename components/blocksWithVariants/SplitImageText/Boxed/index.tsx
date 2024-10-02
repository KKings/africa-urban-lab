import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitImageTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import NextImage from "next/image";
import { Markdown } from "@/components/ui/markdown";
import clsx from "clsx";
import { Text } from "@/components/ui";
import { Section } from "@/components/ui/section";

type Props = {
  fragment: FragmentType<typeof SplitImageTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

enum ImageAlignment {
  Left = "left",
  Right = "right",
}

const SplitImageTextBoxed = ({ fragment }: Props) => {
  const {
    splitImageTitle: title,
    splitImageText: text,
    image,
    imageAlignment,
    displayVariant,
    bgColor,
    textColor,
  } = getFragmentData(SplitImageTextSectionFragmentDoc, fragment);

  return (
    <Section bgColor={bgColor?.hex}>
      <div className={clsx([
        "grid grid-flow-row md:grid-flow-column gap-16",
        "bg-theme-grey text-background",
        {['md:grid-cols-[40%_auto] md:[grid-template-areas:"image_text"]']: imageAlignment === ImageAlignment.Left},
        {['md:grid-cols-[auto_40%] md:[grid-template-areas:"text_image"]']: imageAlignment === ImageAlignment.Right}
      ])} style={{ backgroundColor: bgColor?.hex ?? "" }}>
        <div className="w-full relative md:[grid-area:image] md:content-center">
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
            "flex flex-col text-center md:content-center",
            "space-y-8 px-4",
            "md:[grid-area:text]",
          ])}
          style={{ color: textColor?.hex ?? "" }}
        >
          {title && (
            <Text as="h2" size="heading">
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
                "[&_img]:mx-auto [&_img]:w-[72px] [&_img]:pt-w8 [&_img+h2]:!pt-0"
              )}
            >
              <Markdown>{text}</Markdown>
            </Text>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SplitImageTextBoxed;
