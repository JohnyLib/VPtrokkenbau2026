import { NextResponse } from 'next/server';
import { supabasePublic } from '../../../../lib/supabase';
import { signJWT } from '../../../../lib/auth';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    console.error('No code returned from Supabase OAuth');
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', request.url));
  }

  try {
    // Exchange the temporary OAuth authorization code for a verified session
    const { data, error } = await supabasePublic.auth.exchangeCodeForSession(code);
    if (error || !data.session) {
      throw error || new Error('No session returned from Supabase code exchange');
    }

    const email = data.session.user?.email;
    if (!email) {
      throw new Error('User does not have an associated email address');
    }

    // Load and clean whitelisted Gmails
    const allowedEmailsStr = process.env.ALLOWED_ADMIN_EMAILS || '';
    const allowedEmails = allowedEmailsStr
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    const isWhitelisted = allowedEmails.includes(email.toLowerCase());

    if (!isWhitelisted) {
      console.warn(`Unauthorized administrative login attempt blocked for: ${email}`);
      // Log out of Supabase to clear any active temporary session
      await supabasePublic.auth.signOut();
      return NextResponse.redirect(new URL('/admin/login?error=email_not_whitelisted', request.url));
    }

    // Sign a secure HS256 JWT cookie identical to the manual login flow
    const jwtSecret = process.env.JWT_SECRET || 'vp-trockenbau-secure-session-key-2026-v1';
    const payload = {
      username: 'admin_oauth_google',
      email: email,
    };

    const token = await signJWT(payload, jwtSecret);

    const response = NextResponse.redirect(new URL('/admin', request.url));

    // Set secure HTTP-only session cookie expiring in 24 hours
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Google OAuth session exchange failure:', err);
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', request.url));
  }
}
