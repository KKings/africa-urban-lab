'use client';

import NextImage from "next/image";
import {
  arrowStyle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

type ImageCarouselProps = {
  images: {
    __typename?: "FileField";
    responsiveImage?: {
      __typename?: "ResponsiveImage";
      alt?: string | null;
      src: string;
      width: number;
      height: number;
      sizes: string;
    } | null;
  }[];
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
}: ImageCarouselProps): React.ReactElement => {
  return (
    <Carousel
      className="w-full"
      opts={{ align: "start", loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={`${index}`}
            className="min-w-0 shrink-0 grow-0 basis-full"
          >
            <NextImage
              src={image.responsiveImage?.src ?? ""}
              alt={image.responsiveImage?.alt ?? ""}
              height={images?.[0]?.responsiveImage?.height}
              width={images?.[0]?.responsiveImage?.width}
              className="inset-0 w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={clsx(arrowStyle)} />
      <CarouselNext className={clsx(arrowStyle)} />
    </Carousel>
  );
};
