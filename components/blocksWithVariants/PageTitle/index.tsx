import { type FragmentType, getFragmentData } from "@/graphql/types";
import { PageTitleSectionFragmentDoc } from "@/graphql/types/graphql";
import NextImage from 'next/image';
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Text } from "@/components/ui";
import clsx from "clsx";
import { cn } from "@/components/utils";

type Props = {
  fragment: FragmentType<typeof PageTitleSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const PageTitle = ({ fragment }: Props) => {
  const {
    pageTitle,
    pageSubTitle,
    textColor,
    textBgColor,
    bgColor,
    pageBgImage,
  } = getFragmentData(PageTitleSectionFragmentDoc, fragment);

  return (
    <div
      style={{
        backgroundColor: bgColor?.hex ?? ""
      }}
      className={clsx([
        "relative flex items-center justify-center py-24 md:py-36",
        "bg-cover bg-no-repeat bg-center",
        "h-[calc(100dvh-var(--height-nav))] lg:h-auto",
      ])}
    >
      <div className="container flex flex-col items-center">
        { pageBgImage?.responsiveImage?.src && 
          <NextImage
            src={pageBgImage?.responsiveImage?.src}
            alt={pageBgImage?.responsiveImage?.alt ?? ''}
            width={pageBgImage?.responsiveImage?.width}
            height={pageBgImage?.responsiveImage?.height}
            quality={100}
            object-position="center"
            className="absolute left-0 top-0 w-full h-full z-[1] object-cover"
          />
        }
        <div
          className={cn([
            "inline-flex flex-col space-y-8 z-[2]",
            "lg:w-[60%]",
            { ["p-12 shadow-md"]: textBgColor?.hex },
          ])}
          style={{
            backgroundColor: textBgColor?.hex ?? "",
            color: textColor?.hex ?? "",
          }}
        >
          <Text
            as="h1"
            size="heading"
            caps
            weight="bold"
            align="center"
          >
            {pageTitle}
          </Text>
          {pageSubTitle && (
            <Text as="p" size="base" align="center">
              {pageSubTitle}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
