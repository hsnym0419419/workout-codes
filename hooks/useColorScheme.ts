import { useColorScheme as useNativeColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';
import { usePreferences } from '@/hooks/usePreferences';

export function useColorScheme() {
  const scheme = useNativeColorScheme();
  const { preferences } = usePreferences();
  const resolved =
    preferences.theme && preferences.theme !== 'system'
      ? preferences.theme
      : scheme ?? 'dark';
  const isDark = resolved === 'dark';
  return {
    colorScheme: resolved,
    isDark,
    colors: isDark ? Colors.dark : Colors.light,
  };
}
