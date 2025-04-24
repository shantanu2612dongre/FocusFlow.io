import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvhaxkhebnpvwtptidhe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2aGF4a2hlYm5wdnd0cHRpZGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MzU0MzYsImV4cCI6MjA1OTQxMTQzNn0.JzZxGfQ7q5GFAanSgLjwxPS_GPyCq25KhCtJitqa82w'

export const supabase = createClient(supabaseUrl, supabaseKey);
export async function saveSession(sessionData) {
    const { data, error } = await supabase
      .from('focus_sessions')
      .insert([sessionData]);
  
    if (error) throw error;
    return data;
  }
  export const fetchHeatmapData = async (userId: string) => {
    const { data, error } = await supabase
      .from('daily_focus')
      .select('date, hours')
      .eq('user_id', userId)
      .lte('date', new Date().toISOString().split('T')[0]);
  
    if (error) {
      console.error('Error fetching heatmap data:', error);
      return [];
    }
  
    // Map the data to the required format for the heatmap
    return data.map((entry: any) => ({
      date: entry.date,
      value: Math.min(Math.floor(entry.hours), 4), // Limit value to 4 (max intensity)
    }));
  };