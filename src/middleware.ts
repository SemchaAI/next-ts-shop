import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, pathnames } from './navigation';

export const config = {
  //'/admin/:path*'
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ru|en)/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};

export default withExtraMiddleware(
  createMiddleware({
    // A list of all locales that are supported
    locales,
    localePrefix,
    pathnames,
    // Used when no locale matches
    defaultLocale: 'en',
  })
);

function withExtraMiddleware(next: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Step 1: Potentially change the incoming request
    const role = request.cookies.get('role');
    console.log('MIDDLEWARE');
    if (
      role?.value !== 'ADMIN' &&
      request.nextUrl.pathname.includes('/admin')
    ) {
      return NextResponse.redirect(new URL('/ru/login', request.url));
    }

    // Step 2: Call the nested next-intl middleware
    const response = await next(request, event);

    // Step 3: Potentially change the response
    // if (response) {
    //   response.headers.set('x-test', 'test');
    // }

    return response;
  };
}

// export async function middleware(request: NextRequest) {
//   const role = request.cookies.get('role');
//   console.log('MIDDLEWARE');
//   if (role?.value !== 'ADMIN') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }
