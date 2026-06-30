/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables (VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY) are missing. ' +
    'Please configure them in .env.local for full functionality.'
  );
}

// Fallback to placeholder strings to prevent initialization crash on startup
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url-for-compilation.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key-for-compilation'
);
