import { auth } from './auth';

const AUTH_ROUTES = ['/login', '/sign-up', '/password/reset', '/password/new'];
const PRIVATE_ROUTES = ['/intake-forms', '/']; // slash means “dashboard/home”

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);

  // 1) Auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return;
  }

  // 2) Private pages
  if (
    PRIVATE_ROUTES.some(
      (r) => pathname === r || pathname.startsWith(r + '/'),
    ) &&
    !isLoggedIn
  ) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }

  // 3) Everything else (including API) — just proceed
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
