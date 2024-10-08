import { type FragmentType, getFragmentData } from "@/graphql/types";
import NextImage from "next/image";
import { StaffSectionFragmentDoc } from "@/graphql/types/graphql";
import { GlobalPageProps } from "@/utils/globalPageProps";
import { Section } from "@/components/ui/section";
import { cn } from "@/components/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants, Text } from "@/components/ui";
import Link from "next/link";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Markdown } from "@/components/ui/markdown";
import clsx from "clsx";

type Props = {
  fragment: FragmentType<typeof StaffSectionFragmentDoc>;
  globalPageProps?: GlobalPageProps;
};

const StaffGrid = ({ fragment }: Props) => {
  const { staffTitle, staff = [], bgColor, textColor } = getFragmentData(
    StaffSectionFragmentDoc,
    fragment
  );

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
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <button className={cn("space-y-w4 w-full md:basis-1/2-gap-6 lg:basis-1/3-gap-6")}>
                  <div className="relative aspect-[320/290]">
                    <NextImage
                      src={item?.image?.responsiveImage?.src ?? ""}
                      alt={item?.image?.responsiveImage?.alt ?? ""}
                      // height={290}
                      // width={320}
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Text as="h3" caps size="meta" weight="bold" align="center">
                      {item.name}
                    </Text>
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
                </button>
              </DialogTrigger>
              <DialogContent
                overlayClassName="bg-[rgba(239,239,239,0.9)]"
                className={clsx([
                  "bg-background w-full max-w-[840px]",
                  "h-100svh max-h-[100%] lg:max-h-[85vh]",
                  "overflow-auto mt-[-1px]",
                ])}
                buttonClassName="fixed"
                showClose
              >
                <DialogTitle className="sr-only">{item.name}</DialogTitle>
                <DialogDescription className="sr-only">More information about {item.name}</DialogDescription>
                <div className="space-y-w8 h-full overflow-hidden">
                  <div className="flex justify-center pb-2">
                    <div className="relative aspect-[320/290] w-[320px] mx-auto">
                      <NextImage
                        src={item?.image?.responsiveImage?.src ?? ""}
                        alt={item?.image?.responsiveImage?.alt ?? ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Text as="h2" caps size="lead" align="center">
                      {item.name}
                    </Text>
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
                  <div className="space-y-w4 text-center">
                    <Markdown>{item.biography ?? ""}</Markdown>
                  </div>
                  {item.cvLink?.url && (
                    <p className="text-center">
                      <Link
                        href={item.cvLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" })
                        )}
                      >
                        <Text as="span" size="meta" caps align="center">
                          Download CV
                        </Text>
                      </Link>
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default StaffGrid;
