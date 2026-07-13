import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, Clock, Flame } from 'lucide-react-native';
import { WorkoutLog } from '@/types/workout';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { EXERCISES } from '@/constants/exercises';

interface HistoryItemProps {
  log: WorkoutLog;
}

const DATE_LOCALES: Record<string, string> = {
  en: 'en-US', ja: 'ja-JP', fr: 'fr-FR', es: 'es-ES', zh: 'zh-CN',
};

function useFormatDate() {
  const { t, language } = useTranslation();
  return (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) return t('history.today');
    if (days === 1) return t('history.yesterday');
    if (days < 7) return t('history.daysAgo', { n: days });
    return date.toLocaleDateString(DATE_LOCALES[language] ?? 'en-US', { month: 'short', day: 'numeric' });
  };
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function HistoryItem({ log }: HistoryItemProps) {
  const { colors } = useColorScheme();
  const { t, language } = useTranslation();
  const formatDate = useFormatDate();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: log.completed ? colors.primary + '30' : colors.border,
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: log.completed ? colors.primaryDim : `${colors.error}20` }]}>
        {log.completed ? (
          <CheckCircle size={22} color={colors.primary} strokeWidth={2} />
        ) : (
          <XCircle size={22} color={colors.error} strokeWidth={2} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.status, { color: colors.text }]}>
          {log.completed ? t('history.workoutComplete') : t('history.workoutIncomplete')}
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {formatDate(log.date)}
        </Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Clock size={12} color={colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {formatDuration(log.duration_seconds)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Flame size={12} color={colors.accent} strokeWidth={2} />
            <Text style={[styles.statText, { color: colors.textSecondary }]}>
              {log.exercises_completed}/{EXERCISES.length} {t('history.exercises')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.time, { color: colors.text }]}>
          {new Date(log.date).toLocaleTimeString(DATE_LOCALES[language] ?? 'en-US', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    gap: 14,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  status: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  date: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },
});
