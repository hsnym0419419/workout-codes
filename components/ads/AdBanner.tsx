import React, { useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ADS_SUPPORTED, getAdsModule } from '@/lib/ads';

interface AdBannerProps {
  style?: StyleProp<ViewStyle>;
}

export const AD_BANNER_HEIGHT = 60;

export function AdBanner({ style }: AdBannerProps) {
  const [failed, setFailed] = useState(false);
  const m = ADS_SUPPORTED ? getAdsModule() : null;

  if (!m || failed) return null;

  const { BannerAd, BannerAdSize, TestIds } = m;

  return (
    <View style={[styles.wrap, style]} pointerEvents="box-none">
      <BannerAd
        unitId="ca-app-pub-2463212937075161/1456159262"
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => {
		  console.log('Banner loaded');
		}}
		onAdFailedToLoad={(error) => {
		  console.log('Banner failed', error);
		  setFailed(true);
		}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
	wrap: {
	  position: 'absolute',
	  left: 0,
	  right: 0,
	  bottom: 0,
	  height: 60,
	  backgroundColor: 'red',
	  zIndex: 9999,
	  elevation: 9999,
	},
});
