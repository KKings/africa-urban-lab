import {
  PublicationsDocument,
  type PublicationsQuery,
  type PublicationsQueryVariables,
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = PublicationsQuery;
export type Variables = PublicationsQueryVariables;

export const query = PublicationsDocument;