// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pnfuotqwdqnqswhklttv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZnVvdHF3ZHFucXN3aGtsdHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDEwMTEsImV4cCI6MjA2MDk3NzAxMX0.Hsu6P7V4rBzyd2g3LndaCVKOL6TkOaGco3p3X6aFUgU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
