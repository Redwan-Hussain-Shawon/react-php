import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export  function middleware(request) {
  const token =  getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup';
  const isDashboardPath = path === '/dashboard'; 

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isDashboardPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
