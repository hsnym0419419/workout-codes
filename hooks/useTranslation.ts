import { useCallback } from 'react';
import { usePreferences } from '@/hooks/usePreferences';
import { TRANSLATIONS, TranslationKey } from '@/constants/translations';

const MUSCLE_KEY_MAP: Record<string, TranslationKey> = {
  'Full Body': 'muscle.fullBody',
  'Legs': 'muscle.legs',
  'Chest / Triceps': 'muscle.chestTriceps',
  'Core': 'muscle.core',
  'Legs / Glutes': 'muscle.legsGlutes',
  'Triceps': 'muscle.triceps',
  'Chest / Core': 'muscle.chestCore',
  'Core / Obliques': 'muscle.coreObliques',
};

export function useTranslation() {
  const { preferences } = usePreferences();
  const lang = preferences.language;
  const dict = TRANSLATIONS[lang] ?? TRANSLATIONS.en;

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      let str = dict[key] ?? TRANSLATIONS.en[key] ?? key;
      if (vars) {
        for (const k of Object.keys(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]));
        }
      }
      return str;
    },
    [dict]
  );

  const tMuscle = useCallback(
    (group: string) => {
      const key = MUSCLE_KEY_MAP[group];
      return key ? t(key) : group;
    },
    [t]
  );

  const tExerciseTitle = useCallback(
    (id: string, fallback: string) => {
      const key = `exercise.${id}.title` as TranslationKey;
      return dict[key] ? t(key) : fallback;
    },
    [t, dict]
  );

  const tExerciseDesc = useCallback(
    (id: string, fallback: string) => {
      const key = `exercise.${id}.desc` as TranslationKey;
      return dict[key] ? t(key) : fallback;
    },
    [t, dict]
  );

  const tLevel = useCallback(
    (level: string) => {
      const key = `level.${level}` as TranslationKey;
      return dict[key] ? t(key) : level;
    },
    [t, dict]
  );

  return { t, tMuscle, tExerciseTitle, tExerciseDesc, tLevel, language: lang };
}
