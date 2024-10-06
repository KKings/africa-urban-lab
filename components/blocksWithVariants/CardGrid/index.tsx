import { type FragmentType, getFragmentData } from "@/graphql/types";
import NextImage from "next/image";
import {
  CardSectionFragmentDoc,
} from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { cn } from "@/components/utils";
import { Text } from "@/components/ui";
import Link from "next/link";

type Props = {
  fragment: FragmentType<typeof CardSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const CardGrid = ({ fragment }: Props) => {
  const {
    cardTitle: title,
    cardText: text,
    cards = [],
    bgColor,
    textColor,
  } = getFragmentData(CardSectionFragmentDoc, fragment);

  return (
    <Section
      title={title ?? ""}
      description={text ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
      className="space-y-w16"
    >
      <div className="container max-w-inner">
        <div
          className={cn(
            "flex flex-wrap",
            "gap-x-12 gap-y-12 w-full justify-center items-start"
          )}
        >
          {cards.map((item) => (
            <div
              key={item.id}
              className={cn(
                "space-y-w4 w-full sm:basis-1/2-gap-12"
              )}
            >
              <div className="relative aspect-[320/290]">
                <NextImage
                  src={item?.image?.responsiveImage?.src ?? ""}
                  alt={item?.image?.responsiveImage?.alt ?? ""}
                  sizes={item?.image?.responsiveImage?.sizes}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col space-y-2">
                { item.url && 
                  <>
                    <Link
                      href={item.url}
                      >
                      <Text as="h3" caps size="base" weight="bold" align="center">
                        {item.title}
                      </Text>
                    </Link>
                    <Text as="div" size="base" align="center">
                      {item.text}
                    </Text>
                  </>
                }
                { !item.url && 
                  <>
                    <Text as="h3" caps size="base" weight="bold" align="center">
                      {item.title}
                    </Text>   
                    { item.text && 
                      <Text as="div" size="base" align="center">
                        {item.text}
                      </Text>
                    }
                  </>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CardGrid;
