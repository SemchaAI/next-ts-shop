import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  const role = request.cookies.get('role');

  console.log('MIDDLEWARE-----------------', request.url, role?.value);

  if (role?.value !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
