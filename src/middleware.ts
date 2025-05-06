import { NextResponse } from 'next/server';
import { auth } from './auth';

const AUTH_ROUTES = ['/login', '/sign-up', '/password/reset', '/password/new'];
const PRIVATE_ROUTES = ['/intake-forms', '/']; // slash means “dashboard/home”

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);

  // 1) Auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // 2) Private pages
  if (
    PRIVATE_ROUTES.some(
      (r) => pathname === r || pathname.startsWith(r + '/'),
    ) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3) Everything else (including API) — just proceed
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|.*\\.(.*)|favicon.ico).*)'],
};
