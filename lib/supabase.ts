import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://qjprpwhiqnalcwyzlzyn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_vMQNNF_Fg2jIQORMisJ-NQ_ar4BGJB4';
// service role key is server-only
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

// Public client for client-side or general public read operations
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Admin client that bypasses RLS policies (Only works on server side)
// If SUPABASE_SERVICE_ROLE_KEY is not defined, we fall back to the anon key
// and output a warning.
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// Helper to check if admin client is using the service role key
export const isServiceRoleConfigured = !!supabaseServiceKey;
