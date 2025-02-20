import {
  ResearchDocument,
  type ResearchQuery,
  type ResearchQueryVariables,
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = ResearchQuery;
export type Variables = ResearchQueryVariables;

export const query = ResearchDocument;