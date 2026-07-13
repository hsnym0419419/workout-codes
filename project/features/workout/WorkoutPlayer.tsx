import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  Trophy,
  Clock,
  Flame,
  Wind,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useWorkoutTimer } from './useWorkoutTimer';
import { useHistory } from '@/hooks/useHistory';
import { usePreferences } from '@/hooks/usePreferences';
import { cancelReminder, syncReminder } from '@/lib/notifications';
import { maybeShowWorkoutCompletionAd, preloadInterstitial } from '@/lib/ads/interstitial';
import { CountdownCircle } from '@/components/atoms/molecules/CountdownCircle';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { VideoPlayer } from '@/components/atoms/molecules/VideoPlayer';
import { VideoPlaceholder } from '@/components/VideoPlaceholder';
import { RepCounter } from '@/components/atoms/molecules/RepCounter';
import { Exercise } from '@/types/exercise';

interface WorkoutPlayerProps {
  exercises: Exercise[];
  onBack: () => void;
}

type Colors = ReturnType<typeof useColorScheme>['colors'];

function IdleView({
  exercises, onStart, onBack, colors,
}: {
  exercises: Exercise[];
  onStart: () => void;
  onBack: () => void;
  colors: Colors;
}) {
  const { t } = useTranslation();
  const totalSec = exercises.reduce((a, e) => a + e.duration + e.rest, 0);
  const mins = Math.round(totalSec / 60);
  const firstThumbnail = exercises[0]?.thumbnail;
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onBack}>
          <ArrowLeft size={20} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <View style={styles.idleBody}>
        {firstThumbnail ? (
          <View style={styles.idleThumbWrap}>
            <Image source={{ uri: firstThumbnail }} style={styles.idleThumb} resizeMode="cover" />
          </View>
        ) : (
          <View style={[styles.idleThumbWrap, { backgroundColor: colors.primaryDim, alignItems: 'center', justifyContent: 'center' }]}>
            <Play size={52} color={colors.primary} fill={colors.primary} strokeWidth={0} />
          </View>
        )}
        <Text style={[styles.idleTitle, { color: colors.text }]}>{t('player.readyToSweat')}</Text>
        <Text style={[styles.idleSub, { color: colors.textSecondary }]}>
          {t('player.exercisesMinutes', { count: exercises.length, mins })}{'\n'}{t('player.noEquipment')}
        </Text>
        <View style={styles.idleStats}>
          {[
            { label: t('player.exercises'), value: String(exercises.length) },
            { label: t('player.duration'),  value: mins + ' ' + t('home.min') },
            { label: t('player.calories'),  value: '~60' },
          ].map(({ label, value }) => (
            <View key={label} style={[styles.idleStat, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.idleStatVal, { color: colors.text }]}>{value}</Text>
              <Text style={[styles.idleStatLbl, { color: colors.textSecondary }]}>{label}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[styles.bigBtn, { backgroundColor: colors.primary }]} onPress={onStart} activeOpacity={0.85}>
          <Text style={styles.bigBtnText}>{t('player.startWorkout')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CompletedView({
  totalElapsed, count, onReset, onBack, colors,
}: {
  totalElapsed: number;
  count: number;
  onReset: () => void;
  onBack: () => void;
  colors: Colors;
}) {
  const { t } = useTranslation();
  const m = Math.floor(totalElapsed / 60);
  const s = totalElapsed % 60;
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onBack}>
          <ArrowLeft size={20} color={colors.text} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.doneScroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.trophyWrap, { backgroundColor: colors.primaryDim }]}>
          <Trophy size={40} color={colors.primary} strokeWidth={2} />
        </View>
        <Text style={[styles.doneTitle, { color: colors.text }]}>{t('player.workoutComplete')}</Text>
        <Text style={[styles.doneSub, { color: colors.textSecondary }]}>
          {t('player.greatJob')}
        </Text>
        <View style={styles.doneStats}>
          {[
            { icon: Clock, val: m + ':' + String(s).padStart(2, '0'), lbl: t('player.duration'), col: colors.secondary },
            { icon: Flame, val: String(count), lbl: t('player.exercises'), col: colors.accent },
            { icon: Wind,  val: '~60',         lbl: t('player.calories'),  col: colors.warning },
          ].map(({ icon: Icon, val, lbl, col }) => (
            <View key={lbl} style={[styles.doneStat, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Icon size={20} color={col} strokeWidth={2} />
              <Text style={[styles.doneStatVal, { color: colors.text }]}>{val}</Text>
              <Text style={[styles.doneStatLbl, { color: colors.textSecondary }]}>{lbl}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[styles.bigBtn, { backgroundColor: colors.primary }]} onPress={onReset} activeOpacity={0.85}>
          <Text style={styles.bigBtnText}>{t('player.doItAgain')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outlineBtn, { borderColor: colors.border }]} onPress={onBack} activeOpacity={0.7}>
          <Text style={[styles.outlineBtnText, { color: colors.textSecondary }]}>{t('player.backToHome')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActiveView({
  timer, onBack, colors, isDark,
}: {
  timer: ReturnType<typeof useWorkoutTimer>;
  onBack: () => void;
  colors: Colors;
  isDark: boolean;
}) {
  const { t, tMuscle, tExerciseTitle } = useTranslation();
  const isRest = timer.phase === 'rest';

  const bgColor = isRest
    ? (isDark ? '#051825' : '#E8F4FD')
    : (isDark ? '#0D0D0D' : '#F2F2F7');

  const totalForPhase = isRest
    ? (timer.currentExercise?.rest ?? 10)
    : (timer.currentExercise?.duration ?? 30);

  return (
    <View style={[styles.safe, { backgroundColor: bgColor }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onBack}>
            <ArrowLeft size={20} color={colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.topCenter}>
            <Text style={[styles.topCounter, { color: colors.textSecondary }]}>
              {isRest ? t('player.rest') : (timer.currentIndex + 1) + ' / ' + timer.totalExercises}
            </Text>
          </View>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={timer.reset}>
            <RotateCcw size={18} color={colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressWrap}>
          <ProgressBar progress={timer.overallProgress} color={isRest ? colors.rest : colors.primary} height={3} />
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: isRest ? colors.rest + '50' : colors.border }]}>
          <View style={[styles.phaseTag, { backgroundColor: isRest ? colors.restDim : colors.primaryDim }]}>
            <Text style={[styles.phaseTagText, { color: isRest ? colors.rest : colors.primary }]}>
              {isRest ? t('player.rest') : t('player.exercise')}
            </Text>
          </View>
          {isRest && timer.nextExercise ? (
            <Text style={[styles.exTitle, { color: colors.text }]} numberOfLines={1}>
              <Text style={[styles.nextLabelPre, { color: colors.textSecondary }]}>{t('player.next')}</Text>
              {tExerciseTitle(timer.nextExercise.id, timer.nextExercise.title)}
            </Text>
          ) : (
            <>
              <Text style={[styles.exTitle, { color: colors.text }]} numberOfLines={1}>
                {isRest
                  ? t('player.almostDone')
                  : (timer.currentExercise
                      ? tExerciseTitle(timer.currentExercise.id, timer.currentExercise.title)
                      : '')}
              </Text>
              {!isRest && timer.currentExercise && (
                <Text style={[styles.exMuscle, { color: colors.textSecondary }]}>
                  {tMuscle(timer.currentExercise.muscleGroup)}
                </Text>
              )}
            </>
          )}
        </View>

        <View style={styles.videoArea}>
          {isRest ? (
            timer.nextExercise?.thumbnail ? (
              <Image
                source={{ uri: timer.nextExercise.thumbnail }}
                style={styles.restThumb}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.restVisual, { backgroundColor: colors.restDim }]}>
                <Wind size={28} color={colors.rest} strokeWidth={1.5} />
                <Text style={[styles.restText, { color: colors.rest }]}>{t('player.breatheRecover')}</Text>
              </View>
            )
          ) : (() => {
            const mediaUrl = timer.currentExercise?.workoutMediaUrl ?? timer.currentExercise?.mediaUrl;
            const mediaType = timer.currentExercise?.workoutMediaType ?? timer.currentExercise?.mediaType;
            return mediaUrl && mediaType ? (
              <VideoPlayer
                key={timer.currentIndex}
                mediaUrl={mediaUrl}
                mediaType={mediaType}
                horizontalPadding={48}
                aspectRatio={4 / 3}
                isWorkoutPaused={timer.isPaused}
              />
            ) : (
              <VideoPlaceholder height={170} label={timer.currentExercise ? tExerciseTitle(timer.currentExercise.id, timer.currentExercise.title) : undefined} />
            );
          })()}
        </View>

        {!isRest && timer.currentExercise?.repType != null &&
          (timer.currentExercise.repType !== 'timed'
            ? timer.currentExercise.repCount != null
            : timer.currentExercise.timedSplitSec != null) ? (
          <View style={styles.repCounterWrap}>
            <RepCounter
              repType={timer.currentExercise.repType}
              repCount={timer.currentExercise.repCount ?? 0}
              duration={timer.currentExercise.duration}
              timeRemaining={timer.timeRemaining}
              timedSplitSec={timer.currentExercise.timedSplitSec}
              colors={colors}
            />
          </View>
        ) : null}

        <View style={styles.timerWrap}>
          <CountdownCircle
            seconds={timer.timeRemaining}
            total={totalForPhase}
            phase={isRest ? 'rest' : 'exercise'}
            size={170}
          />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.skipBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={timer.skip}
            activeOpacity={0.7}
          >
            <SkipForward size={18} color={colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.skipLabel, { color: colors.textSecondary }]}>{t('player.skip')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pauseBtn,
              {
                backgroundColor: timer.isPaused ? colors.primary : colors.surface,
                borderColor: timer.isPaused ? colors.primary : colors.border,
              },
            ]}
            onPress={timer.isPaused ? timer.resume : timer.pause}
            activeOpacity={0.85}
          >
            {timer.isPaused
              ? <Play size={26} color="#000" fill="#000" strokeWidth={0} />
              : <Pause size={26} color={colors.text} strokeWidth={2} />
            }
          </TouchableOpacity>

          <View style={styles.skipPlaceholder} />
        </View>

        <View style={styles.dotsRow}>
          {Array.from({ length: timer.totalExercises }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i < timer.currentIndex
                      ? colors.primary
                      : i === timer.currentIndex
                        ? (isRest ? colors.rest : colors.primary + '80')
                        : colors.border,
                  width: i === timer.currentIndex ? 14 : 6,
                },
              ]}
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

