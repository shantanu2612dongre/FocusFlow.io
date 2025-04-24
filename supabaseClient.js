import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://pvhaxkhebnpvwtptidhe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2aGF4a2hlYm5wdnd0cHRpZGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MzU0MzYsImV4cCI6MjA1OTQxMTQzNn0.JzZxGfQ7q5GFAanSgLjwxPS_GPyCq25KhCtJitqa82w';

export const supabase = createClient(supabaseUrl, supabaseKey);
export async function saveSession(sessionData) {
    const { data, error } = await supabase
      .from('focus_sessions')
      .insert([sessionData]);
  
    if (error) throw error;
    return data;
  }
  