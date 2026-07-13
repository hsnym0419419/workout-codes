import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RepType } from '@/types/exercise';
import { ColorScheme } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

interface RepCounterProps {
  repType: RepType;
  repCount: number;
  duration: number;
  timeRemaining: number;
  timedSplitSec?: number;
  colors: ColorScheme;
}

function calcDone(repCount: number, duration: number, timeRemaining: number): number {
  const elapsed = Math.max(0, duration - timeRemaining);
  const intervalSec = duration / repCount;
  return Math.min(Math.floor(elapsed / intervalSec), repCount);
}

export function RepCounter({ repType, repCount, duration, timeRemaining, timedSplitSec, colors }: RepCounterProps) {
  const { t } = useTranslation();
  if (repType === 'timed') {
    if (!timedSplitSec) return null;
    const elapsed = Math.max(0, duration - timeRemaining);
    const inSecondHalf = elapsed >= timedSplitSec;
    const rightSec = inSecondHalf ? timedSplitSec : Math.min(elapsed, timedSplitSec);
    const leftSec = inSecondHalf ? Math.min(elapsed - timedSplitSec, timedSplitSec) : 0;

    return (
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.side}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t('rep.right')}</Text>
          <Text style={[styles.count, { color: colors.text }]}>{Math.round(rightSec)}</Text>
          <Text style={[styles.slash, { color: colors.textSecondary }]}>/ {timedSplitSec}{t('rep.seconds')}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.side}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t('rep.left')}</Text>
          <Text style={[styles.count, { color: colors.text }]}>{Math.round(leftSec)}</Text>
          <Text style={[styles.slash, { color: colors.textSecondary }]}>/ {timedSplitSec}{t('rep.seconds')}</Text>
        </View>
      </View>
    );
  }

  const done = calcDone(repCount, duration, timeRemaining);

  if (repType === 'bilateral') {
    const rightTotal = Math.ceil(repCount / 2);
    const leftTotal = Math.floor(repCount / 2);
    const right = Math.min(Math.ceil(done / 2), rightTotal);
    const left = Math.min(Math.floor(done / 2), leftTotal);

    return (
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.side}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t('rep.right')}</Text>
          <Text style={[styles.count, { color: colors.text }]}>{right}</Text>
          <Text style={[styles.slash, { color: colors.textSecondary }]}>/ {rightTotal}{t('rep.reps')}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.side}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{t('rep.left')}</Text>
          <Text style={[styles.count, { color: colors.text }]}>{left}</Text>
          <Text style={[styles.slash, { color: colors.textSecondary }]}>/ {leftTotal}{t('rep.reps')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.single, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.count, { color: colors.text }]}>{done}</Text>
      <Text style={[styles.slash, { color: colors.textSecondary }]}>/ {repCount}{t('rep.reps')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 16,
  },
  divider: {
    width: 1,
    height: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  count: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  slash: {
    fontSize: 13,
    fontWeight: '400',
  },
  single: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
  },
});
