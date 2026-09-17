import { getAdsModule, ADS_SUPPORTED } from './index';

let interstitial: any = null;
let loaded = false;
let loading = false;
let completionCount = 0;
const SHOW_EVERY = 2;

function ensureLoaded() {
  if (!ADS_SUPPORTED) return;
  const m = getAdsModule();
  if (!m) return;
  if (loaded || loading) return;
  try {
    if (!interstitial) {
      interstitial = m.InterstitialAd.createForAdRequest('ca-app-pub-2463212937075161/2371609511', {
        requestNonPersonalizedAdsOnly: true,
      });
      interstitial.addAdEventListener(m.AdEventType.LOADED, () => {
        loaded = true;
        loading = false;
      });
      interstitial.addAdEventListener(m.AdEventType.ERROR, () => {
        loaded = false;
        loading = false;
      });
      interstitial.addAdEventListener(m.AdEventType.CLOSED, () => {
        loaded = false;
        ensureLoaded();
      });
    }
    loading = true;
    interstitial.load();
  } catch {
    loading = false;
  }
}

export function preloadInterstitial() {
  ensureLoaded();
}

export function maybeShowWorkoutCompletionAd(): boolean {
  if (!ADS_SUPPORTED) return false;
  completionCount += 1;
  const shouldShow = completionCount % SHOW_EVERY === 0;
  if (!shouldShow) {
    ensureLoaded();
    return false;
  }
  if (loaded && interstitial) {
    try {
      interstitial.show();
      return true;
    } catch {
      return false;
    }
  }
  ensureLoaded();
  return false;
}
