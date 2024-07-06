import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import createMiddleware from 'next-intl/middleware';
// import { locales, localePrefix, pathnames } from './navigation';

export const config = {
  //'/admin/:path*'
  matcher: [
    '/admin/:path*',
    // Enable a redirect to a matching locale at the root
    // '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // '/(ru|en)/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // '/((?!_next|_vercel|.*\\..*).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const role = request.cookies.get('role');
  console.log('MIDDLEWARE', role, request.cookies.getAll());
  if (role?.value !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
