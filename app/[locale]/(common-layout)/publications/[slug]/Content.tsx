import QuoteBlock from '@/components/QuoteBlock';

import DatoImage from '@/components/DatoImage';
import Highlighter from '@/components/Highlighter';
import type { ContentPage } from '@/components/WithRealTimeUpdates/types';
import { buildUrl } from '@/utils/globalPageProps';
import transformDate from '@/utils/transformDate';
import {
  isBlockquote,
  isHeading,
  isLink,
  isList,
  isListItem,
  isParagraph,
} from 'datocms-structured-text-utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule } from 'react-datocms';
import type { PageProps, Query } from './meta';
import { Button, Text } from '@/components/ui';
import clsx from 'clsx';
import PdfViewer from '@/components/PdfViewer';

const Content: ContentPage<PageProps, Query> = ({
  data,
  ...globalPageProps
}) => {
  if (!data.publication) {
    notFound();
  }

  return (
    <section className="bg-theme-canvas">
      <div className="container py-12 md:py-24 bg-white">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              {data.publication._publishedAt && (
                <Text size="meta" weight="bold" className="mb-5">
                  {transformDate(data.publication._publishedAt)}
                </Text>
              )}
              <div className='mb-10 border-b border-body-color border-opacity-10 pb-6'>
                <Text as="h1" className="font-bold leading-tight [&.text-base]:text-3xl [&.text-base]:sm:text-4xl sm:leading-tight">
                  {data.publication.title}
                </Text>
              </div>
              <div className='flex flex-col space-y-4'>
                <StructuredText
                  data={data.publication.content}
                  renderNode={Highlighter}
                  renderBlock={({ record }) => {
                    switch (record.__typename) {
                      case 'ImageBlockRecord': {
                        return (
                          <div className="relative my-6 overflow-hidden shadow-md sm:h-[300px] md:h-[400px]">
                            <DatoImage
                              fragment={record.image.responsiveImage}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="50% 50%"
                            />
                          </div>
                        );
                      }
                      case 'PdfBlockRecord': {
                        return (
                          <div className="relative overflow-hidden flex justify-center">
                            <PdfViewer key={record.id} source={record?.url} className='my-12' />
                          </div>
                        );
                      }
                      case 'ButtonRecord': {
                        return (
                          <Button
                            key={record.id}
                            asChild
                            variant="outline"
                            size="default"
                            className="w-max self-center mt-4"
                          >
                            <Link href={record.linkUrl || ''}>{record.linkLabel || "Click Here"}</Link>
                          </Button>
                        );
                      }
                      default:
                        return null;
                    }
                  }}
                  renderLinkToRecord={({
                    record,
                    children,
                    transformedMeta,
                  }) => {
                    switch (record.__typename) {
                      case 'PublicationRecord':
                        return (
                          <Link
                            {...transformedMeta}
                            href={buildUrl(
                              globalPageProps,
                              `/publications/${record.slug}`,
                            )}
                            className="text-base font-medium leading-relaxed text-body-color underline sm:text-lg sm:leading-relaxed"
                          >
                            {children}
                          </Link>
                        );
                      default:
                        return null;
                    }
                  }}
                  renderInlineRecord={({ record }) => {
                    switch (record.__typename) {
                      case 'PublicationRecord': {
                        return (
                          <Link
                            key={record.id}
                            href={buildUrl(
                              globalPageProps,
                              `/publications/${record.slug}`,
                            )}
                            className="underline"
                          >
                            {record.title}
                          </Link>
                        );
                      }
                      default:
                        return null;
                    }
                  }}
                  customNodeRules={[
                    renderNodeRule(isHeading, ({ children, key, node }) => {
                      return (
                        <Text
                          as={`h${node.level}`}
                          className={clsx([
                            "mb-4 mt-9",
                            {['text-2xl']: node.level === 2},
                            {['text-xl']: node.level === 3},
                            {['text-lg']: node.level === 4},
                            {['text-sm']: node.level === 5},
                            {['text-meta']: node.level === 6},
                          ])}
                          key={key}
                          weight="bold"
                        >
                          {children}
                        </Text>
                      );
                    }),
                    renderNodeRule(isList, ({ children, key, node }) => {
                      const Node = node.style === 'bulleted' ? 'ul' : 'ol'
                      return (
                        <Node
                          className={clsx([
                            "ps-6 mt-4 marker:text-base",
                            {["list-disc"]: node.style === 'bulleted'},
                            {['list-decimal']: node.style !== 'bulleted'}
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
                        <Text
                          as="p"
                          size="base"
                          key={key}
                        >
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
                          {} as Record<string, string>,
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;