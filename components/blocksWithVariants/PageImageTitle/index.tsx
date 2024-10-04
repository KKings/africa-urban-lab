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
  const { pageTitle, pageImage, textColor, textBgColor, bgColor, pageBgImage } = getFragmentData(
    PageImageTitleSectionFragmentDoc,
    fragment
  );

  return (
    <div
      style={{
        backgroundColor: bgColor?.hex ?? "",
        backgroundImage: pageBgImage?.responsiveImage?.src
          ? `url(${pageBgImage?.responsiveImage?.src})`
          : "none",
      }}
      className={clsx([
        "h-[50vh] md:h-[66vh] relative flex items-center justify-center",
        "bg-cover bg-no-repeat bg-center",
        "h-[calc(100vh-var(--height-nav))]",
      ])}
    >
      <div className="container flex flex-col items-center space-y-w16">
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
          <Text as="h1" size="large" serif caps align="center" color="foreground">
            {pageTitle}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PageImageTitle;
