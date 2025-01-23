"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { type YouTubePlayerProps } from "react-player/youtube";
import { cn } from "../utils";

const YouTubePlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export type YouTubeVideo = YouTubePlayerProps & {
  children?: never;
};

/**
 * YouTube component to embed a YouTube video player.
 *
 * @param {string} url - The URL of the YouTube video.
 * @param {string} [className] - Optional CSS class to apply to the container div.
 * @param {boolean} [controls=true] - Flag to show or hide video controls.
 * @param {object} props - Additional props to pass to the YouTube player.
 *
 * @returns {React.ReactElement} The YouTube video player component.
 */
export const YouTube: React.FC<YouTubeVideo> = ({
  url,
  className,
  controls = true,
  ...props
}: YouTubeVideo): React.ReactElement => {
  return (
    <div className={className}>
      <YouTubePlayer url={url} controls={controls} {...props} />
    </div>
  );
};

export type AutoplayVideoProps = Omit<
  YouTubeVideo,
  "ref" | "playing" | "onPlay" | "onPause"
> & {
  className?: string;
};

/**
 * AutoPlayYouTube is a React functional component that automatically plays a YouTube video
 * when it becomes visible in the viewport and pauses it when it is not.
 *
 * @component
 * @param {AutoplayVideoProps} props - The properties passed to the component.
 * @param {string} props.className - Additional class names for the container div.
 * @returns {React.ReactElement} The rendered component.
 *
 * @example
 * <AutoPlayYouTube
 *   className="my-video"
 *   videoId="dQw4w9WgXcQ"
 *   autoplay
 * />
 *
 * @remarks
 * This component uses the IntersectionObserver API to detect when the video is in the viewport.
 * It manages the video's play state based on its visibility.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
 */
export const AutoPlayYouTube: React.FC<AutoplayVideoProps> = ({
  className,
  ...props
}: AutoplayVideoProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoObserver = useRef<IntersectionObserver>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isReady && entry.isIntersecting) {
          setIsPlaying(true);
          setIsObserved(true);
        } else if (isObserved && isReady) {
          setIsPlaying(false);
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px", // no margin
        threshold: 0.5, // 50% of target visible
      }
    );

    videoObserver.current = observer;
    const container = containerRef.current;

    if (container) {
      observer.observe(container);
    }

    // Clean up the observer
    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [isObserved, isReady]);

  const handleOnReady = useCallback(() => setIsReady(true), []);
  const handleOnPlay = useCallback(() => setIsPlaying(true), []);
  const handleOnPause = useCallback(() => setIsPlaying(false), []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <YouTubePlayer
        playing={isPlaying}
        onReady={handleOnReady}
        onPlay={handleOnPlay}
        onPause={handleOnPause}
        {...props}
      />
    </div>
  );
};
