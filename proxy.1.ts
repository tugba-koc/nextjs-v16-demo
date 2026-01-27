import { NextResponse, type NextRequest } from 'next/server';

const ROUTES = {
  HOME: '/home',
  ABOUT_PREFIX: '/about/',
  OLD_HOME: '/old-home',
} as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ROUTES.ABOUT_PREFIX)) {
    return NextResponse.rewrite(new URL(ROUTES.HOME, request.url));
  }

  if (pathname === ROUTES.OLD_HOME) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/about/:path*', '/old-home'],
};
