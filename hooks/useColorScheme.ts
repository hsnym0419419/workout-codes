import { useColorScheme as useNativeColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';

export function useColorScheme() {
  const scheme = useNativeColorScheme();
  const isDark = scheme === 'dark';
  return {
    colorScheme: scheme ?? 'dark',
    isDark,
    colors: isDark ? Colors.dark : Colors.light,
  };
}
