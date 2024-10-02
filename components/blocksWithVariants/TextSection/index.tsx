import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TextSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from '@/components/ui/section';
import { Markdown } from '@/components/ui/markdown';
import { cn } from "@/components/utils";

type Props = {
  fragment: FragmentType<typeof TextSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

enum TextBlockSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

const TextSection = ({ fragment }: Props) => {
  const { textSectionTitle, textSectionText, bgColor, textColor, textBlockSize = "medium" } = getFragmentData(
    TextSectionFragmentDoc,
    fragment
  );

  return (
    <Section title={textSectionTitle ?? ''} bgColor={bgColor?.hex} textColor={textColor?.hex}>
      <div className="flex space-x-test">
        <Markdown className={cn([
          "text-base text-center text-balance space-y-w4 mx-auto",
          "[&_img]:mx-auto [&_img]:w-[72px] [&_img]:pt-w8 [&_img+h2]:!pt-0",
          {['lg:w-[60%]']: textBlockSize === TextBlockSize.Small},
          {['lg:w-[70%]']: textBlockSize === TextBlockSize.Medium},
          {['w-full']: textBlockSize === TextBlockSize.Large}
        ])}>
          {textSectionText ?? ''}
        </Markdown>
      </div>
    </Section>
  );
};

export default TextSection;
