import {
  StaffDocument,
  type StaffQuery,
  type StaffQueryVariables,
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = StaffQuery;
export type Variables = StaffQueryVariables;

export const query = StaffDocument;