// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pnfuotqwdqnqswhklttv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZnVvdHF3ZHFucXN3aGtsdHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDEwMTEsImV4cCI6MjA2MDk3NzAxMX0.Hsu6P7V4rBzyd2g3LndaCVKOL6TkOaGco3p3X6aFUgU'; // Get from Supabase Dashboard

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
