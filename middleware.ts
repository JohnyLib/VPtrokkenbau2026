import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Apply authorization checks only to /admin routes, excluding /admin/login
  if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    const secret = process.env.JWT_SECRET || 'vp-trockenbau-secure-session-key-2026-v1';
    
    let isAuthorized = false;
    if (sessionCookie) {
      const payload = await verifyJWT(sessionCookie, secret);
      if (payload && payload.role === 'admin') {
        isAuthorized = true;
      }
    }
    
    if (!isAuthorized) {
      // Redirect to the login page, retaining any original query parameters
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
