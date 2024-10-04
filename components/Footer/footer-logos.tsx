import NextImage from "next/image";
import { Text } from "../ui";

export interface Image {
  url?: string;
  alt?: string;
}

export type FooterLogosProps = {
  footerLogoLeft?: Image;
  footerLogoRight?: Image;
  footerLogoAttribution?: Image;
  footerLogoAttributionText?: string;
};

export const FooterLogos = ({
  footerLogoLeft,
  footerLogoRight,
  footerLogoAttribution,
  footerLogoAttributionText,
}: FooterLogosProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-w8 md:gap-w20">
      <NextImage
        src={footerLogoLeft?.url ?? ""}
        alt={footerLogoLeft?.alt ?? ""}
        width={85 * (448.56 / 95)}
        height={85}
        className="shrink !aspect-[250/53]"
      />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-w8">
        <NextImage
          src={footerLogoRight?.url ?? ""}
          alt={footerLogoRight?.alt ?? ""}
          width={65 * (365.93 / 90)}
          height={65}
          className="shrink !aspect-[365.93/90]"
        />
        {footerLogoAttribution?.url && (
          <div className="gap-2 flex flex-col items-center">
            <Text size="fine" caps align="center" className="text-[8px]">
              {footerLogoAttributionText}
            </Text>
            <NextImage
              src={footerLogoAttribution.url} 
              alt={footerLogoAttribution.alt ?? ''}
              width={55 * (83 / 64)} 
              height={55} 
            />
          </div>
        )}
      </div>
    </div>
  );
};
