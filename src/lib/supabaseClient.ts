import { createClient } from '@supabase/supabase-js';

// Load from environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Type-safe session data
type SessionData = {
  user_id: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
  duration: number;   // in minutes or seconds
};

export async function saveSession(sessionData: SessionData) {
  const { data, error } = await supabase
    .from('focus_sessions')
    .insert([sessionData]);

  if (error) throw error;
  return data;
}

// Heatmap fetcher
export const fetchHeatmapData = async (
  userId: string,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month, 1).toISOString().split("T")[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

  const { data, error } = await supabase
    .from('daily_focus')
    .select('date, hours')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) {
    console.error('Error fetching heatmap data:', error);
    return [];
  }

  return data.map((entry: any) => ({
    date: entry.date,
    value: Math.min(Math.floor(entry.hours), 4), // intensity scale
  }));
};