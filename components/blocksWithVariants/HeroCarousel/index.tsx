"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroCarouselSectionFragmentDoc } from "@/graphql/types/graphql";
import NextImage from "next/image";
import { GlobalPageProps } from "@/utils/globalPageProps";
import clsx from "clsx";

type Props = {
  fragment: FragmentType<typeof HeroCarouselSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const arrowStyle = ["rounded-full", "bg-white bg-opacity-50 text-foreground"];

const HeroCarousel = ({ fragment }: Props) => {
  const { heroImages } = getFragmentData(
    HeroCarouselSectionFragmentDoc,
    fragment
  );
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
        {heroImages.map((card, index) => (
          <CarouselItem
            key={`${index}`}
            className="min-w-0 shrink-0 grow-0 basis-full"
          >
            <div
              key={card.url}
              className="relative h-[50vh] md:h-[66vh] bg-theme-blue"
            >
              <NextImage
                src={card?.url ?? ""}
                alt={card?.alt ?? ""}
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={clsx(arrowStyle)} />
      <CarouselNext className={clsx(arrowStyle)} />
    </Carousel>
  );
};

export default HeroCarousel;
