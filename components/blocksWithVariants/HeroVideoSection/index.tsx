import { AutoPlayYouTube } from "@/components/ui/youtube";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroVideoSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";

type Props = {
  fragment: FragmentType<typeof HeroVideoSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const HeroVideoSection = ({ fragment }: Props) => {
  const { videoUrl } = getFragmentData(
    HeroVideoSectionFragmentDoc,
    fragment
  );
  return (
    <AutoPlayYouTube
      url={videoUrl}
      style={{
        aspectRatio: '16/9',
        maxHeight: 'calc(100svh - var(--height-nav)',
      }}
      className="w-full h-full [&_iframe]:absolute [&_iframe]:top-0"
      width={"100%"}
      height={'100%'}
      muted={true}
      controls={true}
    />
  );
};

export default HeroVideoSection;
