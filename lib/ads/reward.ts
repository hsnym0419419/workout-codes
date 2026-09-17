import { getAdsModule, ADS_SUPPORTED } from './index';

let reward: any = null;
let loaded = false;
let loading = false;

export function preloadReward() {
  if (!ADS_SUPPORTED) return;
  const m = getAdsModule();
  if (!m) return;
  if (loaded || loading) return;
  try {
    if (!reward) {
      reward = m.RewardedAd.createForAdRequest(m.TestIds.REWARDED, {
        requestNonPersonalizedAdsOnly: true,
      });
      reward.addAdEventListener(m.RewardedAdEventType.LOADED, () => {
        loaded = true;
        loading = false;
      });
      reward.addAdEventListener(m.AdEventType.ERROR, () => {
        loaded = false;
        loading = false;
      });
      reward.addAdEventListener(m.AdEventType.CLOSED, () => {
        loaded = false;
        preloadReward();
      });
    }
    loading = true;
    reward.load();
  } catch {
    loading = false;
  }
}

export function showReward(onEarned?: () => void): boolean {
  if (!ADS_SUPPORTED || !reward || !loaded) {
    preloadReward();
    return false;
  }
  const m = getAdsModule();
  if (!m) return false;
  try {
    const sub = reward.addAdEventListener(
      m.RewardedAdEventType.EARNED_REWARD,
      () => {
        onEarned?.();
        sub?.();
      }
    );
    reward.show();
    return true;
  } catch {
    return false;
  }
}
