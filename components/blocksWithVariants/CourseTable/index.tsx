"use client";

import { Text } from "@/components/ui";
import { Markdown } from "@/components/ui/markdown";
import { Section } from "@/components/ui/section";
import { FragmentType, getFragmentData } from "@/graphql/types";
import { CourseTableSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  fragment: FragmentType<typeof CourseTableSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const areasDesktop = `
  "a_a_a_b_b_b_b_c_c_c_c_c"
  "d_d_d_e_e_e_e_c_c_c_c_c"`;

const areasMobile = `
__"a_a_a_a_a_b_b_b_b_b_b_b"
__"d_d_d_d_d_e_e_e_e_e_e_e"
  "c_c_c_c_c_c_c_c_c_c_c_c"`;

const Cell = ({
  children,
  header,
  className,
  area,
}: {
  children: string;
  header?: boolean;
  className?: string;
  area: string;
}) => (
  <div
    className={clsx(
      "border border-background p-inset space-y-2",
      "[&_h3]:text-foreground",
      header && "bg-white [&_*]:!text-foreground",
      className
    )}
    style={{
      gridArea: area,
    }}
  >
    <Markdown>{children}</Markdown>
  </div>
);

const CourseTable = ({ fragment }: Props) => {
  const { title, courses = [], brochure, buttonText } = getFragmentData(
    CourseTableSectionFragmentDoc,
    fragment
  );

  return (
    <Section title={title ?? ""} bgColor="#FD5A47">
      <div
        className={clsx([
          "container grid grid-cols-12 text-background",
          '[grid-template-areas:"a_a_a_a_a_b_b_b_b_b_b_b""d_d_d_d_d_e_e_e_e_e_e_e""c_c_c_c_c_c_c_c_c_c_c_c"]',
          'md:[grid-template-areas:"a_a_a_b_b_b_b_c_c_c_c_c""d_d_d_e_e_e_e_c_c_c_c_c"]',
        ])}
      >
        <Cell area="a" header className="border-b-0">
          {courses[0].text ?? ""}
        </Cell>
        <Cell area="b" className="sm:border-r-0 border-b-0">
          {courses[1].text ?? ""}
        </Cell>
        <Cell area="c" className="border-t-0 sm:border-t">
          {courses[2].text ?? ""}
        </Cell>
        <Cell area="d" header className="border-r-0 border-t-foreground">
          {courses[3].text ?? ""}
        </Cell>
        <Cell area="e" className="sm:border-r-0">
          {courses[4].text ?? ""}
        </Cell>
      </div>
      <div className="flex items-center justify-center text-background pt-w16">
        { brochure?.url && 
          <Link
            href={brochure?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-current px-w6 py-2.5"
          >
            <Text
              as="span"
              size="meta"
              caps
              align="center"
              className="inline-block transform translate-y-[-0.1em]"
            >
              { buttonText || 'Download brochure' }
            </Text>
          </Link>
        }
      </div>
    </Section>
  );
};

export default CourseTable;
