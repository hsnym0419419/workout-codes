import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePreferences } from '@/hooks/usePreferences';
import { requestTrackingPermission } from '@/lib/tracking';
import { initAds } from '@/lib/ads';
import { preloadInterstitial } from '@/lib/ads/interstitial';
import { AppSplashScreen } from '@/components/AppSplashScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const { colorScheme } = useColorScheme();
  const { preferences, loaded: prefsReady } = usePreferences();
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  const handleSplashFinished = () => {
    setSplashDone(true);

    // ATT must be requested after first screen is visible, before ads init
    requestTrackingPermission().finally(() => {
      initAds()
        .then(() => preloadInterstitial())
        .catch(() => {});
    });

    if (!preferences.hasSeenOnboarding) {
      router.replace('/onboarding');
    }
  };

  if (!appReady) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="exercise/[id]" />
        <Stack.Screen
          name="workout/player"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="onboarding"
          options={{ presentation: 'modal', animation: 'slide_from_bottom', gestureEnabled: false }}
        />
        <Stack.Screen
          name="legal/[type]"
          options={{ presentation: 'card', animation: 'slide_from_right' }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {!splashDone && (
        <AppSplashScreen onFinished={handleSplashFinished} prefsReady={prefsReady} />
      )}
    </>
  );
}
