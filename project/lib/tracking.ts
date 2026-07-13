import { Platform } from 'react-native';

/**
 * Requests App Tracking Transparency permission on iOS 14+.
 * On Android and web this is a no-op.
 * Must be called after the first screen is visible (after splash).
 */
export async function requestTrackingPermission(): Promise<void> {
  if (Platform.OS !== 'ios') return;
  try {
    const { requestTrackingPermissionsAsync } =
      await import('expo-tracking-transparency');
    await requestTrackingPermissionsAsync();
  } catch {}
}
