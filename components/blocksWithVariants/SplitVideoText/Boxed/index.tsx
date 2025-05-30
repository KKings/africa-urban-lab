import Link from "next/link";
import clsx from "clsx";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitVideoTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Markdown } from "@/components/ui/markdown";
import { Button, Text } from "@/components/ui";
import { Section } from "@/components/ui/section";
import {
  ImageAlignment,
  ImageGrid as Grid,
  TextVariants,
} from "@/components/types";
import { YouTube } from "@/components/ui/youtube";
import { IMAGE_SIZES } from "../constants";

type Props = {
  fragment: FragmentType<typeof SplitVideoTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const SplitVideoTextBoxed = ({ fragment }: Props) => {
  const {
    splitImageTitle: title,
    splitImageText: text,
    videoUrl,
    alignment,
    grid = Grid["2/5"],
    bgColor,
    textColor,
    textVariant,
    link,
  } = getFragmentData(SplitVideoTextSectionFragmentDoc, fragment);

  const vars = {
    "--image-grid-size": grid
      ? IMAGE_SIZES[grid as Grid]
      : IMAGE_SIZES[Grid["2/5"]],
  } as React.CSSProperties;

  return (
    <Section bgColor={bgColor?.hex}>
      <div
        className={clsx([
          "grid grid-flow-row md:grid-flow-column items-center",
          "bg-theme-grey text-background 100dvh md:h-auto",
          {
            ['md:grid-cols-[var(--image-grid-size)_auto] md:[grid-template-areas:"image_text"]']:
              alignment === ImageAlignment.Left,
          },
          {
            ['md:grid-cols-[auto_var(--image-grid-size)] md:[grid-template-areas:"text_image"]']:
              alignment === ImageAlignment.Right,
          },
        ])}
        style={{
          backgroundColor: bgColor?.hex ?? "",
          ...vars,
        }}
      >
        <div className="w-full relative md:[grid-area:image] md:justify-center">
          <YouTube
            url={videoUrl}
            style={{
              aspectRatio: '16/9',
            }}
            width={'100%'}
            height={'100%'}
            controls={true}
          />
        </div>
        <div
          className={clsx([
            "flex flex-col text-center md:justify-center",
            "space-y-8 py-16 px-4 lg:p-12",
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

export default SplitVideoTextBoxed;
