import NextImage from 'next/image';

export interface Image {
  url?: string;
  alt?: string;
}

export type FooterLogosProps = {
  footerLogoLeft?: Image;
  footerLogoRight?: Image;
}

export const FooterLogos = ({ footerLogoLeft, footerLogoRight}: FooterLogosProps) => {

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-w20">
      <NextImage
        src={footerLogoLeft?.url ?? ''}
        alt={footerLogoLeft?.alt ?? ''}
        width={85 * (448.56 / 95)}
        height={85}
        className="shrink !aspect-[250/53]"
      />
      <div className="flex justify-center items-center gap-w8">
        <NextImage
          src={footerLogoRight?.url ?? ''}
          alt={footerLogoRight?.alt ?? ''}
          width={65 * (365.93 / 90)}
          height={65}
          className="shrink !aspect-[365.93/90]"
        />
      </div>
    </div>
  );
};