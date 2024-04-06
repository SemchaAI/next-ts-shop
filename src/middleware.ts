import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { appStore } from './lib/features/storesInit/appStore';

export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(request: NextRequest) {
  const role = appStore.getState().user.user.role;
  console.log('MIDDLEWARE-----------------', request.url, role);
  if (role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
