import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ progress, color, height = 4 }: ProgressBarProps) {
  const { colors } = useColorScheme();
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, width]);

  const animStyle = {
    width: width.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: colors.border, borderRadius: height / 2 },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          animStyle,
          {
            height,
            backgroundColor: color ?? colors.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: {},
});
