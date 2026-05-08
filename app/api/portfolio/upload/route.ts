import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyJWT } from '@/lib/auth';

// Helper to check if user is an authorized admin
async function checkAdminAuth(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => c.trim().split('='))
    );
    const sessionCookie = cookies['admin_session'];
    const secret = process.env.JWT_SECRET || 'vp-trockenbau-secure-session-key-2026-v1';
    
    if (!sessionCookie) return false;
    const payload = await verifyJWT(sessionCookie, secret);
    return payload && payload.role === 'admin';
  } catch (err) {
    console.error('Auth verification error inside upload API:', err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkAdminAuth(request))) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sanitize filename to prevent special characters from causing URL issues
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${sanitizedName}`;
    
    const { data, error } = await supabaseAdmin.storage
      .from('portfolio')
      .upload(fileName, buffer, {
        contentType: file.type,
        duplex: 'half'
      });
      
    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }
    
    // Construct public URL
    const supabaseUrl = process.env.SUPABASE_URL || 'https://qjprpwhiqnalcwyzlzyn.supabase.co';
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/portfolio/${fileName}`;
    
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
