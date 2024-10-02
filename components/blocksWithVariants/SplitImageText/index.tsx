import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitImageTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import NextImage from "next/image";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/components/utils";
import clsx from "clsx";
import { Text } from "@/components/ui";

type Props = {
  fragment: FragmentType<typeof SplitImageTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

enum ImageAlignment {
  Left = 'left',
  Right = 'right',
};

const SplitImageText = ({ fragment }: Props) => {
  const { splitImageTitle: title, splitImageText: text, image, imageAlignment, bgColor, textColor } = getFragmentData(
    SplitImageTextSectionFragmentDoc,
    fragment
  );

  return (
    <div 
      className={clsx([
        "grid grid-rows-auto  md:grid-flow-col",
        "bg-theme-grey text-background",
        {['md:grid-cols-[35vw_auto] md:[grid-template-areas:"image_text"]']: imageAlignment === ImageAlignment.Left},
        {['md:grid-cols-[auto_35vw] md:[grid-template-areas:"text_image"]']: imageAlignment === ImageAlignment.Right}
      ])}
      style={{ backgroundColor: bgColor?.hex ?? ''}}
    >
      <div className="lg:h-[40vw] w-full relative [grid-area:image]">
        <NextImage 
          src={image?.responsiveImage?.src ?? ""}
          alt={image?.responsiveImage?.alt ?? ""}
          height={image?.responsiveImage?.height}
          width={image?.responsiveImage?.width}
          className="inset-0 object-cover w-full h-full"
        />
      </div>
      <div className={clsx([
        "flex flex-col text-center justify-center",
        "space-y-8 px-4 py-24",
        "[grid-area:text]"
      ])} style={{ color: textColor?.hex ?? ''}}>
        {title && <Text as="h2" size="heading">{title}</Text>}
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
  );
};

export default SplitImageText;
