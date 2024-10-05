import NextImage from "next/image";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { PageImageTitleSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Text } from "@/components/ui";
import clsx from "clsx";

type Props = {
  fragment: FragmentType<typeof PageImageTitleSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const PageImageTitle = ({ fragment }: Props) => {
  const { pageTitle, pageImage, textBgColor, bgColor, pageBgImage } = getFragmentData(
    PageImageTitleSectionFragmentDoc,
    fragment
  );

  return (
    <div
      style={{
        backgroundColor: bgColor?.hex ?? "",
      }}
      className={clsx([
        "relative flex items-center justify-center py-24 md:py-36",
        "bg-cover bg-no-repeat bg-center",
        "h-[calc(100dvh-var(--height-nav))]",
      ])}
    >
      { pageBgImage?.responsiveImage?.src && 
        <NextImage
          src={pageBgImage?.responsiveImage?.src}
          alt={pageBgImage?.responsiveImage?.alt ?? ''}
          width={pageBgImage?.responsiveImage?.width}
          height={pageBgImage?.responsiveImage?.height}
          quality={100}
          priority
          object-position="center"
          className="absolute left-0 top-0 w-full h-full object-cover z-[1]"
        />
      }
      <div className="container flex flex-col items-center space-y-w16 z-[2]">
        {pageImage?.url && (
          <NextImage
            src={pageImage?.url ?? ""}
            alt={pageImage?.alt ?? ""}
            height={640 * (124 / 324)}
            width={640} // 324w x 124h is SVG size
            priority
            // className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="inline-flex bg-background px-w4 py-3"
          style={{
            backgroundColor: textBgColor?.hex ?? "",
          }}
        >
          <Text as="h1" size="large" caps align="center" color="foreground">
            {pageTitle}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PageImageTitle;
