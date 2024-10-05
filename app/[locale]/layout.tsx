import { DialogProvider } from '@/components/Dialog/hooks/use-dialog-context';
import { ManinMenuEvents } from '@/components/MainMenu';
import ScrollToTop from '@/components/ScrollToTop';
import { LayoutDocument } from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';
import { Suspense } from 'react';
import { toNextMetadata } from 'react-datocms/seo';

type Params = GlobalPageProps & {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const { isEnabled: isDraft } = draftMode();
  const data = await queryDatoCMS(LayoutDocument, {}, isDraft);
  return toNextMetadata(data._site.faviconMetaTags);
}

export default async function RootLayout({ children, ...pageProps }: Params) {
  const { isEnabled: isDraft } = draftMode();

  return (
    <DialogProvider>
      {children}
      <Suspense fallback={null}>
        <ManinMenuEvents />
      </Suspense>
    </DialogProvider>
  );
}
