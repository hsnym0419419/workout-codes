import { useState, useCallback, useRef, useEffect } from 'react';
import { EXERCISES } from '@/constants/exercises';
import { WorkoutPhase } from '@/types/workout';

export function useWorkout() {
  const [phase, setPhase] = useState<WorkoutPhase>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const startElapsedCounter = useCallback(() => {
    if (elapsedRef.current) clearInterval(elapsedRef.current);
    elapsedRef.current = setInterval(() => {
      setTotalElapsed((t) => t + 1);
    }, 1000);
  }, []);

  const runExercise = useCallback(
    (index: number) => {
      if (index >= EXERCISES.length) {
        setPhase('completed');
        clearTimers();
        return;
      }
      const exercise = EXERCISES[index];
      setCurrentIndex(index);
      setPhase('exercise');
      setSecondsLeft(exercise.duration);

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            if (exercise.rest > 0) {
              setPhase('rest');
              setSecondsLeft(exercise.rest);
              intervalRef.current = setInterval(() => {
                setSecondsLeft((rs) => {
                  if (rs <= 1) {
                    clearInterval(intervalRef.current!);
                    runExercise(index + 1);
                    return 0;
                  }
                  return rs - 1;
                });
              }, 1000);
            } else {
              runExercise(index + 1);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    },
    [clearTimers]
  );

  const start = useCallback(() => {
    setTotalElapsed(0);
    startElapsedCounter();
    runExercise(0);
  }, [runExercise, startElapsedCounter]);

  const skipExercise = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const nextIndex = currentIndex + 1;
    runExercise(nextIndex);
  }, [currentIndex, runExercise]);

  const pause = useCallback(() => {
    clearTimers();
    setPhase('idle');
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase('idle');
    setCurrentIndex(0);
    setSecondsLeft(0);
    setTotalElapsed(0);
  }, [clearTimers]);

  const currentExercise = EXERCISES[currentIndex];
  const progress =
    phase === 'exercise' && currentExercise
      ? 1 - secondsLeft / currentExercise.duration
      : phase === 'rest' && currentExercise
      ? 1 - secondsLeft / currentExercise.rest
      : 0;

  return {
    phase,
    currentIndex,
    secondsLeft,
    totalElapsed,
    currentExercise,
    progress,
    totalExercises: EXERCISES.length,
    start,
    pause,
    reset,
    skipExercise,
  };
}
