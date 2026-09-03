import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /login is captured by [locale] and 404s — send it to the real login page
  if (pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/en/login';
    return NextResponse.redirect(url);
  }

  // /en/admin (and other locales) is not a real route — strip the locale prefix
  for (const locale of routing.locales) {
    if (pathname === `/${locale}/admin` || pathname.startsWith(`/${locale}/admin/`)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(`/${locale}`, '') || '/admin';
      return NextResponse.redirect(url);
    }
  }

  // Admin lives outside next-intl. Never run intlMiddleware on /admin
  // (it would prefix /az and bounce against the strip above).
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_token')?.value;
    if (!adminSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/en/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`, `images/...`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/admin/:path*']
};
