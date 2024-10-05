import { type FragmentType, getFragmentData } from "@/graphql/types";
import { NewsletterFormSectionFragmentDoc } from "@/graphql/types/graphql";
import { NewsletterForm as NewsletterSignupForm } from "@/components/NewsletterForm";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";

type Props = {
  fragment: FragmentType<typeof NewsletterFormSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const NewsletterForm = ({ fragment }: Props) => {
  const { audienceId, textColor, bgColor } = getFragmentData(
    NewsletterFormSectionFragmentDoc,
    fragment
  );
  return (
    <Section bgColor={bgColor?.hex} textColor={textColor?.hex}>
      <div className="container max-w-[700px]">
        <NewsletterSignupForm />
      </div>
    </Section>
  );
};

export default NewsletterForm;
