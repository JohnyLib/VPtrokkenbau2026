import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear session cookie
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Instant expiry
    });
    
    return response;
  } catch (error: any) {
    console.error('Logout API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
