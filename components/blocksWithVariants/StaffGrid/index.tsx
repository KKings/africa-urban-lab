import { type FragmentType, getFragmentData } from "@/graphql/types";
import NextImage from "next/image";
import NextLink from "next/link";
import { StaffSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { cn } from "@/components/utils";
import { Text } from "@/components/ui";
import Link from "next/link";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

type Props = {
  fragment: FragmentType<typeof StaffSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const StaffGrid = ({ fragment }: Props) => {
  const {
    staffTitle,
    staff = [],
    bgColor,
    textColor,
  } = getFragmentData(StaffSectionFragmentDoc, fragment);

  return (
    <Section
      title={staffTitle ?? ""}
      bgColor={bgColor?.hex}
      textColor={textColor?.hex}
      className="space-y-w16"
    >
      <div className="container">
        <div
          className={cn(
            "flex flex-wrap",
            "gap-x-6 gap-y-10 w-full justify-center items-start"
          )}
        >
          {staff.map((item) => (
            <div
              key={item.id}
              className={cn(
                "space-y-w4 w-full md:basis-1/2-gap-6 lg:basis-1/3-gap-6"
              )}
            >
              <NextLink href={`/staff/${item.slug}`}>
                <div className="relative aspect-[320/290]">
                  <NextImage
                    src={item?.picture?.responsiveImage?.src ?? ""}
                    alt={item?.picture?.responsiveImage?.alt ?? ""}
                    // height={290}
                    // width={320}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </NextLink>
              <div className="flex flex-col space-y-2">
                <NextLink href={`/staff/${item.slug}`}>
                  <Text as="h3" caps size="meta" weight="bold" align="center">
                    {item.name}
                  </Text>
                </NextLink>
                {item.jobTitle && (
                  <Text as="p" size="small" align="center">
                    {item.jobTitle}
                  </Text>
                )}
                {item.email && (
                  <Text caps size="meta">
                    <Link
                      href={`mailto:${item.email}`}
                      className="flex justify-center items-center"
                    >
                      <EnvelopeOpenIcon className="inline mr-3" />
                      {item.email}
                    </Link>
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default StaffGrid;
