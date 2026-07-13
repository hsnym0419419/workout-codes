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
      const { error: insertError } = await supabase
        .from('workout_logs')
        .insert([log]);

      if (!insertError) {
        fetchLogs();
      }
      return { error: insertError };
    },
    [fetchLogs]
  );

  return { logs, loading, error, saveLog, refetch: fetchLogs };
}
