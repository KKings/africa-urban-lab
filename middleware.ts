import getAvailableLocales from '@/app/i18n/settings';
import { type NextRequest, NextResponse } from 'next/server';
import { SiteLocale } from './graphql/types/graphql';

function buildUrl(locale: SiteLocale, path: string) {
  return locale
    ? `/${locale}${path || ''}` 
    : `${path || ''}`;
}

export async function middleware(request: NextRequest) {
  let { pathname = '/' } = request.nextUrl;

  if (pathname === "undefined") {
    pathname = '/';
  }
  
  const locales = await getAvailableLocales();

  const localeInPathname = locales.find((locale) =>
    pathname.match(new RegExp(`^/${locale}($|/)`)),
  );

  const normalizedLocale = localeInPathname || SiteLocale.En;

  const pathnameWithoutLocale = localeInPathname
    ? pathname.replace(new RegExp(`^/${localeInPathname}`), '')
    : pathname;

  const normalizedPathnameWithoutLocale =
    pathnameWithoutLocale && pathnameWithoutLocale !== '/'
      ? pathnameWithoutLocale
      : '/home';

  const normalizedPathname = buildUrl(
    normalizedLocale,
    normalizedPathnameWithoutLocale,
  );

  if (pathname.startsWith('/test/')) {
    return;
  }

  if (normalizedLocale === SiteLocale.En) {
    return NextResponse.rewrite(new URL(normalizedPathname, request.url));
  }

  if (pathname !== normalizedPathname) {
    return NextResponse.redirect(new URL(normalizedPathname, request.url));
  }
}

export const config = {
  matcher: ['/((?!.*\\.|_next|api\\/).*)'],
};