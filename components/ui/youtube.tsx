"use client";

import dynamic from "next/dynamic";
import { type YouTubePlayerProps } from "react-player/youtube";

const YoutubePlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

export type YouTubeVideo = YouTubePlayerProps & {
  children?: never;
};

export const YouTube: React.FC<YouTubeVideo> = ({
  url,
  className,
  controls = true,
  ...props
}: YouTubeVideo): React.ReactElement => {
  return (
    <div className={className}>
      <YoutubePlayer url={url} controls={true} {...props} />
    </div>
  );
};
