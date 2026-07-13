import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Flame, Clock } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { EXERCISES } from '@/constants/exercises';

interface WorkoutSummaryProps {
  totalElapsed: number;
  exercisesCompleted: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function WorkoutSummary({ totalElapsed, exercisesCompleted }: WorkoutSummaryProps) {
  const { colors, isDark } = useColorScheme();

  const stats = [
    { icon: Clock, label: 'Duration', value: formatTime(totalElapsed), color: colors.secondary },
    { icon: Flame, label: 'Exercises', value: `${exercisesCompleted}/${EXERCISES.length}`, color: colors.accent },
    { icon: Trophy, label: 'Calories', value: '~60 kcal', color: colors.warning },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? ['#00E5A015', '#00E5A005'] : ['#00C28015', '#00C28005']}
        style={[styles.card, { borderColor: colors.primary + '40' }]}
      >
        <View style={[styles.trophyWrap, { backgroundColor: colors.primaryDim }]}>
          <Trophy size={32} color={colors.primary} strokeWidth={2} />
        </View>
        <Text style={[styles.heading, { color: colors.text }]}>Workout Complete!</Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>
          Great job! You've finished your 7-minute workout.
        </Text>

        <View style={styles.statsRow}>
          {stats.map(({ icon: Icon, label, value, color }) => (
            <View key={label} style={[styles.statBox, { backgroundColor: colors.surface }]}>
              <Icon size={20} color={color} strokeWidth={2} />
              <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
    gap: 12,
  },
  trophyWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  sub: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    width: '100%',
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});
