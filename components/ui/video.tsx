"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from "react";
import NextImage from "next/image";
import { Spinner } from "./spinner";

// interface HTMLVideoElementProps {
//   autoplay?: boolean;
//   buffered?: TimeRanges;
//   controls?: boolean;
//   crossOrigin?: string | null;
//   currentTime?: number;
//   defaultMuted?: boolean;
//   defaultPlaybackRate?: number;
//   disablePictureInPicture?: boolean;
//   disableRemotePlayback?: boolean;
//   duration?: number;
//   loop?: boolean;
//   muted?: boolean;
//   playsInline?: boolean;
//   poster?: string;
//   preload?: "auto" | "metadata" | "none";
//   src?: string;
//   volume?: number;
// }

interface VideoProps {
  src: string;
  poster: string;
  className?: string;
  videoProps?: VideoHTMLAttributes<HTMLVideoElement>;
}

export const Video = ({ src, poster, className, videoProps }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  // console.log("videoLoaded", videoLoaded);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true); // Directly set to true
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    // use a promise to await the damn video
    const promisifiedHandleVideoLoaded = async () => {
      if (video) {
        await new Promise<void>((resolve) => {
          if (video.readyState > 0) {
            // Metadata already loaded
            resolve();
          } else {
            video.addEventListener("loadedmetadata", () => resolve());
          }
        });
        handleVideoLoaded();
      }
    };

    promisifiedHandleVideoLoaded();

    // Cleanup
    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleVideoLoaded);
      }
    };
  }, [videoRef, handleVideoLoaded]);

  return (
    <>
      <video
        ref={videoRef}
        // autoPlay
        // loop
        // playsInline
        // muted
        className={className}
        {...videoProps}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* BUG: ensure poster prop is passed! */}
      {!videoLoaded && <VideoLoader poster={poster} />}
    </>
  );
};

export const VideoLoader = ({ poster }: { poster: string }) => (
  <div className="absolute inset-0 flex items-center justify-center text-fill">
    <div className="absolute inset-0 opacity-20">
      <NextImage
        fill
        quality={10}
        className="object-cover"
        src={poster}
        alt="Video"
        priority
      />
    </div>
    <Spinner />
  </div>
);
