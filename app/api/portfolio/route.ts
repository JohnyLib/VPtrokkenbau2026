import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyJWT } from '@/lib/auth';
import { staticProjects } from '@/lib/staticProjects';

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
    console.error('Auth verification error inside API:', err);
    return false;
  }
}

// 1. GET - Fetch all projects ordered by order_index, with dynamic fallback to staticProjects
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('portfolio_projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects from Supabase, falling back to static projects:', error);
      return NextResponse.json(staticProjects);
    }
    
    // Fallback if database has no rows
    if (!data || data.length === 0) {
      console.log('No portfolio projects in Supabase, returning static projects.');
      return NextResponse.json(staticProjects);
    }
    
    return NextResponse.json(data);
  } catch (err) {
    console.error('Exception in GET /api/portfolio, returning static projects fallback:', err);
    return NextResponse.json(staticProjects);
  }
}

// 2. POST - Create new project
export async function POST(request: Request) {
  try {
    if (!(await checkAdminAuth(request))) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, category, q, area, duration, client, location, testimonial, images, order_index } = body;
    
    if (!title || !category || !q || !area || !duration) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('portfolio_projects')
      .insert([
        {
          title,
          category,
          q,
          area,
          duration,
          client: client || null,
          location: location || null,
          testimonial: testimonial || null,
          images: images || [],
          order_index: order_index || 0
        }
      ])
      .select();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, project: data?.[0] });
  } catch (error: any) {
    console.error('Error in POST /api/portfolio:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. PUT - Update existing project
export async function PUT(request: Request) {
  try {
    if (!(await checkAdminAuth(request))) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, title, category, q, area, duration, client, location, testimonial, images, order_index } = body;
    
    if (!id || !title || !category || !q || !area || !duration) {
      return NextResponse.json({ error: 'ID oder Pflichtfelder fehlen' }, { status: 400 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('portfolio_projects')
      .update({
        title,
        category,
        q,
        area,
        duration,
        client: client || null,
        location: location || null,
        testimonial: testimonial || null,
        images: images || [],
        order_index: order_index || 0
      })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, project: data?.[0] });
  } catch (error: any) {
    console.error('Error in PUT /api/portfolio:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 4. DELETE - Delete project
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
      .from('portfolio_projects')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in DELETE /api/portfolio:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
