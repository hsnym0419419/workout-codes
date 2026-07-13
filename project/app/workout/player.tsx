import React from 'react';
import { useRouter } from 'expo-router';
import { WorkoutPlayer } from '@/features/workout/WorkoutPlayer';
import { usePreferences } from '@/hooks/usePreferences';
import { workoutsByGoalAndLevel, DEFAULT_WORKOUT } from '@/constants/workouts';

export default function PlayerScreen() {
  const router = useRouter();
  const { preferences } = usePreferences();
  const exercises =
    workoutsByGoalAndLevel[preferences.goal]?.[preferences.level] ?? DEFAULT_WORKOUT;
  return <WorkoutPlayer exercises={exercises} onBack={() => router.back()} />;
}
