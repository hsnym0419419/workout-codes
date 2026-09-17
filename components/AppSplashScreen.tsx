import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Animated } from 'react-native';

interface Props {
  onFinished: () => void;
  prefsReady: boolean;
}

const LOGO_URI = 'https://hsnym0419419.github.io/workout-videos/splahScreenLogo.png';
const FADE_IN_MS = 600;
const HOLD_MS = 1500;
const FADE_OUT_MS = 500;

export function AppSplashScreen({ onFinished, prefsReady }: Props) {
  const { width } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: FADE_IN_MS,
        useNativeDriver: true,
      }),
      Animated.delay(HOLD_MS),
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_OUT_MS,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimDone(true);
    });
  }, []);

  // Fire onFinished only when both animation is done AND preferences are loaded
  useEffect(() => {
    if (animDone && prefsReady) {
      onFinished();
    }
  }, [animDone, prefsReady]);

  const logoSize = width * 0.55;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { opacity }]}>
        <Image
          source={{ uri: LOGO_URI }}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
