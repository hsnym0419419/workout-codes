import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { WorkoutLog } from '@/types/workout';

export function useHistory() {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('workout_logs')
      .select('*')
      .order('date', { ascending: false })
      .limit(50);

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setLogs(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const saveLog = useCallback(
    async (log: Omit<WorkoutLog, 'id' | 'created_at'>) => {
      const { data, error: insertError } = await supabase
        .from('workout_logs')
        .insert([log])
        .select();

      if (insertError) {
        setError(insertError.message);
        return { error: insertError };
      }

      if (data && data.length > 0) {
        setLogs((prev) => [data[0] as WorkoutLog, ...prev]);
      } else {
        fetchLogs();
      }
      return { error: null };
    },
    [fetchLogs]
  );

  return { logs, loading, error, saveLog, refetch: fetchLogs };
}
