import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface VideoPlaceholderProps {
  height?: number;
  label?: string;
}

export function VideoPlaceholder({ height = 180, label }: VideoPlaceholderProps) {
  const { colors } = useColorScheme();
  return (
    <View style={[styles.container, { height, backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primaryDim }]}>
        <Video size={26} color={colors.primary} strokeWidth={1.5} />
      </View>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        {label ? label + ' Preview' : 'Exercise Preview'}
      </Text>
      <Text style={[styles.sub, { color: colors.textTertiary }]}>Video coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrap: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  title: { fontSize: 14, fontFamily: 'Inter-SemiBold' },
  sub: { fontSize: 12, fontFamily: 'Inter-Regular' },
});
