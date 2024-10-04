import type { CommonLayoutQuery } from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';
import Link from 'next/link';
import { Text } from '../ui';
import { SocialIcon } from './social-icon';
import { FooterLogos } from './footer-logos';

type Props = {
  data: CommonLayoutQuery;
  globalPageProps: GlobalPageProps;
};

export const Footer = ({ data: { layout } }: Props ) => {

  return (
    <footer className="pb-w12 bg-secondary text-background relative">
      <div className="container px-[48px] md:px-inset pt-w48 pb-w42 space-y-w16">
        <FooterLogos
          footerLogoLeft={layout?.footerLogoLeft ?? undefined}
          footerLogoRight={layout?.footerLogoRight ?? undefined}
          footerLogoAttribution={layout?.footerLogoAttribution ?? undefined}
          footerLogoAttributionText={layout?.footerLogoAttributionText ?? undefined}
        />
        <Text size="meta" caps align="center">
          {layout?.footerSubtitle}
        </Text>
      </div>

      <div className="container flex items-center justify-between">
        <Text size="fine">
          {layout?.footerCopyright}
        </Text>
        
        <div className="flex gap-w6">
          { layout?.socialMediaLinks.map((socialMedia) => 
            <Link
              href={socialMedia.url}
              aria-label="social-link"
              className="text-white hover:text-primary-foreground"
              key={socialMedia.id}
            >
              <SocialIcon label={socialMedia.iconName} />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
