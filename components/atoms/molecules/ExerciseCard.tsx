import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Clock, ChevronRight, Zap } from 'lucide-react-native';
import { Exercise } from '@/types/exercise';
import { Badge } from '@/components/atoms/Badge';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onPress: () => void;
}

const DIFFICULTY_VARIANT: Record<
  Exercise['difficulty'],
  'primary' | 'warning' | 'error'
> = {
  beginner: 'primary',
  intermediate: 'warning',
  advanced: 'error',
};

export function ExerciseCard({ exercise, index, onPress }: ExerciseCardProps) {
  const { colors } = useColorScheme();
  const { t, tMuscle, tExerciseTitle, tLevel } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.indexBadge, { backgroundColor: colors.primaryDim }]}>
        <Text style={[styles.indexText, { color: colors.primary }]}>
          {String(index + 1).padStart(2, '0')}
        </Text>
      </View>

      {Platform.OS === 'web' ? (
        // @ts-ignore – web-only element
        <div
          style={{
            width: 64,
            height: 48,
            borderRadius: 10,
            backgroundImage: `url(${exercise.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#222',
            flexShrink: 0,
          }}
        />
      ) : (
        <Image
          source={{ uri: exercise.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {tExerciseTitle(exercise.id, exercise.title)}
        </Text>
        <Text style={[styles.muscle, { color: colors.textSecondary }]}>
          {tMuscle(exercise.muscleGroup)}
        </Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Clock size={12} color={colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {exercise.duration}{t('rep.seconds')}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Zap size={12} color={colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {exercise.rest}{t('rep.seconds')} {t('exerciseDetail.rest').toLowerCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.right}>
        <Badge
          label={tLevel(exercise.difficulty)}
          variant={DIFFICULTY_VARIANT[exercise.difficulty]}
        />
        <ChevronRight size={18} color={colors.textTertiary} strokeWidth={2} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  indexBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
  },
  thumbnail: {
    width: 64,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#222',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  muscle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  meta: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
});
