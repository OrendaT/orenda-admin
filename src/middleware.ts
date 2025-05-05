import { NextResponse } from 'next/server';
import { auth } from './auth';

const AUTH_ROUTES = ['/login', '/sign-up', '/password/reset', '/password/new'];
const PRIVATE_ROUTES = ['intake-forms'];

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = AUTH_ROUTES.some((path) => pathname.startsWith(path));
  const isPrivateRoute =
    PRIVATE_ROUTES.some((route) => pathname.startsWith(`/${route}`)) ||
    pathname === '/';
  const isApiRoute =
    pathname.startsWith('/api') || pathname.startsWith('/trpc');

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url)); // Already logged in, redirect to home
    }
    return NextResponse.next(); // Allow access to login/signup
  }

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
