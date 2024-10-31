// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Your Supabase project URL and public anon key
const supabaseUrl = 'https://tcwkpwulrysgjlpizrbl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjd2twd3VscnlzZ2pscGl6cmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODkwOTYsImV4cCI6MjA0NTk2NTA5Nn0.LjlRE6dENxx9q4C4PH3eGRvToSxGL41eSW8gT9zPhW0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

