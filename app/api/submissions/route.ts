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
    console.error('Auth verification error inside submissions API:', err);
    return false;
  }
}

// 1. GET - Fetch all form submissions in descending order of date
export async function GET(request: Request) {
  try {
    if (!(await checkAdminAuth(request))) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Error in GET /api/submissions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. PATCH - Update status of submission (new, read, archived)
export async function PATCH(request: Request) {
  try {
    if (!(await checkAdminAuth(request))) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ error: 'ID oder Status fehlt' }, { status: 400 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, submission: data?.[0] });
  } catch (error: any) {
    console.error('Error in PATCH /api/submissions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE - Delete form submission
export async function DELETE(request: Request) {
  try {
    if (!(await checkAdminAuth(request))) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID fehlt' }, { status: 400 });
    }
    
    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in DELETE /api/submissions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
