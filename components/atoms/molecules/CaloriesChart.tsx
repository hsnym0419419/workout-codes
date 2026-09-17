import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { WorkoutLog } from '@/types/workout';

interface CaloriesChartProps {
  logs: WorkoutLog[];
}

function estimateCalories(log: WorkoutLog): number {
  return Math.round(log.exercises_completed * 6);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return (d.getMonth() + 1) + '/' + d.getDate();
}

function groupByDate(logs: WorkoutLog[]): { date: string; calories: number }[] {
  const map = new Map<string, number>();
  for (const log of logs) {
    const key = log.date.slice(0, 10);
    map.set(key, (map.get(key) ?? 0) + estimateCalories(log));
  }
  return Array.from(map.entries())
    .map(([date, calories]) => ({ date, calories }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function CaloriesChart({ logs }: CaloriesChartProps) {
  const { colors } = useColorScheme();
  const { t } = useTranslation();

  const daily = groupByDate(
    [...logs].filter((l) => l.completed)
  ).slice(-10);

  if (daily.length < 2) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          {t('chart.empty')}
        </Text>
      </View>
    );
  }

  const W = 320;
  const H = 160;
  const PAD_LEFT = 36;
  const PAD_RIGHT = 12;
  const PAD_TOP = 12;
  const PAD_BOTTOM = 38;
  const chartW = W - PAD_LEFT - PAD_RIGHT;
  const chartH = H - PAD_TOP - PAD_BOTTOM;

  const calories = daily.map((d) => d.calories);
  const maxCal = Math.max(...calories, 60);
  const minCal = Math.min(...calories, 0);
  const range = maxCal - minCal || 1;

  const points = daily.map((_, i) => ({
    x: PAD_LEFT + (i / (daily.length - 1)) * chartW,
    y: PAD_TOP + chartH - ((calories[i] - minCal) / range) * chartH,
  }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(' ');

  const fillD =
    pathD +
    ` L${points[points.length - 1].x},${PAD_TOP + chartH} L${points[0].x},${PAD_TOP + chartH} Z`;

  const yLabels = [minCal, Math.round((minCal + maxCal) / 2), maxCal];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('chart.title')}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('chart.lastDays', { n: daily.length })}</Text>
      <Svg width={W} height={H} style={styles.svg}>
        <Defs>
          <LinearGradient id="calGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors.primary} stopOpacity={0.35} />
            <Stop offset="100%" stopColor={colors.primary} stopOpacity={0.03} />
          </LinearGradient>
        </Defs>

        {yLabels.map((val, i) => {
          const y = PAD_TOP + chartH - ((val - minCal) / range) * chartH;
          return (
            <React.Fragment key={i}>
              <Line
                x1={PAD_LEFT}
                y1={y}
                x2={W - PAD_RIGHT}
                y2={y}
                stroke={colors.border}
                strokeWidth={0.8}
                strokeDasharray="3,3"
              />
              <SvgText
                x={PAD_LEFT - 4}
                y={y + 4}
                fontSize={9}
                fill={colors.textTertiary ?? colors.textSecondary}
                textAnchor="end"
              >
                {val}
              </SvgText>
            </React.Fragment>
          );
        })}

        <Path d={fillD} fill="url(#calGradient)" />
        <Path d={pathD} stroke={colors.primary} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3.5} fill={colors.primary} />
        ))}

        {daily.map((entry, i) => (
          <React.Fragment key={i}>
            <SvgText
              x={points[i].x}
              y={H - 14}
              fontSize={8.5}
              fill={colors.textSecondary}
              textAnchor="middle"
            >
              {formatDate(entry.date)}
            </SvgText>
            <SvgText
              x={points[i].x}
              y={H - 4}
              fontSize={8}
              fill={colors.textTertiary ?? colors.textSecondary}
              textAnchor="middle"
            >
              {entry.calories}kcal
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  svg: {
    marginTop: 4,
  },
  empty: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
