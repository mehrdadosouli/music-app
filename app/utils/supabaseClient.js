import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxbaatevljxrvbkwabxx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmFhdGV2bGp4cnZia3dhYnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MzYyMDMsImV4cCI6MjA2OTUxMjIwM30.e08UjSJHxtzlh0gtZPyztsmdvMdXWxV0sbhVqoh44CI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
