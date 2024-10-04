import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/components/utils";
import { Button } from "@/components/ui";
import Link from "next/link";

type Props = {
  fragment: FragmentType<typeof TextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

enum TextBlockSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

const TextSection = ({ fragment }: Props) => {
  const {
    textSectionTitle,
    textSectionText,
    bgColor,
    textColor,
    link,
    textBlockSize = "medium",
  } = getFragmentData(TextSectionFragmentDoc, fragment);

  return (
    <Section
      title={textSectionTitle ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
    >
      <div className="flex flex-col space-y-8">
        <Markdown
          className={cn([
            "text-base text-center text-balance space-y-w4 mx-auto",
            "[&_img]:mx-auto [&_img]:w-[72px] [&_img]:pt-w8 [&_img+h2]:!pt-0",
            { ["lg:w-[60%]"]: textBlockSize === TextBlockSize.Small },
            { ["lg:w-[70%]"]: textBlockSize === TextBlockSize.Medium },
            { ["w-full"]: textBlockSize === TextBlockSize.Large },
          ])}
        >
          {textSectionText ?? ""}
        </Markdown>

        {link?.url && (
          <Button
            asChild
            variant="outline"
            size="default"
            className="w-max self-center"
          >
            <Link href={link?.url}>{link?.label || "Read More"}</Link>
          </Button>
        )}
      </div>
    </Section>
  );
};

export default TextSection;
