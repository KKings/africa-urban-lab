import { sans, serif } from "@/components/ui/fonts";
import '@/styles/global.css';
import { GoogleAnalytics } from "@next/third-parties/google";
import type { GlobalPageProps } from '@/utils/globalPageProps';
import clsx from "clsx";

type Params = GlobalPageProps & {
  children: React.ReactNode;
};

export default async function RootLayout({
  children,
  params: { locale },
}: Params) {
  return (
    <html lang={locale || 'en'}>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <body  className={clsx(sans.variable, serif.variable)}>{children}</body> 
      <GoogleAnalytics gaId="G-QHX5HK1TH8" />
    </html>
  );
}
