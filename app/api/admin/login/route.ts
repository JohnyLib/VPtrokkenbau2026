import { NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, email, oauth_token } = body;
    
    const secret = process.env.JWT_SECRET || 'vp-trockenbau-secure-session-key-2026-v1';

    // 1. Unified Google OAuth login
    if (email && oauth_token) {
      // Validate that the email address is whitelisted in ALLOWED_ADMIN_EMAILS
      const allowedEmailsStr = process.env.ALLOWED_ADMIN_EMAILS || '';
      const allowedEmails = allowedEmailsStr
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean);

      const isWhitelisted = allowedEmails.includes(email.toLowerCase());

      if (!isWhitelisted) {
        console.warn(`Blocked unauthorized administrative Gmail login attempt: ${email}`);
        return NextResponse.json({ 
          success: false, 
          error: 'Diese E-Mail-Adresse ist nicht für das Admin-Dashboard autorisiert (keine Berechtigung).' 
        }, { status: 403 });
      }

      // Email matches whitelist, sign a secure administration JWT token
      const sessionToken = await signJWT({ role: 'admin', username: 'admin_oauth_google', email }, secret);
      const response = NextResponse.json({ success: true });

      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // 2. Standard Manual Form Credentials login
    const envUser = process.env.ADMIN_USERNAME || 'admin';
    const envPass = process.env.ADMIN_PASSWORD || 'admin123!';
    
    if (username === envUser && password === envPass) {
      const sessionToken = await signJWT({ role: 'admin', username }, secret);
      const response = NextResponse.json({ success: true });
      
      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      return response;
    }
    
    return NextResponse.json({ success: false, error: 'Ungültige Zugangsdaten' }, { status: 401 });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
