// import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);
// export async function middleware() {
//   return NextResponse.next();
// }

export const config = {
  // runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|trpc|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'
  ]
};
