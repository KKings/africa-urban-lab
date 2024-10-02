import NextImage from "next/image";
import { Text } from "@/components/ui/text";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/ui/markdown";
import { Link } from "@/components/ui/link";
import { buttonVariants } from "@/components/ui";
import clsx from "clsx";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { LecturerRecord } from "@/graphql/types/graphql";
import { cn } from "@/components/utils";

type LecturerGroupProps = {
  kind?: string;
  lecturers: LecturerRecord[];
};

export const LecturerGroup = ({ kind, lecturers }: LecturerGroupProps) => {
  return (
    <div className="container space-y-w8 max-w-[1024px] text-foreground">
      {kind && (
        <Text as="h2" caps size="meta" align="center">
          {kind}
        </Text>
      )}
      <div
        className={cn(
          "flex gap-w6 w-full justify-center items-start",
          lecturers.length > 3 ? "flex-wrap" : "flex-nowrap"
        )}
      >
        {lecturers.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <button className={clsx("space-y-w4 basis-1/3")}>
                <div className="relative aspect-[320/290]">
                  <NextImage
                    src={item?.image?.responsiveImage?.src ?? ""}
                    alt={item?.image?.responsiveImage?.alt ?? ""}
                    // height={290}
                    // width={320}
                    fill
                    className="object-cover"
                  />
                </div>
                <Text as="h3" caps size="meta" weight="medium" align="center">
                  {item.name}
                </Text>
              </button>
            </DialogTrigger>
            <DialogContent
              // bg-theme-canvas
              overlayClassName="bg-[rgba(239,239,239,0.9)]"
              className="bg-background max-w-[840px] max-h-[85vh] overflow-auto"
              buttonClassName="fixed"
              showClose
            >
              <div className="space-y-w8 h-full overflow-y-auto">
                <div className="flex justify-center pb-2">
                  <div className="relative aspect-[320/290] w-[320px] mx-auto">
                    <NextImage
                      src={item?.image?.responsiveImage?.src ?? ""}
                      alt={item?.image?.responsiveImage?.alt ?? ""}
                      // height={290}
                      // width={320}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Text as="h2" caps size="lead" align="center">
                    {item.name}
                  </Text>
                  <Text as="h3" size="small" align="center">
                    {item.jobTitle}
                  </Text>
                  {item.email && (
                    <Text caps size="meta">
                      <Link href={`mailto:${item.email}`} className="flex justify-center items-center">
                        <EnvelopeOpenIcon className="inline mr-3" />
                        {item.email}
                      </Link>
                    </Text>
                  )}
                </div>
                <div className="space-y-w4 text-center">
                  <Markdown>{item.biography ?? ''}</Markdown>
                </div>
                {item.cvLink && (
                  <p className="text-center">
                    <Link
                      href={item.cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        buttonVariants({ variant: "outline", size: "lg" })
                      )}
                    >
                      <Text as="span" size="meta" caps align="center">
                        Download CV
                      </Text>
                    </Link>
                  </p>
                )}
                {/* <Text as="h3" caps size="meta" weight="medium" align="center"></Text> */}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};
