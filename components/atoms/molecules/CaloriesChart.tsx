import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, {
  Path,
  Circle,
  Line as SvgLine,
  Rect as SvgRect,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { WorkoutLog } from '@/types/workout';

interface CaloriesChartProps {
  logs: WorkoutLog[];
}

const HEIGHT = 180;
const PAD_LEFT = 38;
const PAD_RIGHT = 14;
const PAD_TOP = 14;
const PAD_BOTTOM = 48;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;
const VISIBLE_COUNT = 7;
const SLOT_WIDTH = 48;

function estimateCalories(log: WorkoutLog): number {
  return Math.round(log.exercises_completed * 6);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.getMonth() + 1 + '/' + d.getDate();
}

function niceCeiling(value: number): number {
  if (value <= 0) return 50;
  const step = value <= 100 ? 20 : 50;
  return Math.max(step, Math.ceil(value / step) * step);
}

export function CaloriesChart({ logs }: CaloriesChartProps) {
  const { colors } = useColorScheme();
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollView>(null);

  const entries = [...logs]
    .filter((l) => l.completed)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.created_at ?? '').localeCompare(b.created_at ?? ''))
    .map((log) => ({ id: log.id, raw: log.date, date: formatDate(log.date), calories: estimateCalories(log) }));

  useEffect(() => {
    if (entries.length > VISIBLE_COUNT) {
      const id = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 0);
      return () => clearTimeout(id);
    }
  }, [entries.length, entries[entries.length - 1]?.id]);

  if (entries.length < 2) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          {t('chart.empty')}
        </Text>
      </View>
    );
  }

  const scrollable = entries.length > VISIBLE_COUNT;
  const W = 320;
  const chartW = W - PAD_LEFT - PAD_RIGHT;
  const slot = scrollable ? SLOT_WIDTH : chartW / entries.length;
  const contentW = scrollable ? PAD_LEFT + entries.length * slot + PAD_RIGHT : W;

  const maxCal = niceCeiling(Math.max(...entries.map((e) => e.calories)));
  const yFor = (v: number) => PAD_TOP + PLOT_H - (v / maxCal) * (PLOT_H - 10);
  const xFor = (i: number) => PAD_LEFT + slot * i + slot / 2;
  const barW = Math.min(22, slot * 0.52);
  const baseline = PAD_TOP + PLOT_H;

  const points = entries.map((e, i) => ({ x: xFor(i), y: yFor(e.calories) }));
  const lineD = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(' ');
  const fillD =
    lineD + ` L${points[points.length - 1].x},${baseline} L${points[0].x},${baseline} Z`;

  const yLabels = [0, Math.round(maxCal / 2), maxCal];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('chart.title')}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t('chart.workouts', { n: entries.length })}
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        scrollEnabled={scrollable}
        showsHorizontalScrollIndicator={scrollable}
        onContentSizeChange={() => {
          if (scrollable) scrollRef.current?.scrollToEnd({ animated: false });
        }}
        contentContainerStyle={{ width: contentW }}
        style={{ width: W }}
      >
        <Svg width={contentW} height={HEIGHT}>
          <Defs>
            <LinearGradient id="calGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={colors.secondary} stopOpacity={0.22} />
              <Stop offset="100%" stopColor={colors.secondary} stopOpacity={0.02} />
            </LinearGradient>
          </Defs>

          {yLabels.map((val, i) => {
            const y = yFor(val);
            return (
              <React.Fragment key={i}>
                <SvgLine
                  x1={PAD_LEFT}
                  y1={y}
                  x2={contentW - PAD_RIGHT}
                  y2={y}
                  stroke={colors.border}
                  strokeWidth={0.8}
                  strokeDasharray="3,3"
                />
                <SvgText
                  x={PAD_LEFT - 6}
                  y={y + 3}
                  fontSize={9}
                  fill={colors.textTertiary ?? colors.textSecondary}
                  textAnchor="end"
                >
                  {val}
                </SvgText>
              </React.Fragment>
            );
          })}

          {entries.map((e, i) => {
            const topY = yFor(e.calories);
            const x = xFor(i);
            return (
              <SvgRect
                key={e.id + '-bar'}
                x={x - barW / 2}
                y={topY}
                width={barW}
                height={baseline - topY}
                rx={5}
                fill={colors.primary}
                opacity={0.85}
              />
            );
          })}

          <Path d={fillD} fill="url(#calGradient)" />
          <Path
            d={lineD}
            stroke={colors.secondary}
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p, i) => (
            <Circle
              key={entries[i].id + '-dot'}
              cx={p.x}
              cy={p.y}
              r={3.6}
              fill={colors.surface}
              stroke={colors.secondary}
              strokeWidth={2.4}
            />
          ))}

          {entries.map((e, i) => (
            <React.Fragment key={e.id + '-labels'}>
              <SvgText
                x={points[i].x}
                y={HEIGHT - 18}
                fontSize={8.5}
                fill={colors.textSecondary}
                textAnchor="middle"
              >
                {e.date}
              </SvgText>
              <SvgText
                x={points[i].x}
                y={HEIGHT - 6}
                fontSize={8}
                fill={colors.textTertiary ?? colors.textSecondary}
                textAnchor="middle"
              >
                {e.calories}
              </SvgText>
            </React.Fragment>
          ))}
        </Svg>
      </ScrollView>
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
