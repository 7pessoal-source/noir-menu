import { createClient } from '@supabase/supabase-js';

// Credenciais do Supabase (mesmas do painel admin)
const supabaseUrl = 'https://rhheregmvexxgqmegqoq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaGVyZWdtdmV4eGdxbWVncW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjExODAsImV4cCI6MjA1NDQzNzE4MH0.PVF3LmTmJlpOF3oa3WEFtJxLPtJqOjBjQj7eVQm1234';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
