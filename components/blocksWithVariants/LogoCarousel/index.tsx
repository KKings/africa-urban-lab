import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { LogoCarouselSectionFragmentDoc } from "@/graphql/types/graphql";
import NextImage from "next/image";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";

type Props = {
  fragment: FragmentType<typeof LogoCarouselSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const LogoCarousel = ({ fragment }: Props) => {
  const { logoCarouselTitle, cards } = getFragmentData(
    LogoCarouselSectionFragmentDoc,
    fragment
  );
  return (
    <Section title={logoCarouselTitle ?? ''}>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className="flex items-center touch-pan-y touch-pinch-zoom w-full xl:max-w-[1216px]">
          {cards.map((card, index) => (
            <CarouselItem key={`${index}_${card.id}`} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_32%] lg:flex-[0_0_25%] justify-center">
              <div key={card.id} className="relative flex justify-center">
                <NextImage
                  src={card.image?.url ?? ""}
                  alt={card.image?.alt ?? ""}
                  height={200}
                  width={200}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-foreground xl:-ml-16" />
        <CarouselNext className="text-foreground xl:-mr-16" />
      </Carousel>
    </Section>
  );
};

export default LogoCarousel;
