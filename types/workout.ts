export interface WorkoutLog {
  id: string;
  date: string;
  completed: boolean;
  duration_seconds: number;
  exercises_completed: number;
  created_at?: string;
}

export type WorkoutPhase = 'idle' | 'exercise' | 'rest' | 'completed';

export interface WorkoutState {
  phase: WorkoutPhase;
  currentIndex: number;
  secondsLeft: number;
  totalElapsed: number;
}
