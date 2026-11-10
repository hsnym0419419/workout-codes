import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL ??
  'https://ycpllktzsmwlepcxhyxx.supabase.co';

const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcGxsa3R6c213bGVwY3hoeXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0OTIyNTQsImV4cCI6MjEwNzA2ODI1NH0.zX-qi6RqnB8jRux8hQHzsQMIknsHGt9z7QaWt-CVdYU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
