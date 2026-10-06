export type RepType = 'timed' | 'single' | 'bilateral';

export type MediaSource =
  | string
  | number
  | { uri: string; width?: number; height?: number };

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  rest: number;
  videoId: string;
  thumbnail: MediaSource;
  mediaUrl: MediaSource;
  mediaType: 'video' | 'image';
  workoutMediaUrl?: MediaSource;
  workoutMediaType?: 'video' | 'image';
  muscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  repType?: RepType;
  repCount?: number;
  timedSplitSec?: number;
}
