import { type FragmentType, getFragmentData } from "@/graphql/types";
import { LecturerRecord, LecturersSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { LecturerGroup } from "./lecturer-group";

type Props = {
  fragment: FragmentType<typeof LecturersSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const LecturerGrid = ({ fragment }: Props) => {
  const { lecturersTitle, lecturers = [] } = getFragmentData(
    LecturersSectionFragmentDoc,
    fragment
  );

  const governance = lecturers.filter((l) => (l.category as string[]).includes("governance")) as LecturerRecord[];
  const planning = lecturers.filter((l) => (l.category as string[]).includes("planning")) as LecturerRecord[];
  const finance = lecturers.filter((l) => (l.category as string[]).includes("finance")) as LecturerRecord[];
  const economics = lecturers.filter((l) => (l.category as string[]).includes("economics")) as LecturerRecord[];
  const convenor = lecturers.filter((l) => (l.category as string[]).includes("convenor")) as LecturerRecord[];

  return (
    <Section title={lecturersTitle ?? ''} className="bg-background space-y-w16">
      {governance.length > 0 && (
        <LecturerGroup kind="Urban Governance" lecturers={governance} />
      )}
      {planning.length > 0 && (
        <LecturerGroup kind="Urban Planning" lecturers={planning} />
      )}
      {finance.length > 0 && (
        <LecturerGroup kind="Urban Finance" lecturers={finance} />
      )}
      {economics.length > 0 && (
        <LecturerGroup kind="Urban Economics" lecturers={economics} />
      )}
      {convenor.length > 0 && (
        <LecturerGroup kind="Course Convenor" lecturers={convenor} />
      )}
    </Section>
  );
};

export default LecturerGrid;
