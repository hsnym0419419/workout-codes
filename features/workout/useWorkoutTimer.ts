import { useState, useRef, useCallback, useEffect } from 'react';
import { Exercise } from '@/types/exercise';

export type TimerPhase = 'idle' | 'exercise' | 'rest' | 'completed';

export interface WorkoutTimerResult {
  currentIndex: number;
  phase: TimerPhase;
  isPaused: boolean;
  timeRemaining: number;
  totalElapsed: number;
  currentExercise: Exercise | undefined;
  nextExercise: Exercise | undefined;
  totalExercises: number;
  overallProgress: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  reset: () => void;
}

export function useWorkoutTimer(exercises: Exercise[]): WorkoutTimerResult {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<TimerPhase>('idle');
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const endTimeRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef(0);
  const currentIndexRef = useRef(0);
  const currentPhaseRef = useRef<TimerPhase>('idle');
  const exercisesRef = useRef(exercises);
  const mainIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  currentIndexRef.current = currentIndex;
  currentPhaseRef.current = phase;
  exercisesRef.current = exercises;

  useEffect(() => {
    return () => {
      if (mainIntervalRef.current) clearInterval(mainIntervalRef.current);
      if (elapsedIntervalRef.current) clearInterval(elapsedIntervalRef.current);
    };
  }, []);

  function _clearMain() {
    if (mainIntervalRef.current) { clearInterval(mainIntervalRef.current); mainIntervalRef.current = null; }
  }

  function _clearElapsed() {
    if (elapsedIntervalRef.current) { clearInterval(elapsedIntervalRef.current); elapsedIntervalRef.current = null; }
  }

  function _advance() {
    const idx = currentIndexRef.current;
    const ph = currentPhaseRef.current;
    const exs = exercisesRef.current;
    if (ph === 'exercise') {
      const ex = exs[idx];
      if (ex && ex.rest > 0) { _beginPhase(idx, 'rest'); }
      else { _beginPhase(idx + 1, 'exercise'); }
    } else if (ph === 'rest') {
      _beginPhase(idx + 1, 'exercise');
    }
  }

  function _startInterval() {
    _clearMain();
    mainIntervalRef.current = setInterval(() => {
      if (endTimeRef.current === null) return;
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      setTimeRemaining(remaining);
      if (remaining <= 0) { _clearMain(); _advance(); }
    }, 200);
  }

  function _beginPhase(targetIndex: number, targetPhase: 'exercise' | 'rest') {
    const exs = exercisesRef.current;
    const ex = exs[targetIndex];
    if (!ex) { _clearMain(); _clearElapsed(); setPhase('completed'); setTimeRemaining(0); return; }
    const duration = targetPhase === 'exercise' ? ex.duration : ex.rest;
    if (targetPhase === 'rest' && duration <= 0) { _beginPhase(targetIndex + 1, 'exercise'); return; }
    const end = Date.now() + duration * 1000;
    endTimeRef.current = end;
    setCurrentIndex(targetIndex);
    setPhase(targetPhase);
    setTimeRemaining(duration);
    setIsPaused(false);
    _startInterval();
  }

  const start = useCallback(() => {
    setTotalElapsed(0);
    _clearElapsed();
    elapsedIntervalRef.current = setInterval(() => setTotalElapsed((t) => t + 1), 1000);
    _beginPhase(0, 'exercise');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pause = useCallback(() => {
    const ph = currentPhaseRef.current;
    if (ph === 'idle' || ph === 'completed') return;
    if (endTimeRef.current !== null) {
      pausedRemainingRef.current = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
    }
    endTimeRef.current = null;
    _clearMain();
    _clearElapsed();
    setIsPaused(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resume = useCallback(() => {
    const ph = currentPhaseRef.current;
    if (ph === 'idle' || ph === 'completed') return;
    endTimeRef.current = Date.now() + pausedRemainingRef.current * 1000;
    setTimeRemaining(pausedRemainingRef.current);
    setIsPaused(false);
    elapsedIntervalRef.current = setInterval(() => setTotalElapsed((t) => t + 1), 1000);
    _startInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = useCallback(() => {
    _advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    _clearMain();
    _clearElapsed();
    endTimeRef.current = null;
    pausedRemainingRef.current = 0;
    setCurrentIndex(0);
    setPhase('idle');
    setIsPaused(false);
    setTimeRemaining(0);
    setTotalElapsed(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overallProgress = phase === 'completed' ? 1 : exercises.length > 0 ? currentIndex / exercises.length : 0;

  return {
    currentIndex, phase, isPaused, timeRemaining, totalElapsed,
    currentExercise: exercises[currentIndex],
    nextExercise: exercises[currentIndex + 1],
    totalExercises: exercises.length,
    overallProgress,
    start, pause, resume, skip, reset,
  };
}
