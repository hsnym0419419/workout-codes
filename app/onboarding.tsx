import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, {
  Circle as SvgCircle,
  Path as SvgPath,
  Line as SvgLine,
  Circle,
} from 'react-native-svg';
import { ChevronLeft, ChevronRight, Target, Activity, Play, Clock, Flame, Zap, Trophy, ChartBar as BarChart2, Globe, Check } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { usePreferences } from '@/hooks/usePreferences';
import { TranslationKey } from '@/constants/translations';
import { ColorScheme } from '@/constants/colors';

type MockId = 'welcome' | 'goal' | 'start' | 'progress' | 'language';

type Slide = {
  titleKey: TranslationKey;
  textKey: TranslationKey;
  mock: MockId;
};

const SLIDES: Slide[] = [
  { titleKey: 'onboarding.1.title', textKey: 'onboarding.1.text', mock: 'welcome' },
  { titleKey: 'onboarding.2.title', textKey: 'onboarding.2.text', mock: 'goal' },
  { titleKey: 'onboarding.3.title', textKey: 'onboarding.3.text', mock: 'start' },
  { titleKey: 'onboarding.4.title', textKey: 'onboarding.4.text', mock: 'progress' },
  { titleKey: 'onboarding.5.title', textKey: 'onboarding.5.text', mock: 'language' },
];

function PhoneFrame({
  colors,
  children,
}: {
  colors: ColorScheme;
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.phone,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}
    >
      {children}
    </View>
  );
}

