import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
<<<<<<< Updated upstream

export const config = {
  matcher: ['/admin/:path*'],
=======
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
>>>>>>> Stashed changes
};

export async function middleware(request: NextRequest) {
  const role = request.cookies.get('role');
<<<<<<< Updated upstream

  console.log('MIDDLEWARE-----------------', request.url, role?.value);

=======
  console.log('MIDDLEWARE');
>>>>>>> Stashed changes
  if (role?.value !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
