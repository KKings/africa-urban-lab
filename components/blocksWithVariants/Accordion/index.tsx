import { type FragmentType, getFragmentData } from "@/graphql/types";
import { AccordionSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";
import { Text } from "@/components/ui";
import { Markdown } from "@/components/ui/markdown";

type Props = {
  fragment: FragmentType<typeof AccordionSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const AccordionSection = ({ fragment }: Props) => {
  const { title, items, bgColor, textColor } = getFragmentData(
    AccordionSectionFragmentDoc,
    fragment
  );
  return (
    <Section
      fullWidth
      title={title ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
      className={clsx("mb-0 pb-0 md:mb-0 md:pb-0", { "py-0 md:py-0": !title })}
    >
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className="border-primary"
          >
            <AccordionTrigger
              className={clsx(
                "min-h-[100px] lg:min-h-[140px]",
                "hover:bg-theme-citron"
              )}
            >
              <div className="container flex flex-col items-center justify-center space-y-1">
                <Text
                  as="h2"
                  size="large"
                  align="center"
                  weight="semi"
                  className="max-w-[680px]"
                >
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text
                    as="h2"
                    size="large"
                    caps
                    align="center"
                    weight="normal"
                  >
                    {item.subtitle}
                  </Text>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={clsx(
                "container max-w-inner space-y-w4 mx-auto xl:w-5/6",
                "pb-w12"
              )}
            >
              <Markdown
                className={clsx("text-center text-balance text-xl/[29px]")}
              >
                {item.text}
              </Markdown>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

export default AccordionSection;
