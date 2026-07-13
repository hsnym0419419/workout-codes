import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, Zap, Dumbbell, RefreshCw } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { VideoPlayer } from '@/components/atoms/molecules/VideoPlayer';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { EXERCISES } from '@/constants/exercises';

const DIFFICULTY_VARIANT: Record<string, 'primary' | 'warning' | 'error'> = {
  beginner: 'primary',
  intermediate: 'warning',
  advanced: 'error',
};

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useColorScheme();
  const { t, tMuscle, tExerciseTitle, tExerciseDesc, tLevel } = useTranslation();

  const exercise = EXERCISES.find((e) => e.id === id);
  const exerciseIndex = EXERCISES.findIndex((e) => e.id === id);

  if (!exercise) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
        <Text style={[styles.error, { color: colors.error }]}>{t('exerciseDetail.notFound')}</Text>
      </SafeAreaView>
    );
  }

  const stats = [
    { icon: Clock, label: t('exerciseDetail.duration'), value: `${exercise.duration}${t('rep.seconds')}`, color: colors.secondary },
    { icon: RefreshCw, label: t('exerciseDetail.rest'), value: `${exercise.rest}${t('rep.seconds')}`, color: colors.rest },
    { icon: Dumbbell, label: t('exerciseDetail.muscle'), value: tMuscle(exercise.muscleGroup), color: colors.accent },
    { icon: Zap, label: t('exerciseDetail.exercise'), value: `#${exerciseIndex + 1}`, color: colors.primary },
  ];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.topTitle, { color: colors.textSecondary }]}>
            {t('exerciseDetail.exerciseOf', { index: exerciseIndex + 1, total: EXERCISES.length })}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.videoSection}>
          <VideoPlayer
            mediaUrl={exercise.mediaUrl}
            mediaType={exercise.mediaType}
            horizontalPadding={40}
          />
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                {tExerciseTitle(exercise.id, exercise.title)}
              </Text>
            </View>
            <Badge
              label={tLevel(exercise.difficulty)}
              variant={DIFFICULTY_VARIANT[exercise.difficulty]}
            />
          </View>

          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {tExerciseDesc(exercise.id, exercise.description)}
          </Text>

          <View style={styles.statsGrid}>
            {stats.map(({ icon: Icon, label, value, color }) => (
              <View
                key={label}
                style={[
                  styles.statBox,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <Icon size={18} color={color} strokeWidth={2} />
                <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.tipBox,
              { backgroundColor: colors.primaryDim, borderColor: colors.primary + '40' },
            ]}
          >
            <Text style={[styles.tipTitle, { color: colors.primary }]}>{t('exerciseDetail.proTip')}</Text>
            <Text style={[styles.tipText, { color: colors.text }]}>
              {t('exerciseDetail.proTipText')}
            </Text>
          </View>

          <Button
            label={t('exerciseDetail.startWorkout')}
            onPress={() => router.push('/workout/player')}
            variant="primary"
            size="lg"
            style={styles.startBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  videoSection: {
    paddingHorizontal: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  exerciseTitle: {
    fontSize: 26,
    fontFamily: 'Inter-Bold',
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  tipBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  tipTitle: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 21,
  },
  startBtn: {
    borderRadius: 18,
  },
  error: {
    padding: 24,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});
