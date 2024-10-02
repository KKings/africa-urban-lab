import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ImageHeroSectionFragmentDoc } from "@/graphql/types/graphql";
import NextImage from "next/image";
import { GlobalPageProps } from "@/utils/globalPageProps";
import clsx from "clsx";

type Props = {
  fragment: FragmentType<typeof ImageHeroSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const ImageHero = ({ fragment }: Props) => {
  const { bgImage, bgColor, useImageHeight } = getFragmentData(
    ImageHeroSectionFragmentDoc,
    fragment
  );
  
  return (
    <div className={clsx([
      'relative',
      {["bg-theme-blue"]: !bgColor?.hex}
    ])} style={{ backgroundColor: bgColor?.hex ? bgColor?.hex : '' }}>
      <NextImage
        src={bgImage?.responsiveImage?.src ?? ""}
        alt={bgImage?.responsiveImage?.alt ?? ""}
        width={bgImage?.responsiveImage?.width}
        height={bgImage?.responsiveImage?.height}
        sizes={bgImage?.responsiveImage?.sizes}
        priority
        className={clsx([
          "relative block w-full object-cover",
          {["lg:max-h-[640px]"]: !useImageHeight }
        ])}
      />
    </div>
  );
};

export default ImageHero;
