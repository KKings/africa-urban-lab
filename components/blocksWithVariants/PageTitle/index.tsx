import { type FragmentType, getFragmentData } from "@/graphql/types";
import { PageTitleSectionFragmentDoc } from "@/graphql/types/graphql";
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
        backgroundColor: bgColor?.hex ?? "",
        backgroundImage: pageBgImage?.responsiveImage?.src
          ? `url(${pageBgImage?.responsiveImage?.src})`
          : "none",
      }}
      className={clsx([
        "relative flex items-center justify-center py-24 md:py-36",
        "bg-cover bg-no-repeat bg-center",
      ])}
    >
      <div className="container flex flex-col items-center space-y-w16">
        <div
          className={cn([
            "inline-flex flex-col space-y-8",
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
