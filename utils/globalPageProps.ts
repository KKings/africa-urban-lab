import { SiteLocale } from '@/graphql/types/graphql';

export type GlobalPageProps = {
  params: {
    locale: SiteLocale;
  };
};

export function buildUrl(globalPageProps: GlobalPageProps, path?: string) {
  const hasLocale = globalPageProps?.params?.locale 
    && globalPageProps?.params?.locale !== SiteLocale.En;
  const normalizedPath = path === '/home' ? '/' : (path || '');

  return hasLocale 
    ? `/${globalPageProps.params.locale}${normalizedPath}` 
    : `${normalizedPath}`;
}