function WelcomeMock({ colors, t }: { colors: ColorScheme; t: (k: TranslationKey) => string }) {
  return (
    <PhoneFrame colors={colors}>
      <View style={styles.phoneHeader}>
        <View style={[styles.pill, { backgroundColor: colors.primaryDim }]}>
          <Text style={[styles.pillText, { color: colors.primary }]}>
            {t('goal.weight_loss').toUpperCase()}
          </Text>
        </View>
        <View style={[styles.pill, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}>
          <Text style={[styles.pillText, { color: colors.textSecondary }]}>
            {t('level.beginner').toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={[styles.phoneTitle, { color: colors.text }]}>
        7-Minute{'\n'}Workout
      </Text>
      <View style={styles.statRow}>
        <View style={[styles.miniChip, { backgroundColor: colors.secondary + '20' }]}>
          <Clock size={10} color={colors.secondary} strokeWidth={2} />
          <Text style={[styles.miniChipText, { color: colors.text }]}>7 min</Text>
        </View>
        <View style={[styles.miniChip, { backgroundColor: colors.primaryDim }]}>
          <Zap size={10} color={colors.primary} strokeWidth={2} />
          <Text style={[styles.miniChipText, { color: colors.text }]}>12</Text>
        </View>
        <View style={[styles.miniChip, { backgroundColor: colors.accent + '20' }]}>
          <Flame size={10} color={colors.accent} strokeWidth={2} />
          <Text style={[styles.miniChipText, { color: colors.text }]}>~60</Text>
        </View>
      </View>
      <View style={[styles.startMock, { backgroundColor: colors.primary }]}>
        <Text style={styles.startMockText}>{t('home.start')}</Text>
      </View>
    </PhoneFrame>
  );
}

function GoalMock({ colors, t }: { colors: ColorScheme; t: (k: TranslationKey) => string }) {
  const goals: { key: TranslationKey; active: boolean }[] = [
    { key: 'goal.weight_loss', active: true },
    { key: 'goal.strength', active: false },
    { key: 'goal.endurance', active: false },
    { key: 'goal.flexibility', active: false },
  ];
  const levels: { key: TranslationKey; active: boolean }[] = [
    { key: 'level.beginner', active: true },
    { key: 'level.intermediate', active: false },
    { key: 'level.advanced', active: false },
  ];
  return (
    <PhoneFrame colors={colors}>
      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
        {t('settings.fitnessGoal').toUpperCase()}
      </Text>
      <View style={[styles.cardMock, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {goals.map((it, i) => (
          <View
            key={it.key}
            style={[
              styles.rowMock,
              i < goals.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <View style={[styles.rowIconMock, { backgroundColor: colors.primaryDim }]}>
              <Target size={10} color={colors.primary} strokeWidth={2} />
            </View>
            <Text style={[styles.rowLabelMock, { color: colors.text }]}>{t(it.key)}</Text>
            <View style={[styles.radioMock, { borderColor: it.active ? colors.primary : colors.border }]}>
              {it.active && <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />}
            </View>
          </View>
        ))}
      </View>
      <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: 10 }]}>
        {t('settings.fitnessLevel').toUpperCase()}
      </Text>
      <View style={[styles.cardMock, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {levels.map((it, i) => (
          <View
            key={it.key}
            style={[
              styles.rowMock,
              i < levels.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <View style={[styles.rowIconMock, { backgroundColor: colors.secondary + '20' }]}>
              <Activity size={10} color={colors.secondary} strokeWidth={2} />
            </View>
            <Text style={[styles.rowLabelMock, { color: colors.text }]}>{t(it.key)}</Text>
            <View style={[styles.radioMock, { borderColor: it.active ? colors.primary : colors.border }]}>
              {it.active && <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />}
            </View>
          </View>
        ))}
      </View>
    </PhoneFrame>
  );
}

function StartMock({ colors, t }: { colors: ColorScheme; t: (k: TranslationKey) => string }) {
  const size = 120;
  const strokeWidth = 7;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  const remainingRatio = 0.6;
  const dashOffset = C * (1 - remainingRatio);

  return (
    <PhoneFrame colors={colors}>
      <View style={styles.centerCol}>
        <View style={[styles.phasePill, { backgroundColor: colors.primaryDim }]}>
          <Text style={[styles.phasePillText, { color: colors.primary }]}>
            {t('player.exercise')}
          </Text>
        </View>
        <Text style={[styles.exerciseName, { color: colors.text }]}>
          {t('exercise.1.title')}
        </Text>
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size} height={size}>
            <SvgCircle cx={cx} cy={cy} r={r} stroke={colors.border} strokeWidth={strokeWidth} fill="none" />
            <SvgCircle
              cx={cx}
              cy={cy}
              r={r}
              stroke={colors.primary}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          </Svg>
          <View style={styles.circleInner}>
            <Text style={[styles.circleNum, { color: colors.text }]}>18</Text>
            <Text style={[styles.circleLbl, { color: colors.textSecondary }]}>
              {t('countdown.seconds')}
            </Text>
          </View>
        </View>
        <View style={[styles.playBtn, { backgroundColor: colors.primary }]}>
          <Play size={18} color="#000" fill="#000" strokeWidth={0} />
        </View>
      </View>
    </PhoneFrame>
  );
}

function ProgressMock({ colors, t }: { colors: ColorScheme; t: (k: TranslationKey) => string }) {
  const values = [40, 72, 55, 90, 30, 68, 85];
  const chartW = 200;
  const chartH = 70;
  const maxV = Math.max(...values);
  const minV = Math.min(...values);
  const range = maxV - minV || 1;
  const points = values.map((v, i) => ({
    x: (i / (values.length - 1)) * chartW,
    y: chartH - ((v - minV) / range) * chartH,
  }));
  const pathD = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  const fillD = pathD + ` L${points[points.length - 1].x},${chartH} L${points[0].x},${chartH} Z`;

  return (
    <PhoneFrame colors={colors}>
      <Text style={[styles.phoneSmallTitle, { color: colors.text }]}>{t('history.title')}</Text>
      <View style={styles.statsCardRow}>
        {[
          { icon: Trophy, val: '12', col: colors.primary },
          { icon: BarChart2, val: '14', col: colors.secondary },
          { icon: Flame, val: '98', col: colors.accent },
        ].map(({ icon: Icon, val, col }, i) => (
          <View
            key={i}
            style={[styles.statCardMock, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Icon size={14} color={col} strokeWidth={2} />
            <Text style={[styles.statCardVal, { color: colors.text }]}>{val}</Text>
          </View>
        ))}
      </View>
      <View
        style={[
          styles.chartCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.chartLabel, { color: colors.textSecondary }]}>
          {t('chart.title')}
        </Text>
        <Svg width={chartW} height={chartH + 6}>
          {[0.25, 0.5, 0.75].map((r, i) => (
            <SvgLine
              key={i}
              x1={0}
              x2={chartW}
              y1={chartH * r}
              y2={chartH * r}
              stroke={colors.border}
              strokeWidth={0.6}
              strokeDasharray="3,3"
            />
          ))}
          <SvgPath d={fillD} fill={colors.primary} fillOpacity={0.18} />
          <SvgPath d={pathD} stroke={colors.primary} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r={2.2} fill={colors.primary} />
          ))}
        </Svg>
      </View>
    </PhoneFrame>
  );
}

function LanguageMock({ colors, t }: { colors: ColorScheme; t: (k: TranslationKey) => string }) {
  const items = [
    { label: 'English', active: false },
    { label: '日本語', active: false },
    { label: 'Français', active: true },
    { label: 'Español', active: false },
    { label: '中文', active: false },
  ];
  return (
    <PhoneFrame colors={colors}>
      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
        {t('settings.language').toUpperCase()}
      </Text>
      <View style={[styles.cardMock, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {items.map((it, i) => (
          <View
            key={it.label}
            style={[
              styles.rowMock,
              i < items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <View style={[styles.rowIconMock, { backgroundColor: colors.accent + '20' }]}>
              <Globe size={12} color={colors.accent} strokeWidth={2} />
            </View>
            <Text style={[styles.rowLabelMock, { color: colors.text }]}>{it.label}</Text>
            {it.active ? (
              <View style={[styles.checkMock, { backgroundColor: colors.primary }]}>
                <Check size={11} color="#000" strokeWidth={3} />
              </View>
            ) : (
              <View style={[styles.radioMock, { borderColor: colors.border }]} />
            )}
          </View>
        ))}
      </View>
    </PhoneFrame>
  );
}

function Mock({ id, colors, t }: { id: MockId; colors: ColorScheme; t: (k: TranslationKey) => string }) {
  switch (id) {
    case 'welcome':  return <WelcomeMock  colors={colors} t={t} />;
    case 'goal':     return <GoalMock     colors={colors} t={t} />;
    case 'start':    return <StartMock    colors={colors} t={t} />;
    case 'progress': return <ProgressMock colors={colors} t={t} />;
    case 'language': return <LanguageMock colors={colors} t={t} />;
  }
}

export default function OnboardingScreen() {
  const router = useRouter();
  const { colors } = useColorScheme();
  const { t } = useTranslation();
  const { update } = usePreferences();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;

  const finish = async () => {
    await update({ hasSeenOnboarding: true });
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, i));
    scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
    setIndex(clamped);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <View style={{ width: 64 }} />
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === index ? colors.primary : colors.border,
                  width: i === index ? 18 : 6,
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={finish} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>
            {t('onboarding.skip')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide) => (
          <View key={slide.titleKey} style={[styles.slide, { width }]}>
            <View style={styles.mockWrap}>
              <Mock id={slide.mock} colors={colors} t={t} />
            </View>
            <View style={styles.textBlock}>
              <Text style={[styles.title, { color: colors.text }]}>{t(slide.titleKey)}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {t(slide.textKey)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => goTo(index - 1)}
          disabled={index === 0}
          style={[
            styles.navBtn,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: index === 0 ? 0.4 : 1,
            },
          ]}
          activeOpacity={0.7}
        >
          <ChevronLeft size={18} color={colors.text} strokeWidth={2} />
          <Text style={[styles.navBtnText, { color: colors.text }]}>{t('onboarding.back')}</Text>
        </TouchableOpacity>

        {isLast ? (
          <TouchableOpacity
            onPress={finish}
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>{t('onboarding.getStarted')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => goTo(index + 1)}
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>{t('onboarding.next')}</Text>
            <ChevronRight size={18} color="#000" strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  dots: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: { height: 6, borderRadius: 3 },
  skipBtn: { width: 64, alignItems: 'flex-end' },
  skipText: { fontSize: 14, fontFamily: 'Inter-SemiBold' },
  slide: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    alignItems: 'center',
  },
  mockWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  phone: {
    width: 250,
    aspectRatio: 0.55,
    borderRadius: 28,
    borderWidth: 2,
    padding: 14,
    overflow: 'hidden',
  },
  phoneHeader: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  pillText: { fontSize: 8, fontFamily: 'Inter-Bold', letterSpacing: 1 },
  phoneTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    lineHeight: 26,
    marginBottom: 14,
  },
  phoneSmallTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  statRow: { flexDirection: 'row', gap: 5, marginBottom: 18, flexWrap: 'wrap' },
  miniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  miniChipText: { fontSize: 10, fontFamily: 'Inter-SemiBold' },
  startMock: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startMockText: { fontSize: 12, fontFamily: 'Inter-SemiBold', color: '#000' },
  sectionLabel: {
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardMock: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  rowMock: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  rowIconMock: {
    width: 24,
    height: 24,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabelMock: { fontSize: 12, fontFamily: 'Inter-Regular', flex: 1 },
  radioMock: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 7, height: 7, borderRadius: 4 },
  checkMock: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCol: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  phasePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  phasePillText: { fontSize: 8, fontFamily: 'Inter-Bold', letterSpacing: 1.2 },
  exerciseName: { fontSize: 16, fontFamily: 'Inter-Bold', textAlign: 'center' },
  circleInner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleNum: { fontSize: 32, fontFamily: 'Inter-Bold', lineHeight: 36 },
  circleLbl: { fontSize: 10, fontFamily: 'Inter-Regular' },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCardRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  statCardMock: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 3,
  },
  statCardVal: { fontSize: 14, fontFamily: 'Inter-Bold' },
  chartCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    flex: 1,
  },
  chartLabel: { fontSize: 10, fontFamily: 'Inter-SemiBold' },
  textBlock: { gap: 10, paddingHorizontal: 4, paddingBottom: 8 },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 21,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  navBtnText: { fontSize: 14, fontFamily: 'Inter-SemiBold' },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 14,
    paddingVertical: 16,
  },
  primaryBtnText: { fontSize: 15, fontFamily: 'Inter-SemiBold', color: '#000' },
});
