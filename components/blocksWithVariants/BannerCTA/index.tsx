import { type FragmentType, getFragmentData } from "@/graphql/types";
import { BannerCtaSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Button, Text } from "@/components/ui";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  fragment: FragmentType<typeof BannerCtaSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const DEFAULT_IMAGE = "/images/section-bg.png";

const BannerCTA = ({ fragment }: Props) => {
  const {
    bannerTitle: title,
    subtitle,
    link,
    bannerBGImage: bgImage,
    textBgColor,
    bgColor,
    textColor,
  } = getFragmentData(BannerCtaSectionFragmentDoc, fragment);

  return (
    <div
      className={clsx(
        "py-w24 md:py-w32 relative min-h-[50vh] lg:min-h-[700px]",
        "flex flex-col items-center justify-center",
        "!min-h-[auto] text-background relative",
        "bg-cover bg-no-repeat bg-center"
      )}
      style={{
        backgroundImage: `url(${bgImage?.url ? bgImage?.url : DEFAULT_IMAGE})`,
        backgroundColor: bgColor?.hex ? bgColor.hex : "",
      }}
    >
      <div className="absolute inset-0 flex justify-center">
        <div
          className="container max-w-inner bg-primary"
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
            backgroundColor: textBgColor?.hex ? textBgColor.hex : "",
          }}
        ></div>
      </div>
      <div
        className="relative container max-w-inner space-y-w12"
        style={{
          color: textColor?.hex ? textColor.hex : "",
        }}
      >
        <div className="flex flex-col space-y-3 items-center">
          <Text
            as="h2"
            caps
            serif
            balance
            size="subheading"
            weight="medium"
            align="center"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              as="p"
              caps
              size="meta"
              align="center"
              className="space-y-w4 mx-auto xl:w-5/6"
            >
              {subtitle}
            </Text>
          )}
          {link?.url && (
            <div>
              <Button asChild variant="outline" className="text-meta font-bold w-max mt-8 uppercase">
                <Link href={link.url}>{link.label ?? "Click Here"}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerCTA;