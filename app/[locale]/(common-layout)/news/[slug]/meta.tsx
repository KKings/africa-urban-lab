import {
  NewsPostsDocument,
  type NewsPostsQuery,
  type NewsPostsQueryVariables,
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = NewsPostsQuery;
export type Variables = NewsPostsQueryVariables;

export const query = NewsPostsDocument;