import { Exercise } from '@/types/exercise';
import { UserPreference } from '@/types/user';

const BASE = 'https://hsnym0419419.github.io/workout-videos';
const IMG = BASE;

const ALL: Exercise[] = [
  {
    id: '1',
    title: 'Jumping Jacks',
    description: 'Stand upright, jump to a position with legs spread wide and arms overhead, then return.',
    duration: 30, rest: 10, videoId: 'c4DAnQ6DtF8',
    thumbnail: `${IMG}/jumpingjack.jpeg`,
    mediaUrl: `${BASE}/jumpingjack_shot.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/jumpingjack.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Full Body', difficulty: 'beginner',
    repType: 'single', repCount: 30,
  },
  {
    id: '2',
    title: 'Wall Sit',
    description: 'Slide your back down a wall until thighs are parallel to the floor. Hold.',
    duration: 30, rest: 10, videoId: 'y-wV4Venusw',
    thumbnail: `${IMG}/wallsit.jpeg`,
    mediaUrl: `${IMG}/wallsit.jpeg`,
    mediaType: 'image',
    muscleGroup: 'Legs', difficulty: 'beginner',
  },
  {
    id: '3',
    title: 'Push-Ups',
    description: 'Lower your body until chest nearly touches the floor. Push back up.',
    duration: 30, rest: 10, videoId: 'IODxDxX7oi4',
    thumbnail: `${IMG}/pushup.jpeg`,
    mediaUrl: `${BASE}/pushup_short.mov`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/pushup.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Chest / Triceps', difficulty: 'intermediate',
    repType: 'single', repCount: 20,
  },
  {
    id: '4',
    title: 'Abdominal Crunches',
    description: 'Lie on back, knees bent. Curl shoulders toward knees using abdominal muscles.',
    duration: 30, rest: 10, videoId: 'Xyd_fa5zoEU',
    thumbnail: `${IMG}/crunch.jpeg`,
    mediaUrl: `${BASE}/crunch_short.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/crunch.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Core', difficulty: 'beginner',
    repType: 'single', repCount: 10,
  },
  {
    id: '5',
    title: 'Step-Up onto Chair',
    description: 'Step up onto a sturdy chair, alternating feet. Maintain an upright posture.',
    duration: 30, rest: 10, videoId: 'msLem_LoXWo',
    thumbnail: `${IMG}/stepup.jpeg`,
    mediaUrl: `${BASE}/stepups_short.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/stepups.mp4`,
    workoutMediaType: 'video',
    muscleGroup: 'Legs / Glutes', difficulty: 'intermediate',
    repType: 'bilateral', repCount: 14,
  },
  {
    id: '6',
    title: 'Squats',
    description: 'Stand with feet shoulder-width apart. Lower as if sitting in a chair, then stand.',
    duration: 30, rest: 10, videoId: 'aclHkVaku9U',
    thumbnail: `${IMG}/squat.jpeg`,
    mediaUrl: `${BASE}/squat_short.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/squat.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Legs / Glutes', difficulty: 'beginner',
    repType: 'single', repCount: 10,
  },
  {
    id: '7',
    title: 'Triceps Dips',
    description: 'Using a chair, lower your body by bending elbows. Push back up.',
    duration: 30, rest: 10, videoId: 'jwUqHW0FmIE',
    thumbnail: `${IMG}/tricepsdips.jpeg`,
    mediaUrl: `${BASE}/tricepsdips_short.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/tricepsdips.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Triceps', difficulty: 'intermediate',
    repType: 'single', repCount: 22,
  },
  {
    id: '8',
    title: 'Plank',
    description: 'Hold a push-up position with arms straight. Keep body straight from head to heels.',
    duration: 30, rest: 10, videoId: 'B296mZDhrP4',
    thumbnail: `${IMG}/plank.jpeg`,
    mediaUrl: `${IMG}/plank.jpeg`,
    mediaType: 'image',
    muscleGroup: 'Core', difficulty: 'intermediate',
  },
  {
    id: '9',
    title: 'High Knees',
    description: 'Run in place, bringing knees up to waist height. Keep a fast, steady pace.',
    duration: 30, rest: 10, videoId: 'ZZZoCNMU48U',
    thumbnail: `${IMG}/highknee.jpeg`,
    mediaUrl: `${BASE}/highknee_short.mov`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/highknee.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Full Body', difficulty: 'intermediate',
    repType: 'bilateral', repCount: 60,
  },
  {
    id: '10',
    title: 'Lunges',
    description: 'Step forward with one leg, lowering hip until both knees are at 90 degrees.',
    duration: 30, rest: 10, videoId: 'QOVaHwm-Q6U',
    thumbnail: `${IMG}/lunge.jpeg`,
    mediaUrl: `${BASE}/lunge_short.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/lunge.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Legs / Glutes', difficulty: 'beginner',
    repType: 'bilateral', repCount: 10,
  },
  {
    id: '11',
    title: 'Push-Up and Rotation',
    description: 'Perform a push-up then rotate to a side plank, extending arm upward.',
    duration: 30, rest: 10, videoId: 'qHQ_E-f5278',
    thumbnail: `${IMG}/pushup.jpeg`,
    mediaUrl: `${BASE}/pushupandrotation_short.mp4`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/pushupandrotation.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Chest / Core', difficulty: 'advanced',
    repType: 'bilateral', repCount: 6,
  },
  {
    id: '12',
    title: 'Side Plank',
    description: 'Lie on your side and prop yourself on one forearm. Keep body straight.',
    duration: 30, rest: 0, videoId: 'K2x8Om13Yhg',
    thumbnail: `${IMG}/sideplank.jpeg`,
    mediaUrl: `${BASE}/sideplank_short.mov`,
    mediaType: 'video',
    workoutMediaUrl: `${BASE}/sideplank.mov`,
    workoutMediaType: 'video',
    muscleGroup: 'Core / Obliques', difficulty: 'intermediate',
    repType: 'timed', timedSplitSec: 15,
  },
];

const pick = (...ids: string[]): Exercise[] =>
  ids.map((id) => ALL.find((e) => e.id === id)!).filter(Boolean);

type Goal = UserPreference['goal'];
type Level = UserPreference['level'];

export const workoutsByGoalAndLevel: Record<Goal, Record<Level, Exercise[]>> = {
  weight_loss: {
    beginner:     pick('1','6','4','10','2','1','6','4'),
    intermediate: pick('1','9','5','6','10','4','8','12'),
    advanced:     pick('9','11','5','9','6','8','11','1','12','3'),
  },
  strength: {
    beginner:     pick('3','6','2','4','7','3','6','2'),
    intermediate: pick('3','6','2','7','10','8','11','12'),
    advanced:     pick('11','3','7','8','12','3','6','11','7','3'),
  },
  endurance: {
    beginner:     pick('1','6','4','9','1','10','6','4'),
    intermediate: pick('1','9','5','6','10','1','9','4','8','12'),
    advanced:     pick('9','1','5','9','1','9','8','11','12','9'),
  },
  flexibility: {
    beginner:     pick('2','4','6','8','10','4','2','6'),
    intermediate: pick('2','4','8','12','10','6','4','8','2'),
    advanced:     pick('8','12','11','2','4','8','12','2','8','12'),
  },
};

export const workoutsByGoal: Record<Goal, Exercise[]> = {
  weight_loss:  workoutsByGoalAndLevel.weight_loss.intermediate,
  strength:     workoutsByGoalAndLevel.strength.intermediate,
  endurance:    workoutsByGoalAndLevel.endurance.intermediate,
  flexibility:  workoutsByGoalAndLevel.flexibility.intermediate,
};

export const DEFAULT_WORKOUT = ALL;
export { ALL as ALL_EXERCISES };
