"use client";

import NextImage from "next/image";
import clsx from "clsx";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { SplitImageTextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Markdown } from "@/components/ui/markdown";
import { Button, Text } from "@/components/ui";
import Link from "next/link";
import { IMAGE_SIZES } from "../constants";
import { ImageAlignment, ImageGrid, TextVariants } from "@/components/types";
import { use } from "react";
import {
  arrowStyle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  fragment: FragmentType<typeof SplitImageTextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const SplitImageTextFullWidth = ({ fragment }: Props) => {
  const {
    splitImageTitle: title,
    splitImageText: text,
    images,
    imageAlignment,
    bgColor,
    textVariant,
    imageGrid,
    textColor,
    link,
  } = getFragmentData(SplitImageTextSectionFragmentDoc, fragment);

  const vars = {
    "--image-grid-size": imageGrid
      ? IMAGE_SIZES[imageGrid as ImageGrid]
      : IMAGE_SIZES[ImageGrid["2/5"]],
  } as React.CSSProperties;

  const useCarousel = images.length > 1;

  return (
    <div
      className={clsx([
        "grid grid-flow-row md:grid-flow-col",
        "bg-theme-grey text-background",
        {
          ['md:grid-cols-[var(--image-grid-size)_auto] md:[grid-template-areas:"image_text"]']:
            imageAlignment === ImageAlignment.Left,
        },
        {
          ['md:grid-cols-[auto_var(--image-grid-size)] md:[grid-template-areas:"text_image"]']:
            imageAlignment === ImageAlignment.Right,
        },
      ])}
      style={{
        backgroundColor: bgColor?.hex ?? "",
        ...vars,
      }}
    >
      <div className="w-full relative md:[grid-area:image]">
        {!useCarousel ? (
          <NextImage
            src={images?.[0]?.responsiveImage?.src ?? ""}
            alt={images?.[0]?.responsiveImage?.alt ?? ""}
            height={images?.[0]?.responsiveImage?.height}
            width={images?.[0]?.responsiveImage?.width}
            className="inset-0 object-cover w-full md:h-full"
          />
        ) : (
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
        )}
      </div>
      <div
        className={clsx([
          "flex flex-col text-center justify-center",
          "space-y-8 py-16 px-4 md:p-16",
          "md:[grid-area:text]",
        ])}
        style={{ color: textColor?.hex ?? "" }}
      >
        {title && (
          <Text as="h2" caps size="subheading" weight="semi">
            {title}
          </Text>
        )}
        {text && (
          <Text
            as="div"
            align="center"
            balance
            className={clsx(
              "space-y-w4 mx-auto xl:w-5/6",
              "[&_img]:mx-auto [&_img]:w-[72px] [&_img]:pt-w8 [&_img+h2]:!pt-0",
              {
                ["[&_p.text-base]:text-4xl"]:
                  textVariant === TextVariants.Large,
              }
            )}
          >
            <Markdown>{text}</Markdown>
          </Text>
        )}
        {link?.url && (
          <Button asChild variant="outline" className="w-max self-center">
            <Link href={link?.url}>{link?.label || "Read More"}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SplitImageTextFullWidth;