export function WorkoutPlayer({ exercises, onBack }: WorkoutPlayerProps) {
  const { colors, isDark } = useColorScheme();
  const timer = useWorkoutTimer(exercises);
  const { saveLog } = useHistory();
  const { preferences } = usePreferences();
  const { t } = useTranslation();
  const savedRef = useRef(false);

  useEffect(() => {
    preloadInterstitial();
  }, []);

  useEffect(() => {
    if (timer.phase === 'completed' && !savedRef.current) {
      savedRef.current = true;
      saveLog({
        date: new Date().toISOString(),
        completed: true,
        duration_seconds: timer.totalElapsed,
        exercises_completed: timer.totalExercises,
      });
      if (preferences.notificationsEnabled) {
        cancelReminder().then(() =>
          syncReminder(true, t('notif.reminder.title'), t('notif.reminder.body'))
        );
      }
      maybeShowWorkoutCompletionAd();
    }
  }, [timer.phase, timer.totalElapsed, timer.totalExercises, saveLog, preferences.notificationsEnabled, t]);

  if (timer.phase === 'idle') {
    return <IdleView exercises={exercises} onStart={timer.start} onBack={onBack} colors={colors} />;
  }

  if (timer.phase === 'completed') {
    return (
      <CompletedView
        totalElapsed={timer.totalElapsed}
        count={timer.totalExercises}
        onReset={() => { savedRef.current = false; timer.reset(); }}
        onBack={onBack}
        colors={colors}
      />
    );
  }

  return <ActiveView timer={timer} onBack={onBack} colors={colors} isDark={isDark} />;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  topCenter: { flex: 1, alignItems: 'center' },
  topCounter: { fontSize: 13, fontFamily: 'Inter-SemiBold', letterSpacing: 1 },
  iconBtn: { width: 42, height: 42, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  progressWrap: { paddingHorizontal: 20, marginBottom: 10 },
  infoCard: { marginHorizontal: 20, borderRadius: 16, borderWidth: 1, padding: 14, alignItems: 'center', gap: 4, marginBottom: 10 },
  phaseTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 7, marginBottom: 2 },
  phaseTagText: { fontSize: 10, fontFamily: 'Inter-Bold', letterSpacing: 1.5 },
  exTitle: { fontSize: 20, fontFamily: 'Inter-Bold', textAlign: 'center' },
  exMuscle: { fontSize: 12, fontFamily: 'Inter-Regular' },
  nextLabelPre: { fontSize: 20, fontFamily: 'Inter-Regular' },
  restThumb: { width: '100%', aspectRatio: 4 / 3, borderRadius: 16 },
  videoArea: { marginHorizontal: 20, marginBottom: 10 },
  restVisual: { height: 90, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 8 },
  restText: { fontSize: 14, fontFamily: 'Inter-SemiBold' },
  repCounterWrap: { alignItems: 'center', marginBottom: 6 },
  timerWrap: { alignItems: 'center', marginBottom: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, paddingHorizontal: 20, marginBottom: 8 },
  pauseBtn: { width: 68, height: 68, borderRadius: 34, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  skipBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, borderWidth: 1, width: 82, justifyContent: 'center' },
  skipPlaceholder: { width: 82 },
  skipLabel: { fontSize: 13, fontFamily: 'Inter-SemiBold' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, paddingBottom: 8, flexWrap: 'wrap', paddingHorizontal: 20 },
  dot: { height: 6, borderRadius: 3 },
  idleBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, gap: 16 },
  idleThumbWrap: { width: 160, height: 120, borderRadius: 18, overflow: 'hidden' },
  idleThumb: { width: '100%', height: '100%' },
  idleTitle: { fontSize: 28, fontFamily: 'Inter-Bold', textAlign: 'center' },
  idleSub: { fontSize: 14, fontFamily: 'Inter-Regular', textAlign: 'center', lineHeight: 22 },
  idleStats: { flexDirection: 'row', gap: 10, width: '100%' },
  idleStat: { flex: 1, borderRadius: 14, borderWidth: 1, paddingVertical: 14, alignItems: 'center', gap: 4 },
  idleStatVal: { fontSize: 16, fontFamily: 'Inter-Bold' },
  idleStatLbl: { fontSize: 11, fontFamily: 'Inter-Regular' },
  bigBtn: { width: '100%', borderRadius: 18, paddingVertical: 20, alignItems: 'center', marginTop: 8 },
  bigBtnText: { fontSize: 17, fontFamily: 'Inter-SemiBold', color: '#000' },
  outlineBtn: { width: '100%', borderRadius: 18, paddingVertical: 18, alignItems: 'center', borderWidth: 1 },
  outlineBtnText: { fontSize: 15, fontFamily: 'Inter-Regular' },
  doneScroll: { paddingHorizontal: 24, paddingBottom: 40, alignItems: 'center', gap: 16 },
  trophyWrap: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  doneTitle: { fontSize: 26, fontFamily: 'Inter-Bold', textAlign: 'center' },
  doneSub: { fontSize: 14, fontFamily: 'Inter-Regular', textAlign: 'center', lineHeight: 22 },
  doneStats: { flexDirection: 'row', gap: 10, width: '100%' },
  doneStat: { flex: 1, borderRadius: 16, borderWidth: 1, paddingVertical: 16, alignItems: 'center', gap: 6 },
  doneStatVal: { fontSize: 17, fontFamily: 'Inter-Bold' },
  doneStatLbl: { fontSize: 11, fontFamily: 'Inter-Regular', textAlign: 'center' },
});
