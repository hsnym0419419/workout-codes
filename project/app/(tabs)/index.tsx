/*
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, Clock, Flame, ChevronRight } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePreferences } from '@/hooks/usePreferences';
import { useTranslation } from '@/hooks/useTranslation';
import { ExerciseCard } from '@/components/atoms/molecules/ExerciseCard';
import { workoutsByGoalAndLevel, DEFAULT_WORKOUT } from '@/constants/workouts';
import { AdBanner, AD_BANNER_HEIGHT } from '@/components/ads/AdBanner';

export default function HomeScreen() {
  const { colors, isDark } = useColorScheme();
  const router = useRouter();
  const { preferences } = usePreferences();
  const { t } = useTranslation();

  const exercises =
    workoutsByGoalAndLevel[preferences.goal]?.[preferences.level] ?? DEFAULT_WORKOUT;
  const totalSec   = exercises.reduce((a, e) => a + e.duration + e.rest, 0);
  const totalMins  = Math.round(totalSec / 60);
  const goalLabel  = t(`goal.${preferences.goal}` as const);
  const levelLabel = t(`level.${preferences.level}` as const);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: 40 + AD_BANNER_HEIGHT }]}
        showsVerticalScrollIndicator={false}
      >

        <LinearGradient
          colors={isDark ? ['#00E5A012', '#0D0D0D'] : ['#00C28014', '#F2F2F7']}
          style={styles.hero}
        >
          <View style={styles.badgeRow}>
            <View style={[styles.goalBadge, { backgroundColor: colors.primaryDim }]}>
              <Text style={[styles.goalBadgeText, { color: colors.primary }]}>
                {goalLabel.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.levelBadgeText, { color: colors.textSecondary }]}>
                {levelLabel.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={[styles.heroTitle, { color: colors.text }]}>
            {t('home.title')}
          </Text>
          <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
            {t('home.subtitle')}
          </Text>

          <View style={styles.statsRow}>
            {[
              { icon: Clock,  val: totalMins + ' ' + t('home.min'),          col: colors.secondary, bg: colors.secondary + '18' },
              { icon: Zap,    val: exercises.length + ' ' + t('home.moves'), col: colors.primary,   bg: colors.primaryDim },
              { icon: Flame,  val: '~60 kcal',                                col: colors.accent,    bg: colors.accent + '18' },
            ].map(({ icon: Icon, val, col, bg }) => (
              <View key={val} style={[styles.chip, { backgroundColor: bg }]}>
                <Icon size={14} color={col} strokeWidth={2} />
                <Text style={[styles.chipText, { color: colors.text }]}>{val}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/workout/player')}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>{t('home.start')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.changeGoalRow}
            onPress={() => router.push('/(tabs)/settings')}
            activeOpacity={0.7}
          >
            <Text style={[styles.changeGoalText, { color: colors.textSecondary }]}>{t('home.changeGoal')}</Text>
            <ChevronRight size={14} color={colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.todayExercises')}</Text>
          <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
            {goalLabel} · {levelLabel} · {t('home.tapPreview')}
          </Text>
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id + '-' + index}
              exercise={exercise}
              index={index}
              onPress={() => router.push('/exercise/' + exercise.id)}
            />
          ))}
        </View>

      </ScrollView>
      <AdBanner style={{ backgroundColor: colors.background }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {},
  hero: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32, gap: 12 },
  badgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  goalBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  goalBadgeText: { fontSize: 10, fontFamily: 'Inter-Bold', letterSpacing: 1.5 },
  levelBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  levelBadgeText: { fontSize: 10, fontFamily: 'Inter-Bold', letterSpacing: 1.5 },
  heroTitle: { fontSize: 40, fontFamily: 'Inter-Bold', lineHeight: 46 },
  heroSub: { fontSize: 14, fontFamily: 'Inter-Regular', lineHeight: 21 },
  statsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  chipText: { fontSize: 13, fontFamily: 'Inter-SemiBold' },
  startBtn: { borderRadius: 18, paddingVertical: 20, alignItems: 'center', marginTop: 4 },
  startBtnText: { fontSize: 17, fontFamily: 'Inter-SemiBold', color: '#000' },
  changeGoalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  changeGoalText: { fontSize: 13, fontFamily: 'Inter-Regular' },
  section: { paddingHorizontal: 24, paddingTop: 24, gap: 6 },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter-Bold' },
  sectionSub: { fontSize: 13, fontFamily: 'Inter-Regular', marginBottom: 8 },
});
*/

import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello</Text>
    </View>
  );
}