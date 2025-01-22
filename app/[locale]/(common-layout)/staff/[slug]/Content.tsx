import {
  isBlockquote,
  isHeading,
  isLink,
  isList,
  isListItem,
  isParagraph,
} from "datocms-structured-text-utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredText, renderNodeRule } from "react-datocms";
import clsx from "clsx";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import QuoteBlock from "@/components/QuoteBlock";
import DatoImage from "@/components/DatoImage";
import type { ContentPage } from "@/components/WithRealTimeUpdates/types";
import type { PageProps, Query } from "./meta";
import { buttonVariants, Text } from "@/components/ui";
import { cn } from "@/components/utils";
import { PublicationTabs } from "./_components/Tabs";

const Content: ContentPage<PageProps, Query> = ({ data }) => {
  if (!data.author) {
    notFound();
  }

  return (
    <section className="bg-theme-canvas">
      <div className="container py-12 md:py-24 bg-white">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12 space-y-6">
            <div className="gap-4 flex flex-col sm:flex-row sm:items-center">
              <div className="">
                <div className="relative w-full md:w-[240px] md:h-[240px]">
                  <DatoImage
                    className="h-full w-full object-cover"
                    fragment={data.author.picture.responsiveImage}
                  />
                </div>
              </div>
              <div className="w-full space-y-3 sm:space-y-4">
                <Text
                  as="h1"
                  weight="semi"
                  className="text-heading sm:text-heading break-words"
                >
                  {data.author.name}
                </Text>
                <Text size="meta" className="break-words">
                  {data.author.jobTitle}
                </Text>
                {data.author.email && (
                  <Text caps size="meta">
                    <Link
                      href={`mailto:${data.author.email}`}
                      className="flex break-words"
                    >
                      <EnvelopeOpenIcon className="inline mr-3" />
                      {data.author.email}
                    </Link>
                  </Text>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <StructuredText
                data={data.author.biography}
                customNodeRules={[
                  renderNodeRule(isHeading, ({ children, key, node }) => {
                    return (
                      <Text
                        as={`h${node.level}`}
                        className={clsx([
                          "mb-4 mt-9",
                          { ["text-2xl"]: node.level === 2 },
                          { ["text-xl"]: node.level === 3 },
                          { ["text-lg"]: node.level === 4 },
                          { ["text-sm"]: node.level === 5 },
                          { ["text-meta"]: node.level === 6 },
                        ])}
                        key={key}
                        weight="bold"
                      >
                        {children}
                      </Text>
                    );
                  }),
                  renderNodeRule(isList, ({ children, key, node }) => {
                    const Node = node.style === "bulleted" ? "ul" : "ol";
                    return (
                      <Node
                        className={clsx([
                          "ps-6 mt-4 marker:text-base",
                          { ["list-disc"]: node.style === "bulleted" },
                          { ["list-decimal"]: node.style !== "bulleted" },
                        ])}
                        key={key}
                      >
                        {children}
                      </Node>
                    );
                  }),
                  renderNodeRule(isListItem, ({ children, key, node }) => {
                    return (
                      <li key={key} className="mb-4">
                        {children}
                      </li>
                    );
                  }),
                  renderNodeRule(isParagraph, ({ children, key }) => {
                    return (
                      <Text as="p" size="base" key={key}>
                        {children}
                      </Text>
                    );
                  }),
                  renderNodeRule(isLink, ({ node, children, key }) => {
                    const attributeObject =
                      node.meta?.reduce(
                        (acc, { id, value }) => {
                          acc[id] = value;
                          return acc;
                        },
                        {} as Record<string, string>
                      ) || {};

                    return (
                      <Link
                        className="text-base font-medium leading-relaxed text-body-color underline sm:text-lg sm:leading-relaxed"
                        href={node.url}
                        key={key}
                        {...attributeObject}
                      >
                        {children}
                      </Link>
                    );
                  }),
                  renderNodeRule(isBlockquote, ({ children, key }) => {
                    return <QuoteBlock key={key}>{children}</QuoteBlock>;
                  }),
                ]}
              />
              {data.author.cvLink?.url && (
                <p className="text-center">
                  <Link
                    href={data.author.cvLink.url}
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
            {data.author.publications && data.author.publications.length > 0 && (
              <div className="pt-10 space-y-6">
                <Text as="h2" weight="bold" size="heading">
                  Publications
                </Text>
                <PublicationTabs publications={data.author.publications} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
