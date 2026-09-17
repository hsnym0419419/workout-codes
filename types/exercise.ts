export type RepType = 'timed' | 'single' | 'bilateral';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  rest: number;
  videoId: string;
  thumbnail: string;
  mediaUrl: string;
  mediaType: 'video' | 'image';
  workoutMediaUrl?: string;
  workoutMediaType?: 'video' | 'image';
  muscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  repType?: RepType;
  repCount?: number;
  timedSplitSec?: number;
}
