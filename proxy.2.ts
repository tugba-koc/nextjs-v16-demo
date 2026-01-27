import { NextResponse, type NextRequest } from 'next/server';

const ROUTES = {
  HOME: '/home',
  ABOUT_PREFIX: '/about/',
  OLD_HOME: '/old-home',
} as const;

export function proxy(request: NextRequest) {
  const session = request.cookies.get('access-token');

  if (!session) {
    const to = new URL('/auth/login', request.url);
    to.searchParams.set(
      'next',
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(to);
  }

  const res = NextResponse.next();
  res.cookies.set({
    name: 'seen',
    value: '1',
    path: '/',
  });
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
