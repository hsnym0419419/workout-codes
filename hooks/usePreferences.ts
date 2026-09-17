import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreference } from '@/types/user';

const STORAGE_KEY = 'user_preferences';

const DEFAULT: UserPreference = {
  goal: 'weight_loss',
  level: 'beginner',
  soundEnabled: true,
  vibrationEnabled: true,
  language: 'en',
  hasSeenOnboarding: false,
  notificationsEnabled: false,
  hasAskedNotifications: false,
};

let cache: UserPreference | null = null;
let diskLoaded = false;
const listeners = new Set<(prefs: UserPreference) => void>();

function notify(prefs: UserPreference) {
  cache = prefs;
  listeners.forEach((fn) => fn(prefs));
}

async function load(): Promise<UserPreference> {
  if (cache !== null && diskLoaded) return cache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = { ...DEFAULT, ...JSON.parse(raw) };
      cache = parsed;
      diskLoaded = true;
      return parsed;
    }
  } catch {}
  cache = DEFAULT;
  diskLoaded = true;
  return DEFAULT;
}

async function persist(prefs: UserPreference) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreference>(cache ?? DEFAULT);
  const [loaded, setLoaded] = useState(diskLoaded);

  useEffect(() => {
    listeners.add(setPreferences);
    if (!diskLoaded) {
      load().then((prefs) => {
        notify(prefs);
        setLoaded(true);
      });
    } else if (!loaded) {
      setLoaded(true);
    }
    return () => {
      listeners.delete(setPreferences);
    };
  }, []);

  const update = useCallback(async (partial: Partial<UserPreference>) => {
    const current = cache ?? DEFAULT;
    const updated = { ...current, ...partial };
    notify(updated);
    await persist(updated);
  }, []);

  return { preferences, update, loaded };
}
