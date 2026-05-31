import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

const AD_IDS = {
  banner: {
    android: 'ca-app-pub-3940256099942544/6300978111',  // Android は後で差し替え
    ios: 'ca-app-pub-5452070430246807/5813115365',
  },
  rewarded: {
    android: 'ca-app-pub-3940256099942544/5224354917',  // Android は後で差し替え
    ios: 'ca-app-pub-5452070430246807/7950597651',
  },
};

const getPlatform = () => Capacitor.getPlatform();

// AdMob の初期化（非パーソナライズ広告モード）
export const initializeAdMob = async () => {
  if (!isNative) return;
  try {
    await AdMob.initialize({
      initializeForTesting: false,
      requestTrackingAuthorization: false,
    });
  } catch (err) {
    console.error('AdMob init failed:', err);
  }
};

// バナー広告を表示
export const showBannerAd = async () => {
  if (!isNative) return;
  try {
    const platform = getPlatform();
    await AdMob.showBanner({
      adId: AD_IDS.banner[platform] || AD_IDS.banner.android,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 80, // ボトムナビの高さ分
    });
  } catch (err) {
    console.error('Banner ad failed:', err);
  }
};

// バナー広告を非表示
export const hideBannerAd = async () => {
  if (!isNative) return;
  try {
    await AdMob.removeBanner();
  } catch (err) {
    console.error('Remove banner failed:', err);
  }
};

// リワード広告を表示し、完了を待つ
// 戻り値: true（視聴完了）/ false（スキップ or エラー）
export const showRewardedAd = async () => {
  if (!isNative) {
    // Web環境ではダミーの遅延で代替
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 500);
    });
  }

  try {
    const platform = getPlatform();
    await AdMob.prepareRewardVideoAd({
      adId: AD_IDS.rewarded[platform] || AD_IDS.rewarded.android,
    });

    return new Promise((resolve) => {
      const rewardListener = AdMob.addListener('onRewardedVideoAdReward', () => {
        rewardListener.remove();
        dismissListener.remove();
        resolve(true);
      });
      const dismissListener = AdMob.addListener('onRewardedVideoAdDismissed', () => {
        rewardListener.remove();
        dismissListener.remove();
        resolve(false);
      });

      AdMob.showRewardVideoAd();
    });
  } catch (err) {
    console.error('Rewarded ad failed:', err);
    return false;
  }
};
