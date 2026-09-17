import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';

interface CountdownCircleProps {
  seconds: number;
  total: number;
  phase: 'exercise' | 'rest';
  size?: number;
}

export function CountdownCircle({
  seconds,
  total,
  phase,
  size = 200,
}: CountdownCircleProps) {
  const { colors } = useColorScheme();
  const { t } = useTranslation();
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useRef(new Animated.Value(total > 0 ? seconds / total : 0)).current;

  const activeColor = phase === 'exercise' ? colors.primary : colors.rest;

  useEffect(() => {
    const ratio = total > 0 ? seconds / total : 0;
    Animated.timing(progress, {
      toValue: ratio,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [seconds, total, progress]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={8}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={8}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.inner}>
        <Text style={[styles.seconds, { color: colors.text }]}>{seconds}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {phase === 'exercise' ? t('countdown.seconds') : t('countdown.rest')}
        </Text>
      </View>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seconds: {
    fontSize: 56,
    fontFamily: 'Inter-Bold',
    lineHeight: 60,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
});
