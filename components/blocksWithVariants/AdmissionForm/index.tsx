import { type FragmentType, getFragmentData } from "@/graphql/types";
import { AdmissionFormSectionFragmentDoc } from "@/graphql/types/graphql";
import { AdmissionForm as AdmissionSignupForm } from "@/components/AdmissionForm";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";

type Props = {
  fragment: FragmentType<typeof AdmissionFormSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const AdmissionForm = ({ fragment }: Props) => {
  const {
    personalInfoTitle,
    personalInfoDescription,
    referralTitle,
    referralDescription,
    experienceTitle,
    experienceDescription,
    documentsTitle,
    documentsDescription,
    submitTitle,
    submitDescription,
    textColor,
    bgColor,
  } = getFragmentData(AdmissionFormSectionFragmentDoc, fragment);
  return (
    <Section bgColor={bgColor?.hex} textColor={textColor?.hex}>
      <div className="container max-w-[700px]">
        <AdmissionSignupForm
          personalInfoTitle={personalInfoTitle}
          personalInfoDescription={personalInfoDescription}
          referralTitle={referralTitle}
          referralDescription={referralDescription}
          experienceTitle={experienceTitle}
          experienceDescription={experienceDescription}
          documentsTitle={documentsTitle}
          documentsDescription={documentsDescription}
          submitTitle={submitTitle}
          submitDescription={submitDescription}
        />
      </div>
    </Section>
  );
};

export default AdmissionForm;
