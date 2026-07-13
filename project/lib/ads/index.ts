import { Platform } from 'react-native';

export const ADS_SUPPORTED = Platform.OS === 'ios' || Platform.OS === 'android';

type AdModule = typeof import('react-native-google-mobile-ads');

let mod: AdModule | null = null;
let loadAttempted = false;

export function getAdsModule(): AdModule | null {
  if (!ADS_SUPPORTED) return null;
  if (loadAttempted) return mod;
  loadAttempted = true;
  try {
    const m = require('react-native-google-mobile-ads') as AdModule;
    // Verify the native module actually loaded by checking a known export
    if (m && typeof m.default === 'function') {
      mod = m;
    }
  } catch {
    mod = null;
  }
  return mod;
}

let initialized = false;
export async function initAds(): Promise<void> {
  if (initialized) return;
  let m: AdModule | null = null;
  try {
    m = getAdsModule();
  } catch {
    return;
  }
  if (!m) return;
  try {
    await m.default().initialize();
    initialized = true;
  } catch {}
}
