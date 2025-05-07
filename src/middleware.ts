import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

const AUTH_ROUTES = ['/login', '/sign-up', '/password/reset', '/password/new'];
const PRIVATE_ROUTES = ['/intake-forms', '/']; // slash means “dashboard/home”

export const middleware = async (req: NextRequest) => {
  const { pathname, searchParams } = req.nextUrl;
  const session = await auth();
  const isLoggedIn = !!session;
  const isRscRequest =
    req.headers.get('rsc') === '1' || searchParams.has('_rsc');

  // 1) Auth pages
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isLoggedIn) {
      const redirectUrl = new URL('/', req.url);

      // If this was an RSC request, preserve that in the redirect
      if (isRscRequest) {
        // Preserve any existing _rsc parameter
        const rscParam = searchParams.get('_rsc');
        if (rscParam) {
          redirectUrl.searchParams.set('_rsc', rscParam);
        }
      }

      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  // 2) Private pages
  if (
    PRIVATE_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + '/'),
    ) &&
    !isLoggedIn
  ) {
    const redirectUrl = new URL('/login', req.url);

    // If this was an RSC request, preserve that in the redirect
    if (isRscRequest) {
      // Preserve any existing _rsc parameter
      const rscParam = searchParams.get('_rsc');
      if (rscParam) {
        redirectUrl.searchParams.set('_rsc', rscParam);
      }
    }

    return NextResponse.redirect(redirectUrl);
  }

  // 3) Everything else (including API) — just proceed
  return NextResponse.next();
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
